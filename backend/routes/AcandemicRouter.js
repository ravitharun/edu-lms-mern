const express=require("express")
const { add, getData, AddTimeTable, GetTimeTableBySemester } = require("../controllers/AcademicController")
const { apiLimiter } = require("../Middleware/ReateLimeter")
const HandelAcademicRouter=express.Router()

HandelAcademicRouter.post("/addAcademic",apiLimiter,add)
HandelAcademicRouter.get("/get/AcademicDetails",apiLimiter,getData)
HandelAcademicRouter.post("/Add/TimeTable",apiLimiter,AddTimeTable)
HandelAcademicRouter.get("/TimeTable",apiLimiter,GetTimeTableBySemester)
module.exports={HandelAcademicRouter}