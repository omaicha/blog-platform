const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Server-side validation
    if (!validator.isEmail(email)) throw Error('Invalid email');
    if (password.length < 6) throw Error('Password must be at least 6 characters');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    res.status(201).json({ _id: user.id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  // Add login logic here
});
