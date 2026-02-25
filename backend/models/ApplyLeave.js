const mongoose = require("mongoose");
// {
//   EmpName: 'Ravi Tharun',
//   EmpID: 'Teacher-6087',
//   Fromdate: '2026-02-25',
//   EmpEmailId: 'tharunravi672@gmail.com',
//   Todate: '2026-02-27',
//   leaveType: 'Casual Leave',
//   TotalDays: 3
// }
const LeaveApplicaltions = new mongoose.Schema({
    EmpName: { type: String, required: true },
    EmpID: { type: String, required: true },
    EmpEmailId: { type: String, required: true },
    Fromdate: { type: Date, required: true },
    Todate: { type: Date, required: true },
    leaveType: { type: String, required: true },
    TotalDays: { type: Number, required: true },
    Application_status: { type: String, default: "Inprogress" },
    ReasonLeave: { type: String, required: 1 }  


},
    { timestamps: true }
)
const ApplyToLeave = mongoose.model("Leaves", LeaveApplicaltions);
module.exports = { ApplyToLeave };