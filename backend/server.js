require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes (important for React frontend)
app.use(express.json()); // Body parser for JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Mongoose Models
// Ensure this path matches the exact casing of your model file (e.g., Test.js or test.js)
const Test = require('./models/Test'); // <--- Corrected to 'Test' (capital T) for consistency
const Resource = require('./models/Resource');
const BlogPost = require('./models/BlogPost'); // Blog Post model

// --- API Routes ---

// Test Route
app.get('/', (req, res) => {
  res.send('Advocate Backend API is running!');
});

// Posts (Advocate Updates) Routes
// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Test.find().sort({ timestamp: -1 }); // Get all posts, newest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new post
app.post('/api/posts', async (req, res) => {
  const { caption, imageUrl, author, profilePic } = req.body;
  const newPost = new Test({
    caption,
    imageUrl,
    author,
    profilePic,
    timestamp: new Date() // Automatically set timestamp on creation
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // 201 Created
  } catch (err) {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message, errors: err.errors });
    }
    res.status(400).json({ message: err.message || 'Error saving post to database.' });
  }
});

// PUT (update) a post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated doc, run schema validators
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Test.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Resources Routes
// GET all resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 }); // Sort by creation date
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new resource
app.post('/api/resources', async (req, res) => {
  const { title, description, type, url } = req.body;
  const newResource = new Resource({
    title,
    description,
    type,
    url
  });

  try {
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Error saving resource to database.' });
  }
});

// PUT (update) a resource
app.put('/api/resources/:id', async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a resource
app.delete('/api/resources/:id', async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- NEW: Blog Posts Routes ---
app.get('/api/blogposts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ date: -1 }); // Sort by date, newest first
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/blogposts', async (req, res) => {
  const { title, content, author, date, readTime, image, excerpt } = req.body;
  const newBlogPost = new BlogPost({
    title,
    content,
    author: author || "Advocate Nitish Kumar Bhardwaj", // Use provided author or default
    date: date || new Date(), // Use provided date or current date
    readTime,
    image,
    excerpt
  });

  try {
    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost); // 201 Created
  } catch (err) {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message, errors: err.errors });
    }
    res.status(400).json({ message: err.message || 'Error saving blog post to database.' });
  }
});

app.put('/api/blogposts/:id', async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/blogposts/:id', async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// NEW: GET single blog post by ID (added this in previous comprehensive response)
app.get('/api/blogposts/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Blog Post ID format' });
    }
    res.status(500).json({ message: err.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});