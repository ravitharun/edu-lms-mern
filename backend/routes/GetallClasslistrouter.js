const express =require("express")
const {getClasslist,GetClassSection, getStudents} = require("../controllers/GetAllClasslist")
const authMiddleware = require("../Middleware/Authmiddleware")
const { apiLimiter } = require("../Middleware/ReateLimeter")

const classlist=express.Router()
classlist.get("/get",apiLimiter,authMiddleware,getClasslist)
classlist.get("/getsection",apiLimiter,authMiddleware,GetClassSection)
classlist.get("/getStudents",apiLimiter,authMiddleware,getStudents)
module.exports={classlist}    