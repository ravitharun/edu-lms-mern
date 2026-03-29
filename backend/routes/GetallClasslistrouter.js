const express =require("express")
const {getClasslist,GetClassSection, getStudents} = require("../controllers/GetAllClasslist")
const authMiddleware = require("../Middleware/Authmiddleware")
const { apiLimiter } = require("../Middleware/ReateLimeter")

const classlist=express.Router()
classlist.get("/get",apiLimiter,getClasslist)
classlist.get("/getsection",apiLimiter,GetClassSection)
classlist.get("/getStudents",apiLimiter,getStudents)
module.exports={classlist}    