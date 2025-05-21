// 1. Import required modules FIRST
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors before using it
require('dotenv').config();

// 2. Initialize express app
const app = express();

// 3. Configure middleware
app.use(cors()); // Now cors is properly initialized
app.use(express.json());

// 4. Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// 5. Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));

// 6. Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// 7. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
