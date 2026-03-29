const mongoose = require("mongoose")
const Announcement = new mongoose.Schema({
    Title: { type: String, required: true },
    Banner_url: { type: String, required: true },
    AnnouncementType: { type: String, required: true },
    EndDate: { type: String, required: true },
    StartDate: { type: String, required: true },
    TargetAudience: { type: String, required: true },
    AddedBy: { type: String, required: true }
}, { timestamps: true })
const AddAnnouncement = mongoose.model("announcement", Announcement);
module.exports = { AddAnnouncement };