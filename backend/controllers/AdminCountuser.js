const User = require("../models/User")

const GetuserInfo = async (req, res) => {
    try {
        const GetuserInfo_user_student = (await User.find({ role: "student" }))
        const GetuserInfo_user_Teacher = (await User.find({ role: "Teacher" }))
        const GetuserInfo_user_ActiveAccounts = (await User.find({ AccountStatus: false }))
        const GetuserInfo_user_DeActiveAccounts = (await User.find({ AccountStatus: true }))

        return res.status(200).json({ message: GetuserInfo_user_student.length, TotalTeachers: GetuserInfo_user_Teacher.length, ActiveAccounts: GetuserInfo_user_ActiveAccounts.length, TotalDeActiveAccount: GetuserInfo_user_DeActiveAccounts.length })

    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }

}


module.exports = { GetuserInfo }