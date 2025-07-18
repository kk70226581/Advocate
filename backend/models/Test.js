const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500 // Limit caption length
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now // Automatically set when created
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  profilePic: {
    type: String,
    default: '/images/advocate.jpg' // Default profile picture
  }
});

// CHANGE: Renamed the model from 'Post' to 'Test'
const Test = mongoose.model('Test', postSchema);

// CHANGE: Export Test instead of Post
module.exports = Test;