// function  async utils

const Chatroom = require("../models/chatroom.model");



async function addUserToChatroomAudience(user, chatroom) {

  const chatrooms = await Chatroom.find({ _id: chatroom._id });

  const prevAudience = chatrooms[0].audience
  const newAudience = [...prevAudience, user]
  const updatedRoom = await Chatroom.updateOne(
    { _id: chatroom._id },
    {
      $set:
      {
        audience: newAudience
      }
    }
  );
  return (updatedRoom);
}

async function addMessageToChatroom(message, chatroom) {

  const chatrooms = await Chatroom.find({ _id: chatroom._id });

  const prevMessages = chatrooms[0]["messages"]
  const newMessages = [...prevMessages, message]
  const updatedRoom = await Chatroom.updateOne(
    { _id: chatroom._id },
    {
      $set:
      {
        messages: newMessages
      }
    }
  );
  return (updatedRoom);
}

async function addAudienceAndMessageToChatroom(user, message, chatroom, socket) {

  const chatrooms = await Chatroom.find({ _id: chatroom._id });

  const prevMessages = chatrooms[0]["messages"]
  const newMessages = [...prevMessages, message]
  const prevAudience = chatrooms[0].audience
  const newAudience = [...prevAudience, user]
  let updatedRoom = {}
  try {
    updatedRoom = await Chatroom.updateOne(
      { _id: chatroom._id },
      {
        $set:
        {
          messages: newMessages,
          audience: newAudience
        }
      }
    );

    socket.broadcast
      .to(room._id)
      .emit(
        'message', updatedRoom
      )

  }
  catch (err) {
    console.log("err", err)
  }

  return (updatedRoom);
}


module.exports = {
  addMessageToChatroom,
  addAudienceAndMessageToChatroom,
  addUserToChatroomAudience
};