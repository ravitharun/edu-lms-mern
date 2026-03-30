const express=require("express")
const { GetStudents } = require("../controllers/AttandanceController")
const { apiLimiter } = require("../Middleware/ReateLimeter")
const AttandanceRouter=express.Router()
AttandanceRouter.get("/StudentsAttandance",apiLimiter,GetStudents)
module.exports={AttandanceRouter}