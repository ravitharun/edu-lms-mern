const mongoose = require("mongoose")
const StudentMarks = new mongoose.Schema({

    id: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },

    subjectid: { type: mongoose.Schema.ObjectId, required: true, ref:"SubjectWiseTeacher" },

    Semester: { type: String, required: true },


    internal: { type: Number, default: 0 },

    lab: { type: String, default: 0 },

    final: { type: String, default: 0 },

    percentage: { type: Number, default: 0 },

    Grade: { type: String, default: '' },

    total: { type: Number, default: 0 }





})




module.exports = mongoose.model("StudentMarks", StudentMarks)