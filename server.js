const express = require("express");
const dbConnect = require("./database/dbconfig");
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
const verify = require("./controllers/verifyToken");

const app = express();
const server = require('http').createServer(app);

//socket io config
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});



//middlewares
function putIO(req, res, next) {
  req.io = io;
  next();
}

//use middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(putIO);

//import routes
const authRoute = require('./routes/auth.route');
const apiRoute = require('./routes/api.route');

//Routes
app.get('/', (req, res) => {
 res.send("We are on home")
});

app.use('/auth', authRoute);

app.all('/api/*', verify, function(req, res, next){
    next();
});

app.use('/api', apiRoute);

//Connect to database
dbConnect();

//Listening to the server
const port = process.env.PORT || 5000;
const expressServer = server.listen(port, () => {
  console.log("server running...")
});

