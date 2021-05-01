const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  owner_id: {
    type: String,
    required: true
  },
  startTime: Date,
  endTime: Date,
  stage_members: {
    type: [],
    default: [owners_id]
  },
  active: {
    type: Boolean,
    default: true
  },
  visibility:true,
  handraised_members: [],
  audience: [],
  messages: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chatroom = mongoose.model('chatroom', chatroomSchema);