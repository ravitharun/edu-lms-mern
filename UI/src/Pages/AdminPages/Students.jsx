import React from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'
import AddingSoon from '../../Loaders/AddingSoon'
import StudentProfile from './StudentsProfile'

function Students() {
    const Class = [
        {
            className: "B.tech",
            Dept: "CSE",
            section: "a"
        },
        {
            className: "B.tech", Dept: "CSE",
            section: "b"
        },
        {
            className: "B.tech", Dept: "CSE",
            section: "b"
        }
    ]
    return (
        <>
            <App></App>
            <div className="md:ml-64 p-6 space-y-6 min-h-screen bg-gray-100">
                {/* ================= HEADER ================= */}
                <div className=''>
                    <AdminHeader pathname={"Students"}></AdminHeader>
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3 mt-3">
                </h1>
                <div className="p-6 bg-gray-100 min-h-screen">

                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Students List
                    </h1>       <div className="w-full max-w-sm bg-white rounded-xl shadow p-4">
                        <label
                            htmlFor="section"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Choose a Section
                        </label>
                        <select
                            id="section"
                            onChange={(e) => console.log(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition"
                        >
                            <option value="" disabled selected>
                                -- Select Section --
                            </option>
                      
                            {Class.map((cls, idx) => (
                                <option
                                    key={idx}
                                    value={`${cls.className}-${cls.Dept}-${cls.section}`}
                                    className="text-gray-700"
                                >
                                    {cls.className} - {cls.Dept} - {cls.section}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />

                    <div className="bg-white rounded-lg shadow overflow-x-auto">

                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-3 text-left">Roll No</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-center">Attendance</th>
                                    <th className="p-3 text-center">Assignments</th>
                                    <th className="p-3 text-center">Avg Marks</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-3">21CS001</td>
                                    <td className="p-3 font-medium">Arjun Kumar</td>
                                    <td className="p-3 text-center">92%</td>
                                    <td className="p-3 text-center">7 / 8</td>
                                    <td className="p-3 text-center">85</td>
                                    <td className="p-3 text-center">
                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                            Active
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded">
                                            View
                                        </button>
                                    </td>
                                </tr>

                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-3">21CS002</td>
                                    <td className="p-3 font-medium">Sneha Reddy</td>
                                    <td className="p-3 text-center">68%</td>
                                    <td className="p-3 text-center">4 / 8</td>
                                    <td className="p-3 text-center">62</td>
                                    <td className="p-3 text-center">
                                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                                            At Risk
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded" >
                                            View
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>

                <StudentProfile></StudentProfile>
            </div>

        </>
    )
}

export default Students