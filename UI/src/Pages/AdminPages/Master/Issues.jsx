import React from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'

function Issues() {

    const page = 'Issues'

    const issues = [
        {
            id: 1,
            name: "Ravi Kumar",
            email: "ravi@gmail.com",
            type: "Account Deactivation",
            priority: "High",
            status: "Pending",
            date: "20 Feb 2026"
        },
        {
            id: 2,
            name: "Anitha Sharma",
            email: "anitha@gmail.com",
            type: "Course Upload Issue",
            priority: "Medium",
            status: "In Progress",
            date: "21 Feb 2026"
        },
        {
            id: 3,
            name: "Suresh Reddy",
            email: "suresh@gmail.com",
            type: "Login Problem",
            priority: "Low",
            status: "Resolved",
            date: "22 Feb 2026"
        }
    ]

    return (
        <div className="min-h-screen flex bg-gray-50">
            <MasterAdminNavbar path={page} />

            <div className="flex-1 flex flex-col min-w-0">
                <MasterLogoNav path={page} />

                <main className="flex-1 mt-[72px] px-4 md:px-6 lg:px-8 pb-10 overflow-y-auto">

                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Issues
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage and resolve issues reported by teachers to maintain smooth platform operations.
                            </p>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl shadow-sm p-5 border">
                                <h3 className="text-sm text-gray-500">Total Issues</h3>
                                <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-5 border">
                                <h3 className="text-sm text-gray-500">Pending</h3>
                                <p className="text-2xl font-bold text-yellow-500 mt-1">5</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-5 border">
                                <h3 className="text-sm text-gray-500">Resolved</h3>
                                <p className="text-2xl font-bold text-green-500 mt-1">7</p>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Recent Issues
                            </h2>

                            <select className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Issues</option>
                                <option>Account Deactivation</option>
                                <option>Login Problem</option>
                                <option>Technical Bug</option>
                            </select>
                        </div>

                        {/* Issues List */}
                        <div className="space-y-4">
                            {issues.map((issue) => (
                                <div
                                    key={issue.id}
                                    className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                        {/* Left Section */}
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {issue.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {issue.email}
                                            </p>
                                            <p className="text-sm mt-2 text-gray-600">
                                                {issue.type}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Submitted on {issue.date}
                                            </p>
                                        </div>

                                        {/* Right Section */}
                                        <div className="flex flex-wrap gap-3 items-center">

                                            {/* Priority Badge */}
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full
                                                ${issue.priority === "High" ? "bg-red-100 text-red-600" :
                                                    issue.priority === "Medium" ? "bg-yellow-100 text-yellow-600" :
                                                        "bg-green-100 text-green-600"}`}>
                                                {issue.priority} Priority
                                            </span>

                                            {/* Status Badge */}
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full
                                                ${issue.status === "Pending" ? "bg-yellow-100 text-yellow-600" :
                                                    issue.status === "In Progress" ? "bg-blue-100 text-blue-600" :
                                                        "bg-green-100 text-green-600"}`}>
                                                {issue.status}
                                            </span>

                                            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
                                                View
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Issues   