const express = require("express")
const {ProfileCreate,GetProfile} = require("../controllers/Profiles")
const authMiddleware = require("../Middleware/Authmiddleware")
const  ApiMonitioring  = require("../Middleware/ApiMonitorning")
const { upload } = require("../Middleware/upload")
const ProfileRouter = express.Router()
ProfileRouter.post("/CreateProfile",upload.single("profile"),ProfileCreate)
ProfileRouter.get("/Get",authMiddleware,ApiMonitioring,GetProfile)

module.exports=ProfileRouter