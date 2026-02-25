const express=require("express")
const { ApplyLeave, GetallLeavesdata } = require("../controllers/ApplyLeaveController")
const leaveRouter=express.Router()
leaveRouter.post("/ApplyLeave",ApplyLeave)
leaveRouter.get("/GetallLeavesdata",GetallLeavesdata)
module.exports={leaveRouter}