const mongoose = require("mongoose");
const URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/lmsdb";
    // : "mongodb://host.docker.internal:27017/lmsdb";
    console.log(URI,'URIURI')
const connectDB = async () => {
  try {
    await mongoose.connect(URI); // must be string
    console.log("MongoDB connected");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
