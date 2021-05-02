const router = require("express").Router();
const Chatroom = require("../models/chatroom.model");


//get all rooms
router.get("/", async (req, res) => {
  try {
    const chatrooms = await Chatroom.find();
    res.json(chatrooms);
  } catch (err) {
    res.json({ message: err });
  }
});

//create a new room
router.post("/", async (req, res) => {
  const chatroom = new Chatroom({
    owner: req.body.owner,
    title: req.body.title,
    topic: req.body.topic,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    active: req.body.active,
    users: req.body.users,
    messages: req.body.messages
  });

  try {
    const savedRoom = await chatroom.save();
    res.json(savedRoom);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

//user exits room
router.patch("/exituser/:roomId", async (req, res)=>{
  console.log("req to exit user", req.body.userId)
  const currRoom = await Chatroom.findById(req.params.roomId);
  const newUsers = currRoom.users.filter(temp=>temp._id!==req.body.userId);
  const updatedRoom = await Chatroom.updateOne(
    { _id: req.params.roomId },
    { $set: { 
      users: newUsers
      }
     }
  )
  const rooms = await Chatroom.find();
  res.send(updatedRoom);
  console.log("updated room", updatedRoom);
})

//remove room

//patch user handraisedMembers
router.patch("/updateuser/:roomId", async (req, res)=>{
  console.log("req to edit user", req.body.userId)
  const currRoom = await Chatroom.findById(req.params.roomId);
  const newUsers = currRoom.users.map(user=>
    user._id===req.body.userId?{
      ...user, handraised:req.body.handraised,
      status:req.body.status
    }:user
  );
  const updatedRoom = await Chatroom.updateOne(
    { _id: req.params.roomId },
    { $set: { 
      users: newUsers
      }
     }
  )

  const rooms = await Chatroom.find();
  res.send(rooms);
  console.log("updated room", updatedRoom);
})

//get a specific room
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Chatroom.findById(req.params.roomId);
    res.json(room);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a room
// router.patch("/:roomId", async (req, res) => {
//   try {
//     const updatedRoom = await Chatroom.updateOne(
//       { _id: req.params.roomId },
//       {
//         $set:
//         {
//           stageMembers: req.body.stageMembers,
//           handraisedMembers: req.body.handraisedMembers,
//           audience: req.body.audience,
//           messages: req.body.rating
//         }
//       }
//     );
//     res.json(updatedRoom);
//   }
//   catch (err) {
//     res.json({ message: err });
//   }
// })

//close a room
router.patch("/close/:roomId", async (req, res) => {
  try {
    const updatedRoom = await Chatroom.updateOne(
      { _id: req.params.roomId },
      {
        $set:
        {
          active: false
        }
      }
    );
    res.json(updatedRoom);
  }
  catch (err) {
    res.json({ message: err });
  }
})

router.patch("/delete/:roomId", async (req, res) => {
  try {
    const updatedRoom = await Chatroom.updateOne(
      { _id: req.params.roomId },
      {
        $set:
        {
          active: false,
          visibility: false
        }
      }
    );
    res.json(updatedRoom);
  }
  catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;
