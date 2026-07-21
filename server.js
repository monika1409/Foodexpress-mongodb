// server.js — Express API for the food ordering menu, backed by MongoDB (Mongoose)
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

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
