// File: server/index.js

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = 3000;
const SECRET = 'your_secret_key';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Login Route
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
    res.status(401).json({ error: 'اطلاعات ورود اشتباه است' });
  }
});

// Logout Route
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'نیاز به ورود دارید' });

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch {
    return res.status(403).json({ error: 'توکن نامعتبر است' });
  }
};

// Auth Check
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

// Menu Routes
app.get('/menu', authMiddleware, async (req, res) => {
  const result = await pool.query('SELECT * FROM menu ORDER BY id');
  res.json(result.rows);
});

app.post('/menu', authMiddleware, async (req, res) => {
  const { name, description, price, category } = req.body;
  const result = await pool.query(
    'INSERT INTO menu (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, category]
  );
  res.json(result.rows[0]);
});

app.put('/menu/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  const result = await pool.query(
    'UPDATE menu SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *',
    [name, description, price, category, id]
  );
  res.json(result.rows[0]);
});

app.delete('/menu/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM menu WHERE id = $1', [id]);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
