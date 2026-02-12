const express =require("express")
const getClasslist = require("../controllers/GetAllClasslist")
const authMiddleware = require("../Middleware/Authmiddleware")
const classlist=express.Router()
classlist.get("/get",getClasslist)
// classlist.get("/get",getClasslist)
module.exports={classlist}    