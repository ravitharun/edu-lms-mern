const mongoose = require("mongoose");

const LeaveApplicaltions = new mongoose.Schema({
    Leave_id: { type: String, required: true },
    EmpName: { type: String, required: true },
    EmpID: { type: String, required: true },
    EmpReq_EmailId: { type: String, required: true },
    Fromdate: { type: Date, required: true },
    Todate: { type: Date, required: true },
    Useremail: { type: String, required: true },
    leaveType: { type: String, required: true },
    TotalDays: { type: Number, required: true },
    Application_status: { type: String, default: "Inprogress", enum: ["Inprogress", 'Accepted', 'Rejected'] },
    ReasonLeave: { type: String, required: 1 }


},
    { timestamps: true }
)
const ApplyToLeave = mongoose.model("Leaves", LeaveApplicaltions);
module.exports = { ApplyToLeave };