const express=require("express")
const { AddholidaysBulk, GetHolidays } = require("../controllers/ManageHolidayController")
const { apiLimiter } = require("../Middleware/ReateLimeter")
const Manageholiday=express.Router()
Manageholiday.post("/AddHolidays",apiLimiter,AddholidaysBulk)
Manageholiday.get("/Holidays",apiLimiter,GetHolidays)
module.exports={Manageholiday}