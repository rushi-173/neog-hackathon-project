const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    max: 255
  },
  replied_to: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('message', messageSchema);