const express = require("express")
const { apiLimiter } = require("../Middleware/ReateLimeter")
const { GetuserInfo } = require("../controllers/AdminCountuser")
const Admin_UserInfo = express.Router()
Admin_UserInfo.get("/user", apiLimiter, GetuserInfo)
module.exports = { Admin_UserInfo }