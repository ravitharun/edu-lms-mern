const mongoose = require("mongoose");
const URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : "mongodb://127.0.0.1:27017/lmsdb";
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
