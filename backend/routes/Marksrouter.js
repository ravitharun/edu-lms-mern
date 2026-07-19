const express = require("express")
const { AssiginMarks, fetchMarksByStudentId } = require("../controllers/Marks")
const authMiddleware = require("../Middleware/Authmiddleware")
const studentMarksRouter = express.Router()

studentMarksRouter.post("/AssiginMarks",authMiddleware, AssiginMarks)
// http://localhost:5001/api/studentMarks/fetchMarksByStudentId
studentMarksRouter.get("/fetchMarksByStudentId", authMiddleware,fetchMarksByStudentId)

module.exports = studentMarksRouter