import React, { useState } from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'
import ProgressLoader from '../../Loaders/Progressloader'
import { FaCalendarAlt, FaPlus } from 'react-icons/fa'
import { UserName } from '../../Apis/Islogin'
import toast, { Toaster } from 'react-hot-toast'
import { ApplyLeaveRequest } from './TechersApiCall/LeaveApi'

function ApplyLeave() {
    const [handelpoup, sethandelPoup] = useState(false)
    let progress = false

    const TbHeadings = [
        "S. No",
        "Leave Type",
        "Reason",
        "Email",
        "From Date",
        "To Date",
        "Total Days",
        "Status",
        "Applied On",
        "Actions"
    ]

    const LeavesData = [
        {
            id: 1,
            leaveType: "Casual Leave",
            reason: "Family function",
            fromDate: "2026-02-05",
            toDate: "2026-02-06",
            email: "arjun@college.edu",
            totalDays: 2,
            status: "Pending",
            appliedOn: "2026-01-30",
        },
        {
            id: 2,
            leaveType: "Sick Leave",
            reason: "Fever and cold",
            fromDate: "2026-02-01",
            toDate: "2026-02-02",
            email: "arjun@college.edu",
            totalDays: 2,
            status: "Approved",
            appliedOn: "2026-01-28",
        }
    ]

    const [Fromdate, setFromdate] = useState("")
    const [Todate, setTodate] = useState("")
    const [TotalDays, setTotalDays] = useState("0")
    const [leaveType, setleavetype] = useState("")
    const [ReasonLeave, setLeaveReason] = useState("")
    const [EmpEmailId, setEmpEmailId] = useState("")

    const handelTodate = (date) => {
        if (!Fromdate) return alert("Fill From Date first")
        let from = new Date(Fromdate)
        let to = new Date(date)
        const oneDay = 24 * 60 * 60 * 1000
        setTotalDays(Math.round((to - from) / oneDay) + 1)
        setTodate(date)
    }

    const Handelclear = () => {
        setFromdate("")
        setTodate("")
        setTotalDays("0")
    }

    const HandelLeave = async () => {
        if (!Fromdate || !Todate || !leaveType || !ReasonLeave || !EmpEmailId) {
            console.log(ReasonLeave, 'ReasonLeave')
            return toast.error("Please fill the required filed's")
        }
        // make json data to send server
        const data = {
            ReasonLeave: ReasonLeave,
            EmpName: UserName.name,
            EmpID: UserName.teacher_Id,
            Fromdate: Fromdate,
            EmpEmailId: EmpEmailId,
            Todate: Todate,
            leaveType: leaveType,
            TotalDays: TotalDays

        }

        const response = await ApplyLeaveRequest(data)
        console.log(response.data.message == "leave application sent")
        if (response.data.message == "leave application sent") {
            return toast.success(" Leave Application Sent Successfully!", {
                style: {
                    border: "1px solid #4CAF50",
                    padding: "12px",
                    color: "#155724",
                    background: "#E6FFFA",
                    borderRadius: "8px",
                },
                iconTheme: {
                    primary: "#4CAF50",
                    secondary: "#fff",
                },
            });
        }
        toast.error("❌ Failed to Send Leave Application!", {
            style: {
                border: "1px solid #f44336",
                padding: "12px",
                color: "#721c24",
                background: "#fdecea",
                borderRadius: "8px",
            },
            iconTheme: {
                primary: "#f44336",
                secondary: "#fff",
            },
        });
    }

    return (
        <>
            <App />
            <Toaster />
            <div className="md:ml-64 p-4 md:p-6 min-h-screen bg-gray-100 space-y-6">
                <AdminHeader pathname="ApplyLeave" />

                {/* Apply Button */}
                <button
                    onClick={() => sethandelPoup(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    <FaPlus /> Apply Leave
                </button>

                {/* ================= MODAL ================= */}
                {handelpoup && (

                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white w-full max-w-2xl mx-3 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">

                                {/* Header */}
                                <div className="flex justify-between items-center px-6 py-4 border-b">
                                    <h2 className="font-semibold text-lg flex items-center gap-2">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <FaCalendarAlt className="text-blue-600 text-sm" />
                                        </div>
                                        Apply Leave
                                    </h2>      <button
                                        onClick={() => sethandelPoup(false)}
                                        className="text-gray-500 hover:text-black text-lg"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="px-6 py-6 space-y-5">

                                    {/* Row 1 */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave Type</label>
                                            <select
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => setleavetype(e.target.value)}
                                            >
                                                <option value="">Select Leave Type</option>
                                                {["Casual Leave", "Sick Leave", "Emergency Leave", "On Duty"].map((data, idx) => (
                                                    <option key={idx} value={data}>{data}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Email to Request</label>
                                            <input
                                                type="email"
                                                required
                                                onChange={(e) => setEmpEmailId(e.target.value)}
                                                placeholder="example@college.edu"
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave From Date</label>
                                            <input
                                                type="date"
                                                value={Fromdate}
                                                onChange={(e) => setFromdate(e.target.value)}
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave To Date</label>
                                            <input
                                                type="date"
                                                value={Todate}
                                                onChange={(e) => handelTodate(e.target.value)}
                                                disabled={!Fromdate}
                                                className="border rounded-lg px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3 */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Total Days</label>
                                            <input
                                                readOnly
                                                value={TotalDays}
                                                className="bg-gray-100 border rounded-lg px-3 py-2"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave Reason</label>
                                            <textarea
                                                rows="1"
                                                onChange={(e) => setLeaveReason(e.target.value)}
                                                placeholder="Reason"
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                </div>

                                {/* Footer */}
                                <div className="flex justify-end gap-3 px-6 py-4 border-t">
                                    <button
                                        onClick={Handelclear}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                    >
                                        Clear
                                    </button>

                                    <button
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                        onClick={HandelLeave}
                                    >
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </div>



                    </>
                )}

                {/* ================= DESKTOP TABLE ================= */}
                {/* ================= RESPONSIVE TABLE ================= */}
                <div className="w-full overflow-x-auto bg-white rounded-lg">
                    <table className="min-w-[900px] w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                {TbHeadings.map((heading, idx) => (
                                    <th key={idx} className="p-3 text-left whitespace-nowrap">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {LeavesData.map((data) => (
                                <tr key={data.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{data.id}</td>
                                    <td className="p-3 whitespace-nowrap">{data.leaveType}</td>
                                    <td className="p-3 min-w-[200px]">{data.reason}</td>
                                    <td className="p-3 break-all min-w-[220px]">
                                        <a href={`mailto:${data.email}`} className="text-blue-600">
                                            {data.email}
                                        </a>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">{data.fromDate}</td>
                                    <td className="p-3 whitespace-nowrap">{data.toDate}</td>
                                    <td className="p-3">{data.totalDays}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white text-xs ${data.status === "Approved"
                                                ? "bg-green-500"
                                                : data.status === "Rejected"
                                                    ? "bg-red-500"
                                                    : "bg-blue-500"
                                                }`}
                                        >
                                            {data.status}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">{data.appliedOn}</td>
                                    <td className="p-3">
                                        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {progress && <ProgressLoader />}
            </div>
        </>
    )
}

export default ApplyLeave
