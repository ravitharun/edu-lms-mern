const express=require("express")
const maintanceMode = require("../controllers/MaintanceMode")
const MaintanceMode=express.Router()
MaintanceMode.post("/Activate",maintanceMode)
// MaintanceMode.get("",)
module.exports=MaintanceMode
