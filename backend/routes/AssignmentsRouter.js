const express = require("express")
const { CreateAssignments, FetchAssignments } = require("../controllers/Assignments")
const { uploadAssignments } = require("../Expose/Cloudinarystorage")

const Assignments = express.Router()

Assignments.post("/Assignments", uploadAssignments.single("Assignmentfile"), CreateAssignments)
Assignments.get("/Assignment/{section}", FetchAssignments)

module.exports = Assignments