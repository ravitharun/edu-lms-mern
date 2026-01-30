import React, { useState } from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'

import ProgressLoader from '../../Loaders/Progressloader'
import { FaPlus } from 'react-icons/fa'

function ApplyLeave() {
    const [handelpoup, sethandelPoup] = useState(false)
    let progress = true
    const TbHeadings = [
        "S. No",             // Serial number
        "Leave Type",        // Casual, Sick, etc.
        "Reason",            // Teacher’s reason for leave
        "From Date",         // Leave start
        "To Date",           // Leave end
        "Total Days",        // Auto-calculated
        "Status",            // Pending / Approved / Rejected
        "Applied On",        // Date of application
        "Actions"            // View / Approve / Reject buttons
    ];
    const fakeData = [{}]
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

                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            {TbHeadings.map((heading, idx) => (
                                <th key={idx} className="p-3 text-left">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </thead>
                }
            </div>
        </>
    )
}

export default ApplyLeave