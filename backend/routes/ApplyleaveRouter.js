const express=require("express")
const { ApplyLeave, GetallLeavesdata, GetleavesByrequestEmail, GetleavesByupdateStatus } = require("../controllers/ApplyLeaveController")
const { apiLimiter } = require("../Middleware/ReateLimeter")
const leaveRouter=express.Router()
leaveRouter.post("/ApplyLeave",apiLimiter,ApplyLeave)
leaveRouter.get("/GetallLeavesdata",apiLimiter,GetallLeavesdata)
leaveRouter.get("/Requeatemail",apiLimiter,GetleavesByrequestEmail)
leaveRouter.patch("/updateStatus",apiLimiter,GetleavesByupdateStatus)
module.exports={leaveRouter}