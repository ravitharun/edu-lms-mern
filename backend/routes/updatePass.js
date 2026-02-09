const express = require("express")
const {passowrdUpdateEmail,updatepassword} = require("../controllers/UpdatePassowrd")
const updatePasswordRouter = express.Router()
updatePasswordRouter.post("/passowrdUpdate", passowrdUpdateEmail)
updatePasswordRouter.post("/UpdatePassword",updatepassword )
module.exports = updatePasswordRouter