require('dotenv').config();
const express = require('express');
const connectDB = require('./models/db');
const mongoose = require('mongoose');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));
  // Add this before routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


