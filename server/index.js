const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// GET all menu items
app.get('/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /menu error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST new menu item
app.post('/menu', async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, category]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('POST /menu error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a menu item
app.put('/menu/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menu SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *',
      [name, description, price, category, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /menu/:id error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a menu item
app.delete('/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /menu/:id error:', err.message);
    res.status(500).json({ error: err.message });
  }
});
const jwt = require('jsonwebtoken');
const SECRET = 'mysecretkey'; // In production use environment variable

// Simple login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه است' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
