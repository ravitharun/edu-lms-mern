const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true   // 🔑 ONE course = ONE id
    },
    subject: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const subject = mongoose.model("Subject", subjectSchema);
module.exports = { subject };