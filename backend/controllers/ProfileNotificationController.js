const User = require("../models/User");
const { getIO } = require("../socket");

const HandelProfileViewNotification = async (req, res) => {

    try {
        const io = getIO()
        const { ViewID, ViewedById } = req.body

        const ViewInfo = await User.findOne({ teacher_Id: ViewID })
        const viewedByidInfo = await User.findOne({ Student_ID: ViewedById })
        console.log(ViewInfo, 'viewedByidInfo')

        const getTimeAgo = (createdAt) => {
            const now = new Date();
            const past = new Date(createdAt);
            const diff = Math.floor((now - past) / 1000); // seconds
            if (diff < 60) return `${diff} sec ago`;
            if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
            if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
            return `${Math.floor(diff / 86400)} days ago`;
        };
        if (viewedByidInfo.isActive) {
            return io.emit("ProfileView", {
                message: `👀 Prof. ${ViewInfo?.name || "Someone"} viewed your profile`, profileUrl: ViewInfo?.profilePreview,
                timestamp: getTimeAgo(new Date()),
                userId: ViewInfo?._id,
            });
        }
        console.log('user offline')
        return res.status(200).json({ message: "Notification sent" })
    } catch (error) {
        console.log(error?.message);

        return res.status(500).json({ message: "server error" })
    }
}

module.exports = { HandelProfileViewNotification }