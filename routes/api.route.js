const router = require("express").Router();
const Chatroom = require("../models/chatroom.model");


const chatroomRouter = require("./chatroom.route");
router.use("/chatroom", chatroomRouter);

router.get("/", (req, res) => {
  res.send("Welcome to api");
});

module.exports = router;