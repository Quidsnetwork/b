const express = require('express');
const router = express.Router();
const pool = require('./db');

// Endpoint to store a user's Expo Push Token
router.post('/regtoken', async (req, res) => {
  const { userId, expoPushToken } = req.body;

  if (!userId || !expoPushToken) {
    return res.status(400).json({ error: 'User ID and Expo Push Token are required' });
  }

  try {
    const connection = await pool.getConnection();
    const query = 'UPDATE users SET expoPushToken = ? WHERE userid = ?';
    await connection.query(query, [expoPushToken, userId]);
    connection.release();
    res.status(201).json({ message: 'Token registered successfully' });
  } catch (error) {
    console.error('Error storing token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
