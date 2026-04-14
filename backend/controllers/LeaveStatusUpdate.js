const { Acceptleave } = require("../Email/textEmail");
const { ApplyToLeave } = require("../models/ApplyLeave");

const leaveStatus = async (req, res) => {
    try {
        const { st, leaveid } = req.body
        const io = getIO()
        if (!st || !leaveid) {
            return res.status(400).json({
                success: false,
                message: "Status and Leave ID are required",
            });
        }
        const updateStatus = await ApplyToLeave.findOneAndUpdate({ Leave_id: leaveid }, { Application_status: st }, { new: true })
        if (updateStatus == null) {
            return res.status(404).json({ meesage: "Updating the status some thing went wrong." })
        }
        const responseemail = await Acceptleave(updateStatus)
        io.emit("leaveStatusUpdate", `Your leave  is ${st} ${updateStatus}`)
        return res.json({ message: `status updated ${st}`, st, leaveid, updateStatus, responseemail })
    } catch (error) {
        console.log(error.message, 'error From the email Approveal.')

    }

}

module.exports = { leaveStatus }