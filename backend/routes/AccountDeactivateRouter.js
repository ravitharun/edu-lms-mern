const express=require("express")
const { AccountDeactivate, UpdateDeactivate,AccountDeactivateUpdateReason } = require("../controllers/AccountDeactivate")
const AccountDeactivateRouter=express.Router()
const authMiddleware = require("../Middleware/Authmiddleware")
AccountDeactivateRouter.post("/Deactivate",AccountDeactivate)
AccountDeactivateRouter.post("/UpdateReason",authMiddleware,AccountDeactivateUpdateReason)
AccountDeactivateRouter.put("/UpdateDeactivate",UpdateDeactivate)
module.exports=AccountDeactivateRouter