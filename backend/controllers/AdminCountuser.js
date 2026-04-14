const { json } = require("express")
const { redisClient } = require("../Expose/redis")
const User = require("../models/User")

const GetuserInfo = async (req, res) => {
    try {

        const CacheUserDataCount = await redisClient.get("CacheUserDataCount")
        if (CacheUserDataCount) { return res.status(200).json({ message: JSON.parse(CacheUserDataCount) }) }
        const GetuserInfo_user_student = (await User.find({ role: "student" }))
        const GetuserInfo_user_Teacher = (await User.find({ role: "Teacher" }))
        const GetuserInfo_user_ActiveAccounts = (await User.find({ AccountStatus: false }))
        const GetuserInfo_user_DeActiveAccounts = (await User.find({ AccountStatus: true }))
        const userdatacount = {
            "GetuserInfo_user_student": GetuserInfo_user_student.length,
            "GetuserInfo_user_Teacher": GetuserInfo_user_Teacher.length,
            "GetuserInfo_user_ActiveAccounts": GetuserInfo_user_ActiveAccounts.length,
            "GetuserInfo_user_DeActiveAccounts": GetuserInfo_user_DeActiveAccounts.length,
        }
        await redisClient.setEx("CacheUserDataCount", 500, JSON.stringify(userdatacount))
        return res.status(200).json({ message: userdatacount })

    }
    catch (err) {
        console.log(err, "errerr")
        return res.status(500).json({ message: "Server Error" })
    }

}


module.exports = { GetuserInfo }