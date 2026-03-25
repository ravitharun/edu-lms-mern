const express=require("express")
const { AddholidaysBulk } = require("../controllers/ManageHolidayController")
const Manageholiday=express.Router()
Manageholiday.post("/AddHolidays",AddholidaysBulk)
module.exports={Manageholiday}