const express=require("express")
const { AccountDeactivate, UpdateDeactivate } = require("../controllers/AccountDeactivate")
const AccountDeactivateRouter=express.Router()
AccountDeactivateRouter.post("/Deactivate",AccountDeactivate)
AccountDeactivateRouter.put("/UpdateDeactivate",UpdateDeactivate)
module.exports=AccountDeactivateRouter