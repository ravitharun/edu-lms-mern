const express=require("express")
const { AddholidaysBulk, GetHolidays } = require("../controllers/ManageHolidayController")
const Manageholiday=express.Router()
Manageholiday.post("/AddHolidays",AddholidaysBulk)
Manageholiday.get("/Holidays",GetHolidays)
module.exports={Manageholiday}