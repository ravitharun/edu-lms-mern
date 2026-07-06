const express = require("express")
const { CreateAssignments, FetchAssignments, SubmitAssignments } = require("../controllers/Assignments")
const { uploadAssignments } = require("../Expose/Cloudinarystorage")

const Assignments = express.Router()

Assignments.post("/Assignments", uploadAssignments.single("Assignmentfile"), CreateAssignments)
// Assignments.post("/Assignments", , CreateAssignments)
Assignments.get("/Assignment/{section}", FetchAssignments)
Assignments.post("/SubmitAssignments",uploadAssignments.single("assignmentFile"), SubmitAssignments)

module.exports = Assignments