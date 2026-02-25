const { ApplyToLeave } = require("../models/ApplyLeave")

const ApplyLeave = async (req, res) => {
    // {
    //   EmpName: 'Ravi Tharun',
    //   EmpID: 'Teacher-6087',
    //   Fromdate: '2026-02-25',
    //   EmpEmailId: 'tharunravi672@gmail.com',
    //   Todate: '2026-02-27',
    //   leaveType: 'Casual Leave',
    //   TotalDays: 3
    // }
    try {
        const { ApplyLeave } = req.body
        console.log(ApplyLeave)
        if (!ApplyLeave) return res.status(404).json({ message: "Something Went Wrong." })
        const Apply = new ApplyToLeave({
            EmpName: ApplyLeave.EmpName,
            EmpID: ApplyLeave.EmpID,
            ReasonLeave: ApplyLeave.ReasonLeave,
            EmpEmailId: ApplyLeave.EmpEmailId,
            Fromdate: ApplyLeave.Fromdate,
            Todate: ApplyLeave.Todate,
            leaveType: ApplyLeave.leaveType,
            TotalDays: ApplyLeave.TotalDays,
        })

        await Apply.save()
        return res.json({ message: "leave application sent" })
    } catch (error) {
        console.log(error.message)
        return res.json({ message: error.message })
    }


}

module.exports = { ApplyLeave }