const express =require("express")
const { leaveStatus } = require("../controllers/LeaveStatusUpdate")
const LeaveStatusRouter = express.Router()
// url/api/LeaveStatusResponse/leaveStatus
LeaveStatusRouter.put("/leaveStatus",leaveStatus)
module.exports = { LeaveStatusRouter }