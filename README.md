# Food Express

A full-stack food ordering web application built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**. The application allows users to browse food items while providing an admin panel to manage menu items.

---

## Features

- View food menu by categories
- Add new food items
- Edit existing food items
- Delete food items
- Upload food images
- Store menu data in MongoDB
- Password-protected admin panel
- Responsive user interface

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---

## Project Structure

```text
Foodexpress-mongodb/
│
└── server/
    ├── public/
    │   ├── index-1.html
    │   ├── admin.html
    │   └── images/
    ├── db.js
    ├── server.js
    ├── package.json
    └── .env
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/monika1409/Foodexpress-mongodb.git
```

### Navigate to the project folder

```bash
cd Foodexpress-mongodb/server
```

### Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
ADMIN_PASSWORD=your_admin_password
```

---

## Run the Project

Start the server:

```bash
npm start
```

---

## Access the Application

**Main Website**

```text
http://localhost:3000/index-1.html
```

**Admin Panel**

```text
http://localhost:3000/admin.html
```

---

## Project Highlights

- Full-stack web application
- MongoDB database integration using Mongoose
- REST API built with Node.js and Express.js
- Password-protected admin panel
- Image upload support
- CRUD operations (Create, Read, Update, Delete)
- Responsive user interface

