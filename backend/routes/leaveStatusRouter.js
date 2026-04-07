const express =require("express")
const { leaveStatus } = require("../controllers/LeaveStatusUpdate")
const LeaveStatusRouter = express.Router()
// url/api/LeaveStatusResponse/leaveStatus
LeaveStatusRouter.get("/leaveStatus",leaveStatus)
module.exports = { LeaveStatusRouter }