const {
  addMessageToChatroom,
  addAudienceAndMessageToChatroom,
  addUserToChatroomAudience
} = require('./chatroom-actions');

const Chatroom = require("../models/chatroom.model");

const bot = {
  _id: "iambot",
  name: "Bot"
};

function createSocketConnection(io, server) {


  // Run when client connects
  io.on('connection', async socket => {

    socket.on('joinRoom', async ({ user, room }) => {
      socket.join(room._id);
      try {

        const currRoom = await Chatroom.findById(room._id);
        const updatedRoom = await Chatroom.updateOne(
          { _id: room._id },
          {
            $set: {
              users: [...currRoom.users, { ...user, status: "audience", handraised: false }]
            }
          });
        const resRoom = await Chatroom.findById(room._id);

        // Broadcast when a user connects
        socket.broadcast
          .to(room._id)
          .emit(
            'updateUsersRoom', resRoom
          )
      } catch (err) {
        console.log("error in addding user to audience")
      }

      const rooms = await Chatroom.find();


      socket.broadcast
        .to(room._id)
        .emit(
          'updateAllRooms', rooms
        )



    });


    // Listen for chatMessage
    socket.on('chatMessage', async ({ msg, room }) => {
      const updatedRoom = addMessageToChatroom(msg, room)

      const temp = [...room.messages, msg]
      let newRoom = room
      newRoom.messages = temp


      socket.broadcast
        .to(room._id)
        .emit(
          'message', newRoom
        )
    });

    socket.on('raiseHand', async ({ user1, room }) => {
      const rooms = await Chatroom.find();


      socket.broadcast
        .to(room._id)
        .emit(
          'updateAllRooms', rooms
        )
    });

    socket.on('addToStage', async ({ user1, room }) => {
      const rooms = await Chatroom.find();

      socket.broadcast
        .to(room._id)
        .emit(
          'updateAllRooms', rooms
        )
    });

  
  });

}

module.exports = createSocketConnection;