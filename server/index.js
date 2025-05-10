const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const pool = require('./db');

require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// JWT secret
const SECRET = process.env.JWT_SECRET || 'secret';

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// Check auth route
app.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ authenticated: false });
  try {
    jwt.verify(token, SECRET);
    res.json({ authenticated: true });
  } catch {
    res.status(403).json({ authenticated: false });
  }
});

// Upload route
app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = `/uploads/${req.file.filename}`;
  res.json({ imageUrl: imagePath });
});

// CRUD routes (protected)
app.get('/menu',  async (req, res) => {
  const result = await pool.query('SELECT * FROM menu ORDER BY id');
  res.json(result.rows);
});

app.post('/menu', authMiddleware, async (req, res) => {
  const { name, description, price, category, image_url } = req.body;
  const result = await pool.query(
    'INSERT INTO menu (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, description, price, category, image_url]
  );
  res.json(result.rows[0]);
});

app.put('/menu/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;
  const result = await pool.query(
    'UPDATE menu SET name=$1, description=$2, price=$3, category=$4, image_url=$5 WHERE id=$6 RETURNING *',
    [name, description, price, category, image_url, id]
  );
  res.json(result.rows[0]);
});

app.delete('/menu/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM menu WHERE id = $1', [id]);
  res.json({ success: true });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
