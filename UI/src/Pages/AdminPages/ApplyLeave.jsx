import React, { useState } from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'
import ProgressLoader from '../../Loaders/Progressloader'
import { FaPlus } from 'react-icons/fa'

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

    return (
        <>
            <App />
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white w-full max-w-lg mx-3 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center px-6 py-4 border-b">
                                <h2 className="font-semibold">Apply Leave</h2>
                                <button onClick={() => sethandelPoup(false)}>✕</button>
                            </div>

                            <div className="px-6 py-4 space-y-4">
                                <select className="w-full border rounded-lg px-3 py-2">
                                    <option>Select Leave Type</option>
                                    <option>Casual Leave</option>
                                    <option>Sick Leave</option>
                                    <option>Emergency Leave</option>
                                    <option>On Duty</option>
                                </select>

                                <textarea
                                    rows="3"
                                    placeholder="Reason"
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                <input
                                    type="email"
                                    placeholder="example@college.edu"
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="date"
                                        value={Fromdate}
                                        onChange={(e) => setFromdate(e.target.value)}
                                        className="border rounded-lg px-3 py-2"
                                    />
                                    <input
                                        type="date"
                                        value={Todate}
                                        onChange={(e) => handelTodate(e.target.value)}
                                        disabled={!Fromdate}
                                        className="border rounded-lg px-3 py-2"
                                    />
                                </div>

                                <input
                                    readOnly
                                    value={TotalDays}
                                    className="w-full bg-gray-100 border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="flex justify-end gap-3 px-6 py-4 border-t">
                                <button onClick={Handelclear} className="px-4 py-2 bg-gray-200 rounded">
                                    Clear
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
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
                            className={`px-2 py-1 rounded-full text-white text-xs ${
                                data.status === "Approved"
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
