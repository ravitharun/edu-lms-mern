const { SubjectAddByteacher, GetallAssignedSubjects, GetSubjectsByclassID, UnassiginTeacherBySubjetcts } = require("../controllers/AssiginSubjects")

const express=require("express")
const authMiddleware = require("../Middleware/Authmiddleware")
const SubjectTeacher=express.Router()
SubjectTeacher.post("/assign/subjects",authMiddleware,SubjectAddByteacher)
SubjectTeacher.delete("/Delete/AssiginSubjects",authMiddleware,UnassiginTeacherBySubjetcts)
SubjectTeacher.get("/assign/AllSubjects",authMiddleware,GetallAssignedSubjects)
SubjectTeacher.get("/Get/Subjects/:id",GetSubjectsByclassID)
module.exports={SubjectTeacher}