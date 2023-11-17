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
    type: Schema.Types.ObjectId, ref: 'User'
  },
  needDate: { 
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  signedUpUsers: [
    {
      type: Schema.Types.ObjectId, ref: 'User'
    }
  ]
});

const Need = model('Need', needSchema)

module.exports = Need;