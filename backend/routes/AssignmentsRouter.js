const express = require("express")
const { CreateAssignments, FetchAssignments, SubmitAssignments,GetSubmissions, ValidateAssignments, fetchMarksByStudentId } = require("../controllers/Assignments")
const { uploadAssignments } = require("../Expose/Cloudinarystorage")
const authMiddleware = require("../Middleware/Authmiddleware")

const Assignments = express.Router()

Assignments.post("/Assignments", uploadAssignments.single("Assignmentfile"), CreateAssignments)
// Assignments.post("/Assignments", , CreateAssignments)
Assignments.get("/Assignment/{section}", FetchAssignments)
Assignments.get("/GetSubmissions", GetSubmissions)
Assignments.put("/UpdateSubmissions",ValidateAssignments)
Assignments.get("/Marks",fetchMarksByStudentId)
// /Student/sem
Assignments.post("/SubmitAssignments",uploadAssignments.single("assignmentFile"), SubmitAssignments)

module.exports = Assignments