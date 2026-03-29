const express = require("express");
const { SubjectsSchemaController, fetchAllSubjects, fetchAllTeachers, addByOne,DeleteCourse, fetchTeachersInfo, StudentsInfo } = require("../controllers/SubjectsController");
const authMiddleware = require("../Middleware/Authmiddleware");
const Subjects=express.Router();
Subjects.post("/add/subject",authMiddleware,SubjectsSchemaController)
Subjects.get("/get/subjects",authMiddleware,fetchAllSubjects)
Subjects.get("/get/Teachers",authMiddleware,fetchAllTeachers)
Subjects.get("/get/TeachersInfo",authMiddleware,fetchTeachersInfo)
Subjects.get("/get/StudentsInfo",authMiddleware,StudentsInfo)
// Subjects.get("/get/TeachersInfo",fetchTeachersInfo)
Subjects.post("/add/subjectByForm",authMiddleware,addByOne)
Subjects.delete("/delete/Course/:id",authMiddleware,DeleteCourse)
module.exports=Subjects