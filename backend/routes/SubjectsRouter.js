const express = require("express");
const { SubjectsSchemaController, fetchAllSubjects } = require("../controllers/SubjectsController");
const Subjects=express.Router();
Subjects.post("/add/subject",SubjectsSchemaController)
Subjects.get("/get/subjects",fetchAllSubjects)
module.exports=Subjects