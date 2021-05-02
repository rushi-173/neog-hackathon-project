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


    // addUserToChatroomAudience(user,room);

    // let newRoom = room;
    // newRoom.messages = [...newRoom.messages,{
    //   sender: bot,
    //     message: `${user.name} joined the room`,
    // }]
    // let temp = newRoom.audience.find({ _id: user.id });
    // if (temp.length === 0) {
    //   newRoom.audience = [...newRoom.audience, user]
    // }



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

    // Runs when client disconnects
    // socket.on('exitRoom', async (user, room) => {
    //   try {
    //    const currRoom = await Chatroom.findById(room._id);
    //     const tempUsers = currRoom.users.filter((temp)=>temp._id!==user._id);
    //     console.log("current room",currRoom);
    //     const updatedRoom = await Chatroom.updateOne(
    //       { _id: room._id },
    //       {
    //         $set: {
    //           users: tempUsers
    //         }
    //       });
    //     const resRoom = await Chatroom.findById(room._id);
    //     // Broadcast when a user connects
    //     socket.broadcast
    //       .to(room._id)
    //       .emit(
    //         'updateUsersRoom', resRoom
    //       )
    //   } catch (err) {
    //     console.log("error in removing user to audience")
    //   }

    // });
  });

}

module.exports = createSocketConnection;