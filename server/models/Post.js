const postSchema = new mongoose.Schema({
      postSchema.index({ title: 'text', content: 'text' });
      
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  views: { type: Number, default: 0 },
  isPublished: Boolean,
  createdAt: { type: Date, default: Date.now }
});
