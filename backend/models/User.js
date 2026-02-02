const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  Student_ID: {
    type: String, 
    unique: true,
    sparse: true 
  },
  teacher_Id: {
    type: String,
    unique: true,
    index: true, sparse: true // ⭐ IMPORTANT
  },
  password: { type: String, required: true },
  profilePreview: { type: String, required: true },
  ConfirmPassword: { type: String, required: true },
  role: { type: String, enum: ["student", "Teacher"], default: "student" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
