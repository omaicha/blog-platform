const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: { type: [String], default: [] },
  viewCount: { type: Number, default: 0 },
  readingTime: { type: Number }, // In minutes
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Calculate reading time before saving
postSchema.pre('save', function(next) {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Post', postSchema);
