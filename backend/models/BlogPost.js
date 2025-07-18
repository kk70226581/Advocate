// backend/models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250
  },
  content: { // The main body of the blog post
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true,
    default: "Advocate Nitish Kumar Bhardwaj" // Default to the advocate's name
  },
  date: { // Date of publication
    type: Date,
    default: Date.now
  },
  readTime: { // Estimated read time, e.g., "5 min read"
    type: String,
    trim: true,
    default: "5 min read" // Can be calculated or estimated
  },
  image: { // URL for the blog post's main image
    type: String,
    trim: true
    // Not required, some posts might not have a main image
  },
  excerpt: { // A short summary for display on listing pages
    type: String,
    trim: true,
    maxlength: 500
  },
  createdAt: { // Timestamp for database record creation
    type: Date,
    default: Date.now
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;