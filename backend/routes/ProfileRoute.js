const express = require("express")
const {ProfileCreate,GetProfile} = require("../controllers/Profiles")
const upload = require("../Middleware/upload")
const authMiddleware = require("../Middleware/Authmiddleware")
const ProfileRouter = express.Router()
ProfileRouter.post("/CreateProfile",upload.single("profile"),ProfileCreate)
ProfileRouter.get("/Get",authMiddleware,GetProfile)

module.exports=ProfileRouter