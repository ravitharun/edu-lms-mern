const express=require("express")
const { ApplyLeave } = require("../controllers/ApplyLeaveController")
const leaveRouter=express.Router()
leaveRouter.post("/ApplyLeave",ApplyLeave)
module.exports={leaveRouter}