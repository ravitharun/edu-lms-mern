
const mongoose = require("mongoose");

const subjectWiseTeacherSchema = new mongoose.Schema({

  classId: {
    type: String, // e.g. "CSE-3"
    required: true,
    unique: true
  },

  department: {
    type: String, // CSE, ECE
    required: true
  },

  year: {
    type: Number, // 1,2,3,4
    required: true
  },

  subjects: [
    {
      subjectId: {
        type: String, // CS301
        required: true
      },

      subjectName: {
        type: String, // DBMS
        // required: true
      },

      teacherId: {
        type: String,
        // required: true
      },
      name: {
        type: String,
        // required: true
      },
      Techer_profile: {
        type: String,

      }

    }
  ]
}, { timestamps: true });

module.exports = mongoose.model(
  "SubjectWiseTeacher",
  subjectWiseTeacherSchema
);
