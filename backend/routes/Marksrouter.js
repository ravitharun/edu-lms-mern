const express = require("express")
const { AssiginMarks, fetchMarksByStudentId, FetchBySingleStudentId } = require("../controllers/Marks")
const authMiddleware = require("../Middleware/Authmiddleware")
const studentMarksRouter = express.Router()

studentMarksRouter.post("/AssiginMarks",authMiddleware, AssiginMarks)
// http://localhost:5001/api/studentMarks/Student/sem
studentMarksRouter.get("/Student/sem",FetchBySingleStudentId)
studentMarksRouter.get("/fetchMarksByStudentId", authMiddleware,fetchMarksByStudentId)

module.exports = studentMarksRouter