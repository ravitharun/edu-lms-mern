const express=require("express")
const { GetStudents } = require("../controllers/AttandanceController")
const AttandanceRouter=express.Router()
AttandanceRouter.get("/StudentsAttandance",GetStudents)
module.exports={AttandanceRouter}