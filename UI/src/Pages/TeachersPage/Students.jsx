import React from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'
import AddingSoon from '../../Loaders/AddingSoon'
import StudentProfile from './StudentsProfile'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// import { GetstudentsProfile } from './TechersApiCall/FetchApicall'
import { useState } from 'react'
import axios from 'axios'
import { MaintanceMode, UserName } from '../../Apis/Islogin'
import Tomany from '../../Loaders/Tomany'
import Undermanitance from '../../Loaders/Undermanitance'


function Students() {
    const [requesttimeout, setrequestTimeout] = useState(false)
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
    const [StudentsData, setStudentsData] = useState([])
    const navigate = useNavigate("")


    const handelData = (data) => {
        navigate("/StudentsProfile", { state: data })
    }

    useEffect(() => {
        const response = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/classlist/getstudents", {
                    params: {
                        id: UserName.teacher_Id
                    },
                    // Header_Token_expry
                })
                console.log(response, 'response')

                setStudentsData(response.data.getstudents, 'response')
                return response
            } catch (error) {
                if (error.status == 429) {
                    return setrequestTimeout(true)
                }
                setrequestTimeout(false)
                console.log(error)

            }
        }
        response()
    }, [])

    return (
        <>
            {requesttimeout && <Tomany />}
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
                                {StudentsData.map((data, idx) => (

                                    <tr className="border-b hover:bg-gray-50" key={idx} onClick={() => handelData
                                        (data)}>

                                        <td className="p-3">{data.Student_ID}</td>

                                        <td className="p-3 font-medium">
                                            {data.name}
                                        </td>

                                        <td className="p-3 text-center">
                                            {data.percentage || "In progress"}
                                        </td>

                                        <td className="p-3 text-center">
                                            {data.attended || 0} / {data.total || 0}
                                        </td>

                                        <td className="p-3 text-center">
                                            {data.marks || "0"}
                                        </td>

                                        <td className="p-3 text-center">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${data.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {data.status || 'In progress'}
                                            </span>
                                        </td>

                                        <td className="p-3 text-center">
                                            <button
                                                className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
                                                onClick={() => handelData
                                                    (data)}
                                            >
                                                View
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>


            </div>

        </>
    )
}

export default Students