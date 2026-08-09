const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const db = require('./db');

// ── Debug: confirm what actually loaded from .env ──
// This prints once at startup so you can see exactly which SMTP settings
// were picked up, without exposing the real password.
console.log('--- .env check ---');
console.log('PORT:', process.env.PORT || '(not set)');
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? '(set)' : '(not set)');
console.log('SMTP_HOST:', process.env.SMTP_HOST || '(not set)');
console.log('SMTP_PORT:', process.env.SMTP_PORT || '(not set)');
console.log('SMTP_USER:', process.env.SMTP_USER || '(not set)');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '(set, ' + process.env.SMTP_PASS.length + ' chars)' : '(not set)');
console.log('SMTP_FROM:', process.env.SMTP_FROM || '(not set)');
console.log('------------------');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Email OTP setup ──
// Fill these in your .env file to actually send emails:
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=587
//   SMTP_USER=youraddress@gmail.com
//   SMTP_PASS=your-app-password      (Gmail requires an "App Password", not your normal password)
//   SMTP_FROM="Food Express" <youraddress@gmail.com>
// Any SMTP provider works (Gmail, Outlook, SendGrid, Mailgun, etc.) — just change the host/port.
const mailTransporter = process.env.SMTP_HOST ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
}) : null;

// In-memory OTP store: email -> { code, expiresAt }. Resets if the server restarts,
// which just means the person would need to request a fresh code — fine for this use case.
const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ── Admin password ──
// CHANGE THIS to set your own admin password.
// You can also set it via an environment variable called ADMIN_PASSWORD
// (recommended once this is deployed online, so the password isn't sitting in code).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'foodadmin51';

// Tokens handed out after a correct login. Kept in memory — they reset if the server restarts,
// which just means you'd need to log in again. Good enough for a small admin tool like this.
const validTokens = new Set();

function requireAdminAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (token && validTokens.has(token)) return next();
  return res.status(401).json({ error: 'Not authorized. Please log in.' });
}

app.use(cors());
app.use(express.json());

// ── Image upload setup ──
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
fs.mkdirSync(IMAGES_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-_ ]/g, '');
    cb(null, safeName);
  }
});
const upload = multer({ storage });

// Serve the food site itself + uploaded images
app.use(express.static(path.join(__dirname, 'public')));

// ── Root route — makes the plain domain load your main site ──
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index-1.html'));
});

// ── Validation helper ──
function validateMenuPayload(body, { partial = false } = {}) {
  const errors = [];
  const required = ['name', 'cat', 'price'];
  if (!partial) {
    for (const field of required) {
      if (body[field] === undefined || body[field] === '') errors.push(`"${field}" is required`);
    }
  }
  if (body.price !== undefined && (isNaN(Number(body.price)) || Number(body.price) < 0)) {
    errors.push('"price" must be a non-negative number');
  }
  return errors;
}

function toBool(v) {
  if (v === undefined) return undefined;
  return v === true || v === 'true' || v === 'on' || v === 1 || v === '1';
}

function normalizeMenuPayload(body) {
  return {
    name: body.name,
    cat: body.cat,
    price: body.price !== undefined ? Number(body.price) : undefined,
    image: body.image,
    desc: body.desc,
    veg: toBool(body.veg),
    spicy: toBool(body.spicy),
    best: toBool(body.best),
    rating: body.rating !== undefined ? Number(body.rating) : undefined,
    rcount: body.rcount !== undefined ? Number(body.rcount) : undefined,
  };
}

// ── Routes ──

// Send a 6-digit OTP to the given email
app.post('/api/otp/send', async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const code = generateOtp();
  otpStore.set(email, { code, expiresAt: Date.now() + OTP_TTL_MS });

  if (!mailTransporter) {
    // No SMTP configured yet — log it so you can still test locally, but tell the
    // caller clearly so the frontend doesn't pretend an email was actually sent.
    console.log(`[OTP] SMTP not configured. Code for ${email} is: ${code}`);
    return res.status(200).json({ sent: false, reason: 'SMTP not configured on server (check .env)' });
  }

  try {
    await mailTransporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Your Food Express verification code',
      text: `Your verification code is ${code}. It expires in 5 minutes.`,
      html: `<p>Your verification code is <b style="font-size:20px">${code}</b>.</p><p>It expires in 5 minutes.</p>`,
    });
    res.json({ sent: true });
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    res.status(500).json({ error: 'Failed to send email. Check SMTP settings in .env.' });
  }
});

// Verify a submitted OTP
app.post('/api/otp/verify', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const code = (req.body.code || '').trim();
  const entry = otpStore.get(email);

  if (!entry) return res.status(400).json({ error: 'No code was requested for this email.' });
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'Code expired. Please request a new one.' });
  }
  if (entry.code !== code) return res.status(400).json({ error: 'Incorrect code.' });

  otpStore.delete(email);
  res.json({ verified: true });
});

// Admin login — checks password, returns a token to use for menu changes
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  const token = crypto.randomBytes(24).toString('hex');
  validTokens.add(token);
  res.json({ token });
});

// GET all menu items
app.get('/api/menu', async (req, res) => {
  try {
    res.json(await db.getAllMenuItems());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load menu' });
  }
});

// GET single menu item
app.get('/api/menu/:id', async (req, res) => {
  try {
    const item = await db.getMenuItem(Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load item' });
  }
});

// POST create new menu item (JSON body, image given as a URL/path string)
app.post('/api/menu', requireAdminAuth, async (req, res) => {
  try {
    const errors = validateMenuPayload(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const created = await db.createMenuItem(normalizeMenuPayload(req.body));
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// POST create new menu item WITH an uploaded image file (multipart/form-data)
app.post('/api/menu/upload', requireAdminAuth, upload.single('imageFile'), async (req, res) => {
  try {
    const errors = validateMenuPayload(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const payload = normalizeMenuPayload(req.body);
    if (req.file) {
      payload.image = 'images/' + req.file.filename;
    }
    const created = await db.createMenuItem(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// PUT update existing menu item
app.put('/api/menu/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const errors = validateMenuPayload(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ errors });
    const updated = await db.updateMenuItem(id, normalizeMenuPayload(req.body));
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// PUT update existing item WITH a new uploaded image
app.put('/api/menu/:id/upload', requireAdminAuth, upload.single('imageFile'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const errors = validateMenuPayload(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ errors });
    const payload = normalizeMenuPayload(req.body);
    if (req.file) {
      payload.image = 'images/' + req.file.filename;
    }
    const updated = await db.updateMenuItem(id, payload);
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE menu item
app.delete('/api/menu/:id', requireAdminAuth, async (req, res) => {
  try {
    const ok = await db.deleteMenuItem(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: 'Item not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// ── Start server after DB is ready ──
db.initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Food Express server running at http://localhost:${PORT}`);
    console.log(`Admin panel:  http://localhost:${PORT}/admin.html`);
    console.log(`Main site:    http://localhost:${PORT}/index-1.html`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});