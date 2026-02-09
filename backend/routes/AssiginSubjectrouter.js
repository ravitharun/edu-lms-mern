const { SubjectAddByteacher } = require("../controllers/AssiginSubjects")

const express=require("express")
const SubjectTeacher=express.Router()
SubjectTeacher.post("/assign/subjects",SubjectAddByteacher)
module.exports={SubjectTeacher}