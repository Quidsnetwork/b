const express = require('express');
const router = express.Router();
const pool = require('./db'); // Import the database connection

// Endpoint to store a message in the database
router.post('/', async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: 'Message required' });
  }

  try {
    const connection = await pool.getConnection();
    try {
      // Insert the message with a timestamp (MySQL handles the timestamp automatically)
      const query = 'INSERT INTO messages (userId, message, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)';
      await connection.query(query, [userId, message]);
      connection.release();

      res.status(201).json({ message: 'Message stored successfully!' });
    } catch (error) {
      connection.release();
      console.error('Error storing message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error getting MySQL connection:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Endpoint to fetch all messages along with usernames
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    // Fetch messages along with the username by joining the users table
    const query = `
      SELECT messages.id, messages.userId, messages.message, messages.created_at, users.username 
      FROM messages
      JOIN users ON messages.userId = users.userid
      ORDER BY messages.created_at ASC
    `;
    const [messages] = await connection.query(query);
    connection.release();

    res.status(200).json(messages); // Return the messages along with the username and timestamp
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
