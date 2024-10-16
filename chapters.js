const express = require('express');
const pool = require('./db'); // Import the MySQL connection pool
const router = express.Router();

// Endpoint to get all chapters
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM chapters'; // Assuming you have a 'chapters' table
      const [rows] = await connection.query(query);
      connection.release();

      res.status(200).json(rows); // Send the chapters as the response
    } catch (error) {
      connection.release();
      console.error('Error fetching chapters:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error getting MySQL connection:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Endpoint to get a specific chapter by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM chapters WHERE id = ?'; // Fetch specific chapter by ID
      const [rows] = await connection.query(query, [id]);
      connection.release();

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Chapter not found' });
      }

      res.status(200).json(rows[0]); // Send the chapter data
    } catch (error) {
      connection.release();
      console.error('Error fetching chapter:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error getting MySQL connection:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

module.exports = router;
