const express=require("express")
const { HandelProfileViewNotification } = require("../controllers/ProfileNotificationController")
const ProfileNotificationRouter=express.Router()
ProfileNotificationRouter.post("/Students",HandelProfileViewNotification)
module.exports={ProfileNotificationRouter}