const { ApplyToLeave } = require("../models/ApplyLeave")
const { v4: uuidv4 } = require("uuid");
const ApplyLeave = async (req, res) => {
    try {
        const { ApplyLeave } = req.body
        console.log(ApplyLeave)
        const id = uuidv4();
        if (!ApplyLeave) return res.status(404).json({ message: "Something Went Wrong." })
        const Apply = new ApplyToLeave({
            Leave_id: id,
            EmpName: ApplyLeave.EmpName,
            Useremail: ApplyLeave.EmpEmail,
            EmpID: ApplyLeave.EmpID,
            ReasonLeave: ApplyLeave.ReasonLeave,
            EmpReq_EmailId: ApplyLeave.Emp_req_EmailId,
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
        const { EmpID, EmpEmail } = req.query
        console.log( req.query,' req.query')
        if (!EmpID || !EmpEmail) return res.status(404).json({ message: "someThing went Wrong." })
        const getEmailBasedLeaves = await ApplyToLeave.find({ EmpID: EmpID })
        console.log(getEmailBasedLeaves, 'getEmailBasedLeaves')
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
        const response_Referemail = await ApplyToLeave.find({ EmpReq_EmailId: Referemail })
        if (response_Referemail.length == 0) {
            return res.status(200).json({ message: "No leaves Apply." })
        }
        return res.status(200).json({ message: response_Referemail })

    } catch (error) {
        return res.status(500).json({ message: "server error." })
    }
}
const GetleavesByupdateStatus = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, 'req.body')
        const response_Referemail = await ApplyToLeave.findOneAndUpdate(
            { Leave_id: data.Leave_id },   // filter
            {
                Application_status: data.Status,
                Fromdate: data.Fromdate,
                Todate: data.Todate
            },                    // update fields
            { new: true }      // return updated document
        );
        console.log(response_Referemail, 'check the user')
        await response_Referemail.save()
        console.log('send the email to the person.', response_Referemail.Useremail)
        return res.status(200).json({ message: response_Referemail })

    } catch (error) {
        return res.status(500).json({ message: "server error." })
    }
}
module.exports = { ApplyLeave, GetallLeavesdata, GetleavesByrequestEmail, GetleavesByupdateStatus }