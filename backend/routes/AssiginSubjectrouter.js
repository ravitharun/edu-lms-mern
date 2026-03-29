const { SubjectAddByteacher, GetallAssignedSubjects, GetSubjectsByclassID, UnassiginTeacherBySubjetcts } = require("../controllers/AssiginSubjects")

const express=require("express")
const authMiddleware = require("../Middleware/Authmiddleware")
const { apiLimiter } = require("../Middleware/ReateLimeter")
const SubjectTeacher=express.Router()
SubjectTeacher.post("/assign/subjects",authMiddleware,apiLimiter,SubjectAddByteacher)
SubjectTeacher.delete("/Delete/AssiginSubjects",apiLimiter,UnassiginTeacherBySubjetcts)
SubjectTeacher.get("/assign/AllSubjects",authMiddleware,apiLimiter,GetallAssignedSubjects)
SubjectTeacher.get("/Get/Subjects/:id",apiLimiter,GetSubjectsByclassID)
module.exports={SubjectTeacher}