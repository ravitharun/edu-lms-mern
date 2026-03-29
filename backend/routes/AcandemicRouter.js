const express=require("express")
const { add, getData, AddTimeTable, GetTimeTableBySemester } = require("../controllers/AcademicController")
const HandelAcademicRouter=express.Router()

HandelAcademicRouter.post("/addAcademic",add)
HandelAcademicRouter.get("/get/AcademicDetails",getData)
HandelAcademicRouter.post("/Add/TimeTable",AddTimeTable)
HandelAcademicRouter.get("/TimeTable",GetTimeTableBySemester)
module.exports={HandelAcademicRouter}