const express = require("express");
const { SubjectsSchemaController, fetchAllSubjects, fetchAllTeachers } = require("../controllers/SubjectsController");
const Subjects=express.Router();
Subjects.post("/add/subject",SubjectsSchemaController)
Subjects.get("/get/subjects",fetchAllSubjects)
Subjects.get("/get/Teachers",fetchAllTeachers)
module.exports=Subjects