const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  type: { // e.g., 'pdf', 'note', 'image', 'video'
    type: String,
    required: true,
    enum: ['pdf', 'note', 'image', 'video', 'document'], // Define allowed types
    default: 'pdf'
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;