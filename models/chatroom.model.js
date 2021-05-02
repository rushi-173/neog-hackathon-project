const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  owner: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  visibility:{
    type: Boolean,
    default: true
  },
  users: [],
  messages: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chatroom = mongoose.model('chatroom', chatroomSchema);