import React, { useState } from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'

import ProgressLoader from '../../Loaders/Progressloader'
import { FaPlus } from 'react-icons/fa'

function ApplyLeave() {
    const [handelpoup, sethandelPoup] = useState(false)
    let progress = false
    const TbHeadings = [
        "S. No",             // Serial number
        "Leave Type",        // Casual, Sick, etc.
        "Reason",
        "Email",                // Teacher’s reason for leave
        "From Date",         // Leave start
        "To Date",           // Leave end
        "Total Days",        // Auto-calculated
        "Status",            // Pending / Approved / Rejected
        "Applied On",        // Date of application
        "Actions"            // View / Approve / Reject buttons
    ];
    const LeavesData = [
        {
            id: 1,
            leaveType: "Casual Leave",
            reason: "Family function",
            fromDate: "2026-02-05",
            toDate: "2026-02-06", email: "arjun@college.edu",
            totalDays: 2,
            status: "Pending",
            appliedOn: "2026-01-30",

        },
        {
            id: 2,
            leaveType: "Sick Leave",
            reason: "Fever and cold",
            fromDate: "2026-02-01",
            toDate: "2026-02-02", email: "arjun@college.edu",
            totalDays: 2,
            status: "Approved",
            appliedOn: "2026-01-28",

        },
        {
            id: 3,
            leaveType: "Emergency Leave",
            reason: "Urgent personal work",
            fromDate: "2026-01-31",
            toDate: "2026-01-31",
            totalDays: 1,
            status: "Rejected",
            appliedOn: "2026-01-29",

        },
        {
            id: 4,
            leaveType: "On Duty",
            reason: "Attend workshop",
            fromDate: "2026-02-03",
            toDate: "2026-02-04", email: "arjun@college.edu",
            totalDays: 2,
            status: "Approved",
            appliedOn: "2026-01-27",
        },
        {
            id: 5,
            leaveType: "Casual Leave",
            reason: "Personal work",
            fromDate: "2026-02-07", email: "arjun@college.edu",
            toDate: "2026-02-07",
            totalDays: 1,
            status: "Pending",
            appliedOn: "2026-01-30",

        }
    ];

    return (
        <>
            <App></App>
            <div className="md:ml-64 p-6 min-h-screen bg-gray-100 space-y-6">
                {/* ================= HEADER ================= */}
                {/* <AdminHeader></AdminHeader> */}
                <AdminHeader pathname="ApplyLeave"></AdminHeader>
                <button
                    onClick={() => sethandelPoup(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                    <FaPlus className="w-4 h-4" />
                    Apply Leave
                </button>
                {handelpoup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                        {/* Modal */}
                        <div className="bg-white w-full max-w-lg mx-4 rounded-xl shadow-lg">

                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-4 border-b">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Apply Leave
                                </h2>
                                <button
                                    onClick={() => sethandelPoup(false)}
                                    className="text-gray-500 hover:text-red-500 text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Form */}
                            <div className="px-6 py-4 space-y-4">

                                {/* Leave Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Leave Type <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="">Select Leave Type</option>
                                        {["Casual Leave", "Sick Leave", "Emergency Leave", "On Duty"].map(
                                            (lv, idx) => (
                                                <option key={idx} value={lv}>
                                                    {lv}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Reason */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Reason for Leave <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows="3"
                                        placeholder="Enter reason"
                                        className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="example@college.edu"
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            From Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            To Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Total Days */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Total Days
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value="10"
                                        className="w-full border bg-gray-100 rounded-lg px-3 py-2 text-sm cursor-not-allowed"
                                    />
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 px-6 py-4 border-t">
                                <button
                                    onClick={() => sethandelPoup(false)}
                                    className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                    Submit Leave
                                </button>
                            </div>

                        </div>
                    </div>
                )}
                {/* <AddingSoon pathname="ApplyLeave"></AddingSoon> */}
                {progress ? <ProgressLoader></ProgressLoader> :
                    <table className="w-full border-collapse">
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                {TbHeadings.map((heading, idx) => (
                                    <th key={idx} className="p-3 text-left">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {LeavesData.map((data, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-3">{data.id}</td>
                                    <td className="p-3">{data.leaveType}</td>
                                    <td className="p-3">{data.reason}</td>
                                    <td className="p-3"><a href={`mailto:${data.email}`}>

                                        {data.email}

                                    </a>

                                    </td>
                                    <td className="p-3">{data.fromDate}</td>
                                    <td className="p-3">{data.toDate}</td>
                                    <td className="p-3">{data.totalDays}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white text-xs ${data.status === "Approved"
                                                ? "bg-green-500"
                                                : data.status === "Rejected"
                                                    ? "bg-red-500"
                                                    : data.status === "Pending"
                                                        ? "bg-blue-500"
                                                        : ""
                                                }`}
                                        >
                                            {data.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{data.appliedOn}</td>
                                    <td className="p-3">
                                        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                }
            </div>
        </>
    )
}

export default ApplyLeave