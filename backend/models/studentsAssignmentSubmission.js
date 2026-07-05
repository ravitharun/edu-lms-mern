


const mongoose = require("mongoose")


const assignmentSubmissionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
    },

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },

    submissionUrl: String,
    obtainedMarks: {
        type: Number,
        default: 0,
    },

    status: {
        type: String,
        default: "Pending",
    },

    submittedAt: {
        type: Date,
        default: Date.now,
    },
},{
      timestamps: true,
});