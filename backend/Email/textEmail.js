const { transporter } = require("../config/email");

const leaveAddEmail = async (ApplyLeave) => {
    console.log(ApplyLeave, "ApplyLeave to send the email")
    const info = await transporter.sendMail({
        from: ` ${ApplyLeave.EmpEmail}`,
        to: `${ApplyLeave.Emp_req_EmailId}`,
        subject: "Leave Application Request",
        text: `
Dear Sir/Madam,

I would like to formally request leave from ${ApplyLeave.Fromdate} to ${ApplyLeave.Todate}.

Reason for Leave:
${ApplyLeave.ReasonLeave}

Kindly consider my request and grant approval.

Thank you for your understanding.

Regards,
${ApplyLeave.name}
${ApplyLeave.role}
    `,
        html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
        <h2 style="color: #1976d2;">Leave Application Request</h2>

        <p>Dear Sir/Madam,</p>

        <p>
            I would like to formally request leave for the following period:
        </p>

        <table style="border-collapse: collapse; margin-top: 10px;">
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><b>From</b></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${ApplyLeave.Fromdate}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><b>To</b></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${ApplyLeave.Todate}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><b>Reason</b></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${ApplyLeave.ReasonLeave}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><b>leaveType</b></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${ApplyLeave.leaveType}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><b>Total Leaves</b></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${ApplyLeave.TotalDays}</td>
            </tr>
       <tr>
  <td style="padding: 12px; border: 1px solid #ddd;"><b>Action</b></td>
  <td style="padding: 12px; border: 1px solid #ddd; text-align:center;">

    <!-- ✅ Accept Button -->
    <a href='https://edu-lms-mern-1.onrender.com/api/LeaveStatusResponse/leaveStatus?st=approve'>
       style="
        background-color:#28a745;
        color:white;
        padding:10px 18px;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;
        display:inline-block;
        margin-right:8px;
       ">
       ✔ Accept
    </a>

    <!-- ❌ Reject Button -->
<a href='https://edu-lms-mern-1.onrender.com/api/LeaveStatusResponse/leaveStatus?st=Reject'>
       style="
        background-color:#dc3545;
        color:white;
        padding:10px 18px;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;
        display:inline-block;
       ">
       ✖ Reject
    </a>

  </td>
</tr>
        </table>

        <p style="margin-top: 15px;">
            I kindly request you to approve my leave for the above-mentioned period.
        </p>

        <p>
            Thank you for your consideration.
        </p>

        <p>
            Regards,<br/>
            <b>${ApplyLeave.name}</b><br/>
            ${ApplyLeave.role}
        </p>
    </div>
    `
    });
    return "Email Sent."
}
const Acceptleave = async (response_email) => {
    console.log(response_email, "ApplyLeave to send the email")
    const info = await transporter.sendMail({
        from: response_email.EmpReq_EmailId,
        to: response_email.to_email,
        subject: `Leave Application ${response_email.LeaveStatus}`,
        text: `
Dear ${response_email.name},

Your leave application has been ${response_email.LeaveStatus}.

Employee ID: ${response_email.EmpID}
Leave Type: ${response_email.leaveType}
From: ${response_email.Fromdate}
To: ${response_email.Todate}
Total Days: ${response_email.TotalDays}
Last Updated: ${response_email.updatedAt_leave}

For further details, please contact the administration.

Regards,
Admin Team
    `,
        html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f8;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">

            <h2 style="color: ${response_email.LeaveStatus === "Approved" ? "#28a745" : response_email.LeaveStatus === "Rejected" ? "#dc3545" : "#f0ad4e"};">
                Leave Application ${response_email.LeaveStatus}
            </h2>

            <p>Dear <b>${response_email.name}</b>,</p>

            <p>
                Your leave request has been 
                <b style="color:${response_email.LeaveStatus === "Approved" ? "#28a745" : response_email.LeaveStatus === "Rejected" ? "#dc3545" : "#f0ad4e"};">
                ${response_email.LeaveStatus}
                </b>.
            </p>

            <table style="width:100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;"><b>Employee ID</b></td>
                    <td style="padding:10px; border:1px solid #ddd;">${response_email.EmpID}</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;"><b>Leave Type</b></td>
                    <td style="padding:10px; border:1px solid #ddd;">${response_email.leaveType}</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;"><b>From</b></td>
                    <td style="padding:10px; border:1px solid #ddd;">${response_email.Fromdate}</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;"><b>To</b></td>
                    <td style="padding:10px; border:1px solid #ddd;">${response_email.Todate}</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;"><b>Total Days</b></td>
                    <td style="padding:10px; border:1px solid #ddd;">${response_email.TotalDays}</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;"><b>Updated On</b></td>
                    <td style="padding:10px; border:1px solid #ddd;">${response_email.updatedAt_leave}</td>
                </tr>
            </table>

            <p style="margin-top: 20px;">
                If you have any questions, please contact the administration office.
            </p>

            <p style="margin-top: 20px;">
                Regards,<br/>
                <b>Administration Team</b>
            </p>
        </div>
    </div>
    `
    });
    return "Email Sent."
}
module.exports = { leaveAddEmail, Acceptleave }