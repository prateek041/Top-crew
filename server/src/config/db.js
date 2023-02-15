const mongoose = require('mongoose');

const connectDB = async ()=>{
  mongoose.set("strictQuery", false);

  const connection = mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to the database");
}

module.exports = connectDB;