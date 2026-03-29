const mongoose = require("mongoose")
const TimeTableSchema = new mongoose.Schema({

    Department: { type: String, required: true },
    AssignedClass: { type: String, required: true },
    SemesterByyear: { type: String, required: true },
    StartTime: { type: Date, required: true },
    EndTime: { type: Date, required: true },
    AddSubject: { type: String, required: true },
    AddedByID: { type: String, required: true }

}, { timestamps: true, timeseries: true })


const AddTimetableSchema = mongoose.model("StudentsTimeTable", TimeTableSchema)
module.exports = { AddTimetableSchema }