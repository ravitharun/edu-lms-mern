const express=require("express")
const {maintanceMode,FetchMode,UpdateMode} = require("../controllers/MaintanceMode")
const MaintanceMode=express.Router()
MaintanceMode.post("/Activate",maintanceMode)
MaintanceMode.get("/FetchMode",FetchMode)
MaintanceMode.patch("/UpdateMode",UpdateMode)
module.exports=MaintanceMode
