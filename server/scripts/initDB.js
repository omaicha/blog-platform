const mongoose = require('mongoose');
require('dotenv').config();

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    if (!collections.some(c => c.name === 'users')) {
      await db.createCollection('users');
      console.log('Created users collection');
    }
    
    if (!collections.some(c => c.name === 'posts')) {
      await db.createCollection('posts');
      console.log('Created posts collection');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Initialization failed:', err);
    process.exit(1);
  }
}

init();
