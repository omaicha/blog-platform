require('dotenv').config();
const express = require('express');
const connectDB = require('./models/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

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


