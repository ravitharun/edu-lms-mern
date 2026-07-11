// import mongoose from "mongoose";
const mongoose = require("mongoose")

const SubjectMarksSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    internal: {
      obtained: {
        type: Number,
        required: true,
        
      },
      total: {
        type: Number,
        required: true,
        minlength: 1,

      },
    },
    // vrvr 
    lab: {
      obtained: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
        minlength: 1,
      },
    },

    final: {
      obtained: {
        type: Number,
          required: true,
      },
      total: {
        type: Number,
         required: true,
      },
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    grade: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["PASS", "FAIL", "ABSENT"],
      default: "FAIL",
    },
  },
  { _id: false }
);

const SemesterResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    subjects: [SubjectMarksSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SemesterResult", SemesterResultSchema);