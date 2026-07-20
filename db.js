// db.js — MongoDB database layer using Mongoose
// Connects to MongoDB Atlas (or any MongoDB instance) using a connection string
// supplied via the MONGODB_URI environment variable.
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodexpress';

// ── Schema ──
const menuItemSchema = new mongoose.Schema({
  // We keep a numeric `id` field (separate from Mongo's own _id) so the rest
  // of the app — and the existing frontend — can keep working with plain
  // numeric ids exactly like before.
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  cat: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  desc: { type: String, default: '' },
  veg: { type: Boolean, default: false },
  spicy: { type: Boolean, default: false },
  best: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  rcount: { type: Number, default: 0 },
}, { versionKey: false });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Auto-incrementing id counter, since Mongo doesn't have one built in.
async function getNextId() {
  const last = await MenuItem.findOne().sort({ id: -1 }).lean();
  return last ? last.id + 1 : 1;
}

// Strip Mongo-specific fields so responses look exactly like the old SQLite shape.
function toPlain(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  delete obj._id;
  return obj;
}

async function initDb() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected to MongoDB');

  // Seed from the original hardcoded MENU array, only if the collection is empty.
  const count = await MenuItem.countDocuments();
  if (count === 0) {
    const seedPath = path.join(__dirname, 'menu-extracted.js');
    if (fs.existsSync(seedPath)) {
      const seedMenu = require(seedPath);
      await MenuItem.insertMany(seedMenu);
      console.log(`Seeded ${seedMenu.length} menu items into MongoDB`);
    }
  }
}

async function getAllMenuItems() {
  const docs = await MenuItem.find().sort({ id: 1 });
  return docs.map(toPlain);
}

async function getMenuItem(id) {
  const doc = await MenuItem.findOne({ id });
  return toPlain(doc);
}

async function createMenuItem(item) {
  const newId = await getNextId();
  const doc = await MenuItem.create({
    id: newId,
    name: item.name,
    cat: item.cat,
    price: item.price,
    image: item.image || '',
    desc: item.desc || '',
    veg: !!item.veg,
    spicy: !!item.spicy,
    best: !!item.best,
    rating: item.rating ?? 4.5,
    rcount: item.rcount ?? 0,
  });
  return toPlain(doc);
}

async function updateMenuItem(id, item) {
  const existing = await MenuItem.findOne({ id });
  if (!existing) return null;

  // Only overwrite fields that were actually provided (partial updates).
  for (const key in item) {
    if (item[key] !== undefined) existing[key] = item[key];
  }
  await existing.save();
  return toPlain(existing);
}

async function deleteMenuItem(id) {
  const result = await MenuItem.deleteOne({ id });
  return result.deletedCount > 0;
}

module.exports = {
  initDb,
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
