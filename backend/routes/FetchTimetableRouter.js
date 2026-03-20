const express=require("express")
const { FetchStudentTimetabel } = require("../controllers/FetchTimeTable")
const HandelFetchTimeTableRouter=express.Router()
HandelFetchTimeTableRouter.get("/StudentTimeTabel",FetchStudentTimetabel)
module.exports={HandelFetchTimeTableRouter}