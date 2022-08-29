const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    enum: ['beginner', 'intermediate', 'advance'],
    required: true
  },
  Duration: {
    type: Number,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Mrp: {
    type: Number,
    required: true
  },
  Discount: {
    type: Number,
    required: true
  },
  Rating: {
    type: Number,
    required: true
  }, 
  Category: {
    type: String,
    enum: ['programming','art','business'],
    required: true
  },
  Thumbnail: {
    type: String,
    required: true
  },
  Demo: {
    type: String,
    required: true
  },
  Partner: {
    type: String,
    enum: ['google','facebook','microsoft'],
    required: true
  },
});

module.exports = mongoose.model('Course', courseSchema);