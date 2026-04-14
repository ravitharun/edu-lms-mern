const leaveAddEmail = require("../Email/textEmail");
const { ApplyToLeave } = require("../models/ApplyLeave")
const { v4: uuidv4 } = require("uuid");
const ApplyLeave = async (req, res) => {
    try {
        const { ApplyLeave } = req.body
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
        await leaveAddEmail.leaveAddEmail(ApplyLeave, id)

        await Apply.save()
        return res.json({ message: "leave application sent" })
    } catch (error) {
        console.log(error, 'err')
        return res.json({ message: error.message })
    }


}




const GetallLeavesdata = async (req, res) => {
    try {
        const { EmpID, EmpEmail } = req.query
        if (!EmpID || !EmpEmail) return res.status(404).json({ message: "someThing went Wrong." })
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
        const response_Referemail = await ApplyToLeave.findOneAndUpdate(
            { Leave_id: data.Leave_id },   // filter
            {
                Application_status: data.Status,
                Fromdate: data.Fromdate,
                Todate: data.Todate
            },                    // update fields
            { new: true }      // return updated document
        );
        const response_email = {
            name: response_Referemail.EmpName,
            EmpID: response_Referemail.EmpID,
            to_email: response_Referemail.Useremail,
            EmpReq_EmailId: response_Referemail.EmpReq_EmailId,
            LeaveStatus: response_Referemail.Application_status,
            TotalDays: response_Referemail.TotalDays,
            leaveType: response_Referemail.leaveType,
            updatedAt_leave: new Date(response_Referemail.updatedAt).toLocaleDateString(),
            Fromdate: new Date(response_Referemail.Fromdate).toLocaleDateString(),
            Todate: new Date(response_Referemail.Todate).toLocaleDateString(),


        }
        await response_Referemail.save()
        leaveAddEmail.Acceptleave(response_email)
        return res.status(200).json({ message: response_Referemail })

    } catch (error) {
        return res.status(500).json({ message: "server error." })
    }
}
module.exports = { ApplyLeave, GetallLeavesdata, GetleavesByrequestEmail, GetleavesByupdateStatus }