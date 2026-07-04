const express=require("express")
const { CreateAssignments,FetchAssignments } = require("../controllers/Assignments")
const Assignments=express.Router()

Assignments.post("/Assignments",CreateAssignments)
Assignments.get("/Assignments/{id}",FetchAssignments)

module.exports=Assignments