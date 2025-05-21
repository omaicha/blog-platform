const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create Post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    // Business logic: Minimum word count
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 100) {
      return res.status(400).json({ error: 'Post must be at least 100 words' });
    }

    const post = await Post.create({
      title,
      content,
      tags,
      author: req.user.id,
      isPublished: req.user.role === 'admin' // Auto-publish for admins
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Posts (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .populate('author', 'username');

    const total = await Post.countDocuments();
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Authorization check
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await post.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
