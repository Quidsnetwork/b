const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const pool = require('./db'); // Import the database connection


// Login endpoint
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = rows[0];

      // Compare the provided password with the stored plain-text password
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Successful login
      res.status(200).json({ message: 'Login successful', userId: user.userid });

    } catch (error) {
      connection.release();
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

module.exports = router;
