
const cloudinary = require("../config/cloudinary");
const { AddAnnouncement } = require("../models/Announcement");
const User = require("../models/User");
const { getIO } = require("../socket");
const addAnnouncement = async (req, res) => {
    try {
        const io = getIO()
    
        const getuserAddedInfoByname = await User.findOne({
            [req.body.Role === "Admin" ? "Admin_Id" : "teacher_Id"]: req.body.AddedBy
        });
        // console.log(getuserAddedInfoByname)
        const result = await cloudinary.uploader.upload(req.file.path)
        const add = new AddAnnouncement({
            Title: req.body.Title,
            Banner_url: result.url,
            AnnouncementType: req.body.AnnouncementType,
            EndDate: req.body.EndDate,
            StartDate: req.body.StartDate,
            TargetAudience: req.body.TargetAudience,
            AddedBy: req.body.AddedBy,
        })
        await add.save()
        io.emit("Announcement", `New Announcement: ${req.body.AnnouncementType} Notice Added By ${getuserAddedInfoByname.name.split(" ")[0]}-${getuserAddedInfoByname.role}`);
        //         console.log("emittting")
        return res.status(201).json({ message: "Announcement Published" })
    } catch (error) {
        console.log(error.message, 'error.message')
        return res.status(500).json({ message: error.message })

    }

}
const FetchAll = async (req, res) => {
    try {
        const GetAllannouncements = await AddAnnouncement.find({})
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