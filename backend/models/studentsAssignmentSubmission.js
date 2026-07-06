


const mongoose = require("mongoose")


const assignmentSubmissionSchema = new mongoose.Schema({
    assignmentId: {
        type: String,
     
        required: true,
    },
    submissionassignmentId: {
        type: String,
        ref: "Assignment",
        required: true,
    },
    subjectid: {
        type: String,
        ref: "Assignment",
        required: true,
    },
    feedback: { type: String, default: "" },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    submissionUrl: String,
    obtainedMarks: {
        type: Number,
        default: 0,
    },
    TotalMarks: {
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
}, {
    timestamps: true,
});


const UploadassignmentModel = mongoose.model("AssignmentSubmission", assignmentSubmissionSchema)


module.exports = UploadassignmentModel