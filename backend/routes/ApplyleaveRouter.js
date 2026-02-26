const express=require("express")
const { ApplyLeave, GetallLeavesdata, GetleavesByrequestEmail } = require("../controllers/ApplyLeaveController")
const leaveRouter=express.Router()
leaveRouter.post("/ApplyLeave",ApplyLeave)
leaveRouter.get("/GetallLeavesdata",GetallLeavesdata)
leaveRouter.get("/Requeatemail",GetleavesByrequestEmail)
module.exports={leaveRouter}