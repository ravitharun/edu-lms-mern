const express=require("express")
const { AccountDeactivate } = require("../controllers/AccountDeactivate")
const AccountDeactivateRouter=express.Router()
AccountDeactivateRouter.post("/Deactivate",AccountDeactivate)
module.exports=AccountDeactivateRouter