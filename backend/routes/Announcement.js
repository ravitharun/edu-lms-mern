const express = require("express")
const { addAnnouncement, FetchAll } = require("../controllers/AnnouncementContorller")
const AnnouncementRouter = express.Router()
const {upload} = require("../Middleware/upload")
const { apiLimiter } = require("../Middleware/ReateLimeter")
AnnouncementRouter.post("/addAnnouncement", upload.single("profile"), apiLimiter,addAnnouncement)
AnnouncementRouter.get("/FetchAllAnnouncement",apiLimiter, FetchAll)
module.exports = AnnouncementRouter