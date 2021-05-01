const mongoose = require("mongoose");

const dbConnect = () => {
  const db_uri = process.env.DB_URI;
  try {
    mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
      console.log("DB Connected");
    })
  }
  catch{
    console.error("DB Connection Failed");
  }
}


module.exports = dbConnect;