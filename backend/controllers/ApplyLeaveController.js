const { ApplyToLeave } = require("../models/ApplyLeave")

const ApplyLeave = async (req, res) => {
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
const GetallLeavesdata = async (req, res) => {
    try {
        const { EmpID } = req.query
        if (!EmpID) return res.status(404).json({ message: "someThing went Wrong." })
        const getEmailBasedLeaves = await ApplyToLeave.find({ EmpID: EmpID })
        if (getEmailBasedLeaves.length == 0)
            return res.status(200).json({ message: "No Leave Applications Yet" })
        return res.status(200).json({ message: getEmailBasedLeaves })

    } catch (error) {
        console.log(error.message, 'err from the GetallLeavesData api call.')
        return res.status(500).json({ message: 'server error' })

    }

}


const GetleavesByrequestEmail = async (req, res) => {
    try {
        const { Referemail } = req.query
        // const Referemail='tharunravi672@gmail.com'
        console.log(Referemail, 'Referemail')
        const response_Referemail = await ApplyToLeave.find({ EmpEmailId: Referemail })
        if (response_Referemail.length == 0) {
            return res.status(200).json({ message: "No leaves Apply." })
        }
        console.log(response_Referemail, 'response_Referemail')
        return res.status(200).json({ message: response_Referemail })

    } catch (error) {
        return res.status(500).json({ message: "server error." })
    }
}
const GetleavesByupdateStatus = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, 'Referemail')
        const response_Referemail = await ApplyToLeave.findOneAndUpdate({ EmpID: data.id }, { Application_status: data.Status },              // update data
            { new: true }                  // options
        )
        console.log(response_Referemail, 'response_Referemail')
        // if(response_Referemail.length==0){
        //     return res.status(200).json({message:"No leaves Apply."})
        // }
        // console.log(response_Referemail,'response_Referemail')
        // return res.status(200).json({message:response_Referemail})

    } catch (error) {
        return res.status(500).json({ message: "server error." })
    }
}
module.exports = { ApplyLeave, GetallLeavesdata, GetleavesByrequestEmail, GetleavesByupdateStatus }