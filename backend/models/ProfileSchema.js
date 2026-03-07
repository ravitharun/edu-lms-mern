const mongoose = require("mongoose")
const CreateProfile = new mongoose.Schema({

    Name: { type: String, require: false },
    Email: { type: String, require: false },
    ID: { type: String, require: false },
    Role: { type: String, require: false },
    About: { type: String, require: false },
    Experience: { type: Number, require: false, default: 1 },
    PhoneNumber: { type: Number, require: false },
    Designation: { type: String, require: false },
    Department: { type: String, require: false },
    Year: { type: String, require: false },
    Section: { type: String, require: false },
    Qualification: { type: String, require: false },
    ProfileUrl: { type: String, require: false },
    StudentsYearDepartment: { type: String, require: false },
}, {
    timestamps: false
})

// CreateProfile


module.exports = mongoose.model(
  "CreateProfiles",
  CreateProfile
);