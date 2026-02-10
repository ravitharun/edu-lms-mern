const { SubjectAddByteacher, GetallAssignedSubjects } = require("../controllers/AssiginSubjects")

const express=require("express")
const authMiddleware = require("../Middleware/Authmiddleware")
const SubjectTeacher=express.Router()
SubjectTeacher.post("/assign/subjects",authMiddleware,SubjectAddByteacher)
SubjectTeacher.get("/assign/AllSubjects",authMiddleware,GetallAssignedSubjects)
module.exports={SubjectTeacher}