const express = require("express");
const { SubjectsSchemaController } = require("../controllers/SubjectsController");
const Subjects=express.Router();
Subjects.post("/add/subject",SubjectsSchemaController)
module.exports=Subjects