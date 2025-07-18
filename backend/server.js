require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend domain(s)
// IMPORTANT: Ensure this 'origin' array includes the EXACT URL of your deployed frontend.
// If your frontend is on Vercel/Netlify, add that URL here.
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development (if still using)
    'http://nitishbhardwaj.site',
    'https://nitishbhardwaj.site',
    // ADD YOUR ACTUAL DEPLOYED FRONTEND URL(S) HERE:
    'https://YOUR-ACTUAL-FRONTEND-DEPLOYED-URL.com', // Example: 'https://my-advocate-app.vercel.app'
    // You can add multiple origins if your frontend is deployed in different places
  ],
  credentials: true
}));

// Middleware for parsing JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully!'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Load models
// Ensure these paths are correct relative to your server.js file
const Test = require('./models/Test'); // Assuming Test.js defines the schema for posts
const Resource = require('./models/Resource');
const BlogPost = require('./models/BlogPost');

// Root Route
app.get('/', (req, res) => {
  res.send('✅ Advocate Backend API is running!');
});

// ========== 📌 POSTS ROUTES (/api/posts) ==========

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Test.find().sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a post
app.post('/api/posts', async (req, res) => {
  const { caption, imageUrl, author, profilePic } = req.body;
  const newPost = new Test({
    caption,
    imageUrl,
    author,
    profilePic,
    timestamp: new Date()
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    // Log the full error to the console for debugging
    console.error("Error creating post:", err);
    // Send a more detailed error response
    res.status(400).json({ message: err.message, stack: err.stack });
  }
});

// Update a post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const updated = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
});

// Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deleted = await Test.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

// ========== 📌 RESOURCES ROUTES (/api/resources) ==========

app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

app.post('/api/resources', async (req, res) => {
  const { title, description, type, url } = req.body;
  const newResource = new Resource({ title, description, type, url });

  try {
    const saved = await newResource.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating resource:", err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
});

app.put('/api/resources/:id', async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Resource not found' });
    res.json(updated);
  } catch (err) {
    console.error("Error updating resource:", err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
});

app.delete('/api/resources/:id', async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error("Error deleting resource:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

// ========== 📌 BLOG POSTS ROUTES (/api/blogposts) ==========

app.get('/api/blogposts', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

app.get('/api/blogposts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Blog post not found' });
    res.json(post);
  } catch (err) {
    console.error("Error fetching single blog post:", err);
    res.status(400).json({ message: 'Invalid ID format', stack: err.stack });
  }
});

app.post('/api/blogposts', async (req, res) => {
  const { title, content, author, date, readTime, image, excerpt } = req.body;
  const newPost = new BlogPost({
    title,
    content,
    author: author || "Advocate Nitish Kumar Bhardwaj",
    date: date || new Date(),
    readTime,
    image,
    excerpt
  });

  try {
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating blog post:", err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
});

app.put('/api/blogposts/:id', async (req, res) => {
  try {
    const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Blog post not found' });
    res.json(updated);
  } catch (err) {
    console.error("Error updating blog post:", err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
});

app.delete('/api/blogposts/:id', async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
