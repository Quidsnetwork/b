const express = require('express');
const pool = require('./db'); // Ensure this is your MySQL pool
const router = express.Router();

// Edit specific field (email or username) endpoint
router.post('/:field', async (req, res) => {
  const { userId } = req.body;
  const { field } = req.params; // Get field from URL (email or username)
  const updateValue = req.body[field]; // The value being updated

  if (!userId || !updateValue) {
    return res.status(400).json({ error: `User ID and ${field} are required` });
  }

  // Validation for email
  if (field === 'email' && updateValue.length < 10) {
    return res.status(400).json({ error: 'Email must be at least 10 characters long' });
  }

  // Validation for username: no spaces and check if the username is taken
  if (field === 'username') {
    if (/\s/.test(updateValue)) {
      return res.status(400).json({ error: 'Username cannot contain spaces' });
    }

    // Check if the username is already taken
    try {
      const connection = await pool.getConnection();
      const [existingUser] = await connection.query('SELECT * FROM users WHERE username = ?', [updateValue]);

      if (existingUser.length > 0) {
        connection.release();
        return res.status(400).json({ error: 'Username is already taken' });
      }
      
      // Proceed to update after validation
      const query = `UPDATE users SET ${field} = ? WHERE userid = ?`;
      const [result] = await connection.query(query, [updateValue, userId]);

      connection.release();

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: `${field} updated successfully` });
    } catch (error) {
      console.error(`Error checking/updating ${field}:`, error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // If field is not username, proceed with the update (like email update)
  try {
    const connection = await pool.getConnection();
    const query = `UPDATE users SET ${field} = ? WHERE userid = ?`;
    const [result] = await connection.query(query, [updateValue, userId]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: `${field} updated successfully` });
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
