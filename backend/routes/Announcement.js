const express = require("express")
const { addAnnouncement, FetchAll } = require("../controllers/AnnouncementContorller")
const AnnouncementRouter = express.Router()
const upload = require("../Middleware/upload")
AnnouncementRouter.post("/addAnnouncement", upload.single("profile"), addAnnouncement)
AnnouncementRouter.get("/FetchAllAnnouncement", FetchAll)
module.exports = AnnouncementRouter