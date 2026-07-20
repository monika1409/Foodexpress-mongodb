# Food Express — with a real database

Your menu now lives in a real database (MongoDB) instead of being hardcoded in the
HTML file. A small backend server reads/writes that database and serves your
website. You manage dishes from a built-in **Admin page** — no code editing needed.

## What changed

- `server/db.js` — connects to MongoDB using Mongoose and defines the menu schema
- `server/server.js` — the backend that serves your site + a menu API
- `server/public/index-1.html` — your site, now loads the menu from the database
  instead of a hardcoded list
- `server/public/admin.html` — **your new admin page** — add, edit, delete dishes,
  and upload photos, all through a form

Your original 66 dishes are seeded into MongoDB automatically on first run, so
nothing was lost.

## Running locally

### 1. Install Node.js
Make sure you have Node.js 18 or newer:
```bash
node -v
```

### 2. Set up MongoDB

**Option A — MongoDB Atlas (free cloud, recommended):**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a free cluster
3. Click **Connect → Drivers** and copy your connection string

**Option B — Local MongoDB:**
Install MongoDB Community Edition — it runs at `mongodb://localhost:27017` by default, no extra config needed.

### 3. Install dependencies
```bash
cd server
npm install
```

### 4. Set your MongoDB connection string
```bash
# Mac/Linux:
export MONGODB_URI="your-connection-string-here"

# Windows:
set MONGODB_URI=your-connection-string-here
```
If using local MongoDB, skip this step — it defaults to `mongodb://localhost:27017/foodexpress`.

### 5. Start the server
```bash
npm start
```

You should see:
```
Connected to MongoDB
Seeded 66 menu items into MongoDB
Food Express server running at http://localhost:3000
```

### 6. Open in browser

- **Main site:** http://localhost:3000/index-1.html
- **Admin panel:** http://localhost:3000/admin.html

## Deploying it online (no coding required)

The easiest free option for a small project like this is **Render**. Here's the
whole process:

### 1. Put the `server` folder on GitHub

1. Go to [github.com](https://github.com) and create a free account if you don't have one.
2. Create a new repository (e.g. `food-express`).
3. Upload the contents of the `server` folder to that repository. (On the GitHub
   repo page: **Add file → Upload files**, then drag in everything inside `server/`.)
   - You do **not** need to upload `node_modules` if it exists.

### 2. Connect Render to that repository

1. Go to [render.com](https://render.com) and sign up (you can sign up with your
   GitHub account directly — easiest option).
2. Click **New → Web Service**.
3. Pick the repository you just created.
4. Render will ask for some settings — use these:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Instance type:** Free
5. Add these **Environment Variables** in Render's dashboard:
   - `MONGODB_URI` → your MongoDB Atlas connection string
   - `ADMIN_PASSWORD` → your chosen admin password (optional, defaults to `foodadmin123`)
6. Click **Create Web Service**.

Render will build and start your app automatically. After a minute or two, it'll
give you a live URL like `https://food-express.onrender.com`.

### 3. Use it

- Your site: `https://food-express.onrender.com/index-1.html`
- Your admin page: `https://food-express.onrender.com/admin.html`

Open the admin page any time you want to add a new dish, change a price, or
remove something — fill in the form, hit save, and it updates instantly on the
live site, no code required.

### One thing to know about the free tier

Render's free tier "sleeps" your app after periods of no traffic, and it can take
10-20 seconds to wake up on the next visit. That's completely normal and fine for
a resume project/demo.

### A note on the database

Unlike a file-based database, MongoDB Atlas stores your data in the cloud
separately from your server code. This means your menu data **persists** even if
Render restarts or redeploys your app — no data loss on the free tier.

## Admin page is now password-protected

The admin page (`admin.html`) now asks for a password before letting anyone view
or edit the menu.

- **Default password:** `foodadmin123`
- **To change it:** set an environment variable named `ADMIN_PASSWORD` in Render's
  dashboard to your chosen password. The server will use that automatically.

Alternatively, open `server.js` and find this line near the top:
```js
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'foodadmin123';
```
Replace `'foodadmin123'` with your password, save, and restart.

Customers browsing your menu don't need a password — only adding, editing, or
deleting dishes requires logging in.

## What to say about this on your resume

This project now demonstrates:
- A NoSQL database (MongoDB) with Mongoose ODM instead of hardcoded/static data
- A REST API (`GET`/`POST`/`PUT`/`DELETE`) built with Node.js and Express
- Password-protected admin access with token-based authentication
- A working admin CRUD interface (create, read, update, delete)
- File uploads handled server-side
- A deployed, live full-stack web application
