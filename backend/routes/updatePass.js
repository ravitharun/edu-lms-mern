const express = require("express")
const passowrdUpdate = require("../controllers/UpdatePassowrd")
const updatePasswordRouter = express.Router()
updatePasswordRouter.post("/passowrdUpdate", passowrdUpdate)
module.exports = updatePasswordRouter