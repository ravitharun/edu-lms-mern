const express = require("express");
const { SubjectsSchemaController, fetchAllSubjects, fetchAllTeachers } = require("../controllers/SubjectsController");
const authMiddleware = require("../Middleware/Authmiddleware");
const Subjects=express.Router();
Subjects.post("/add/subject",authMiddleware,SubjectsSchemaController)
Subjects.get("/get/subjects",authMiddleware,fetchAllSubjects)
Subjects.get("/get/Teachers",authMiddleware,fetchAllTeachers)
module.exports=Subjects