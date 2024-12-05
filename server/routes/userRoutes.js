const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define routes
// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ username: user.username, role: user.role, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Find the maximum userId in the collection
    const lastUser = await User.findOne().sort({ userId: -1 }); // Sort by descending userId
    const nextUserId = lastUser ? lastUser.userId + 1 : 1; // Increment userId or start at 1

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the role "user"
    const newUser = new User({
      userId: nextUserId,
      username,
      password: hashedPassword,
      role: 'user', // Default role
      email,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Check if username exists
router.get('/exists/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    res.json({ exists: !!user }); // Return true if user exists, otherwise false
  } catch (err) {
    console.error('Error checking username:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

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



