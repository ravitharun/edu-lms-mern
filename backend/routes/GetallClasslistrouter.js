const express =require("express")
const {getClasslist,GetClassSection, getStudents} = require("../controllers/GetAllClasslist")
const authMiddleware = require("../Middleware/Authmiddleware")
const classlist=express.Router()
classlist.get("/get",getClasslist)
classlist.get("/getsection",GetClassSection)
classlist.get("/getStudents",getStudents)
module.exports={classlist}    