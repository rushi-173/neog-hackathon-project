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
    owner_id: req.body.owner_id,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    stage_members: req.body.stage_members,
    active: req.body.active,
    handraised_members: req.body.handraised_members,
    audience: req.body.audience,
    messages: req.body.messages
  });

  try {
    const savedRoom = await chatroom.save();
    res.json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

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
router.patch("/:roomId", async (req, res) => {
  try {
    const updatedRoom = await Chatroom.updateOne(
      { _id: req.params.roomId },
      {
        $set:
        {
          stage_members: req.body.stage_members,
          handraised_members: req.body.handraised_members,
          audience: req.body.audience,
          messages: req.body.rating
        }
      }
    );
    res.json(updatedRoom);
  }
  catch (err) {
    res.json({ message: err });
  }
})

//close a room
router.patch("/close/:roomId", async (req, res) => {
  try {
    const updatedRoom = await Chatroom.updateOne(
      { _id: req.params.roomId },
      {
        $set:
        {
          endTime: req.body.endTime,
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
          endTime: req.body.endTime,
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
