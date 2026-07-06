const mongoose = require("mongoose")

const Assignment = new mongoose.Schema({
    Section: { type: String, required: true },
    subjectId: { type: String, required: true },
    AssignementName: { type: String, required: true },
    Assignementurl: { type: String, required: true },
    DueDate: { type: Date, required: true },
    Marks: { type: Number, required: true },
    Addedby: { type: String, required: true },
    totalSubmissions: { type: Number, default: 0 }
}, {
    timestamps: true,
})
const uploadAssigment = mongoose.model("Assignment", Assignment)
module.exports = uploadAssigment