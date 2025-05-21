const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// Create Post with word count validation
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const wordCount = content.split(/\s+/).length;
    
    if (wordCount < 100) {
      return res.status(400).json({ error: 'Post must be at least 100 words' });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
      location: req.body.location // From client geolocation
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .skip(skip)
    .limit(limit)
    .sort('-createdAt')
    .populate('author', 'username');

  const total = await Post.countDocuments();
  res.json({ posts, totalPages: Math.ceil(total / limit) });
});

// Update Post with server-side validation
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Authorization check
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // Calculate reading time (business logic)
    const wordCount = req.body.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        readingTime,
        lastUpdated: Date.now() 
      },
      { new: true }
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
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await post.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = {
      text: req.body.text,
      user: req.user.id
    };

    post.comments.push(comment);
    await post.save();
    
    res.json(post.comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
