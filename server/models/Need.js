const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const needSchema = new Schema({
  needText: {
    type: String,
    required: 'Please post a need!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  needAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  needDate: { 
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Need = model('Need', needSchema)

module.exports = Need;