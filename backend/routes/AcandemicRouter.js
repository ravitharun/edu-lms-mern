const express=require("express")
const { add } = require("../controllers/AcademicController")
const HandelAcademicRouter=express.Router()

HandelAcademicRouter.post("/addAcademic",add)
module.exports={HandelAcademicRouter}