const mongoose = require("mongoose")
const StudentMarks = new mongoose.Schema({
    // id
    id: { type: mongoose.Schema.ObjectId, required: true },
    // Mjp001
    subjectid: { type: mongoose.Schema.ObjectId, required: true },
    // cse-8
    Semester: { type: String, required: true },
    // 32
    internal: { type: Number, default: 0 },
    // 22
    lab: { type: String, default: 0 },
    // intrn+lab+fina/3
    final: { type: String, default: 0 },
    // Total based %
    percentage: { type: Number, default: 0 },
    // Total based Grade
    Grade: { type: String, default: '' },
   
    total: { type:Number, default: 0 }





})




module.exports = mongoose.model("StudentMarks", StudentMarks)