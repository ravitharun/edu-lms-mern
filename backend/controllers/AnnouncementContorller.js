
const cloudinary = require("../config/cloudinary");
const { AddAnnouncement } = require("../models/Announcement");
const addAnnouncement = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result.url, 'result')
    const add = new AddAnnouncement({
        Title: req.body.Title,
        Banner_url: result.url,
        AnnouncementType: req.body.AnnouncementType,
        EndDate: req.body.EndDate,
        StartDate: req.body.StartDate,
        TargetAudience: req.body.TargetAudience,
    })
    await add.save()
    console.log({
        message: "Announcement Published"
    })
    return res.status(201).json({ message: "Announcement Published" })

}
const FetchAll = async (req, res) => {
    try {
        const GetAllannouncements = await AddAnnouncement.find({})
        console.log(GetAllannouncements, 'GetAllannouncements')
        if (GetAllannouncements.length == 0) {
            return res.status(404).json({ message: "No Announcements" })
        }
        return res.status(200).json({ message: GetAllannouncements })
    } catch (error) {
        console.log(error, "err form the GetAllannouncements:)")
        return res.status(500).json({ message: "SomeThing Went Worng." })
    }

}
module.exports = { addAnnouncement, FetchAll }