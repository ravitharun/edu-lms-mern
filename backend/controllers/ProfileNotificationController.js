const User = require("../models/User");
const { getIO } = require("../socket");

const HandelProfileViewNotification = async (req, res) => {

    try {
        const io = getIO()
        const { Viewid, viewedByid } = req.body

        const ViewInfo = await User.findOne({ teacher_Id: Viewid })
        const viewedByidInfo = await User.findOne({ Student_ID: viewedByid })
        if (viewedByidInfo.isActive) {

            io.emit("ProfileView", {
                message: `👀 ${ViewInfo?.role || "Teacher"} ${ViewInfo?.name || "User"} viewed your profile.`,
                profileUrl: ViewInfo?.profileUrl,
                userId: ViewInfo?._id,
            });
        }

        return res.status(200).json({ message: "Notification sent" })
    } catch (error) {
        console.log(error?.message);

        return res.status(500).json({ message: "server error" })
    }
}

module.exports = { HandelProfileViewNotification }