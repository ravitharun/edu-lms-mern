const mongoose = require("mongoose")

const Assignment = new mongoose.Schema({
    Section: { type: String, required: true },
    AssignementName: { type: String, required: true },
    Assignementurl: { type: String, required: true },
    DueDate: { type: Date, required: true },
    Marks: { type: number, required: true },
    Addedby: {  type:mongoose.Schema.Types.ObjectId, required: true },

},{
timestamps: true,
})
const uploadAssigment = mongoose.model("Assignment", Assignment)
module.exports = uploadAssigment