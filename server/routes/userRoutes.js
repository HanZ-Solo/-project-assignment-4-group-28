const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

// Define routes
// Get all users (Admin only)
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get user by ID
  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.params.id });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Create a new user (Registration)
  router.post('/', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Update user by ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { userId: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete user by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({ userId: req.params.id });
      if (!deletedUser) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;



