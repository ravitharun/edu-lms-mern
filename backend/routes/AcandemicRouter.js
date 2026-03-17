const express=require("express")
const { add, getData } = require("../controllers/AcademicController")
const HandelAcademicRouter=express.Router()

HandelAcademicRouter.post("/addAcademic",add)
HandelAcademicRouter.get("/get/AcademicDetails",getData)
module.exports={HandelAcademicRouter}