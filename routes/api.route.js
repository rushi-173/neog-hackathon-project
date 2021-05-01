const router = require("express").Router();

router.use((req, res, next) => {
  req.io.of("/api/chatroom").on('connection', (socket) => {
    console.log("User connected " + socket.id);

    socket.on("message", (data) => {
      socket.broadcast.emit('message', data)
    });
  });

  next();
})


router.get("/", (req, res) => {
  res.send("Welcome to api");
});

module.exports = router;