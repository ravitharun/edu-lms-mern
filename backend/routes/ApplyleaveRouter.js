const express=require("express")
const { ApplyLeave, GetallLeavesdata, GetleavesByrequestEmail, GetleavesByupdateStatus } = require("../controllers/ApplyLeaveController")
const leaveRouter=express.Router()
leaveRouter.post("/ApplyLeave",ApplyLeave)
leaveRouter.get("/GetallLeavesdata",GetallLeavesdata)
leaveRouter.get("/Requeatemail",GetleavesByrequestEmail)
leaveRouter.patch("/updateStatus",GetleavesByupdateStatus)
module.exports={leaveRouter}