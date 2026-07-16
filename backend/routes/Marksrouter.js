const express = require("express")
const { AssiginMarks, fetchMarksByStudentId } = require("../controllers/Marks")
const studentMarksRouter = express.Router()

studentMarksRouter.post("/AssiginMarks", AssiginMarks)
// http://localhost:5001/api/studentMarks/fetchMarksByStudentId
studentMarksRouter.get("/fetchMarksByStudentId", fetchMarksByStudentId)

module.exports = studentMarksRouter