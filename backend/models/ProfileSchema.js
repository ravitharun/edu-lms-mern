const mongoose = require("mongoose")
const CreateProfile = new mongoose.Schema({

    Name: { type: String, require: true },
    Email: { type: String, require: true },
    ID: { type: String, require: true },
    Role: { type: String, require: true },
    About: { type: String, require: true },
    Experience: { type: Number, require: true, default: 1 },
    PhoneNumber: { type: Number, require: true },
    Designation: { type: String, require: true },
    Qualification: { type: String, require: true },
    ProfileUrl: { type: String, require: true },
}, {
    timestamps: true
})

// CreateProfile


module.exports = mongoose.model(
  "CreateProfiles",
  CreateProfile
);