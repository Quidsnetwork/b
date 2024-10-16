const express = require('express');
const router = express.Router();

// POST /logout endpoint
router.post('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent as `Bearer <token>`

  // Implement your logout logic, e.g., adding the token to a blacklist
  try {
    await blacklistToken(token); // You need to implement this function to add the token to a blacklist
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to log out' });
  }
});

module.exports = router;
