import React, { useEffect, useState } from 'react'
import App from '../../App'
import { FaBell, FaUser } from "react-icons/fa";
import { TfiExport } from "react-icons/tfi";
import AdminHeader from '../../Components/AdminHeader';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserName } from '../../Apis/Islogin';
function Addassignments() {
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation()
    const [classList, setClassList] = useState([])
    const [ClosePop, SetClose] = useState(false)
    const [StateClassID, LocationStateClassID] = useState(location.state)
    const [section, setsection] = useState(StateClassID ? StateClassID : "")
    console.log("section", section)

    useEffect(() => {
        const Fetch_Assignment = async () => {
            try {

                const reonse = await axios.get("http://localhost:5001/api/classlist/getsection", {
                    params: {
                        teacher_Id: UserName.teacher_Id
                    }
                })
                console.log(reonse.data.message)
                setClassList(reonse.data.message)

            } catch (error) {
                console.log(error.message, 'from the Fetching Teacher Pages Api Call.')
                toast.error(error.message)
            }
        }
        Fetch_Assignment()
    }, [])




    // Sample data for students
    const Assignments = [
        {
            id: 1,
            assignmentName: "React Basics Assignment",
            description: "Create components, use props and state, and build a simple UI.",
            dueDate: "2026-02-05",
            dueTime: "23:59",
            submissionStatus: "Open", // Open | Closed
            totalSubmissions: "42 / 60",
            marks: "20",
            pdfUrl: "/pdfs/react-basics-assignment.pdf",

        },
        {
            id: 2,
            assignmentName: "Data Structures – Arrays",
            description: "Solve array-based problems and submit solutions in PDF format.",
            dueDate: "2026-02-02",
            dueTime: "18:00",
            submissionStatus: "Closed",
            totalSubmissions: "58 / 60",
            marks: "15",
            pdfUrl: "/pdfs/dsa-arrays.pdf",

        },
        {
            id: 3,
            assignmentName: "Database Design (ER Model)",
            description: "Design an ER diagram for the given problem statement.",
            dueDate: "2026-02-08",
            dueTime: "20:00",
            submissionStatus: "Open",
            totalSubmissions: "31 / 60",
            marks: "25",
            pdfUrl: "/pdfs/database-er-model.pdf",

        },
        {
            id: 4,
            assignmentName: "Operating Systems – Processes",
            description: "Explain process scheduling algorithms with examples.",
            dueDate: "2026-02-01",
            dueTime: "17:00",
            submissionStatus: "Closed",
            totalSubmissions: "60 / 60",
            marks: "10",
            pdfUrl: "/pdfs/os-processes.pdf",

        }
    ];

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
            <div className="md:ml-64 p-6 min-h-screen bg-gray-100 space-y-6">
                {/* ================= HEADER ================= */}
                <AdminHeader pathname={"Add Assignments"}></AdminHeader>

                {/* ================= SECTION DROPDOWN ================= */}
                <div className="w-full max-w-sm bg-white rounded-xl shadow p-4">
                    <label
                        htmlFor="section"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Choose a Section <b className='text-red-500'>{section ? (section) : ''}</b>
                    </label>
                    <select
                        id="section"
                        onChange={(e) => setsection(e.target.value)}
                        // disabled={section}

                        className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition `}

                    >
                        <option value={StateClassID} selected disabled>
                            {StateClassID ? StateClassID :

                                '      --Select Section --'
                            }
                        </option>
                        {
                            classList.map((cls, idx) => (
                                <option
                                    key={idx}
                                    title='ClassSection-department-Year'
                                    value={` ${cls.classId} - ${cls.department} - ${cls.year}`}
                                    className={`text-gray-700   `}


                                >
                                    {cls.classId} - {cls.department} - {cls.year}
                                </option>

                            ))
                        }

                    </select>
                </div>
                {section && (
                    <button
                        onClick={() => SetClose(true)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-200"
                    >
                        {ClosePop ? 'Close' : 'Add Assignment'}
                    </button>
                )}





                {/* ================= ATTENDANCE TABLE ================= */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">

                    {/* Scroll Container */}
                    <div className="max-h-[70vh] overflow-x-auto overflow-y-auto">

                        <table className="min-w-[1200px] w-full text-sm border-collapse">

                            {/* Sticky Header */}
                            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                                <tr>
                                    <th className="p-3 text-left">S.No</th>
                                    <th className="p-3 text-left">Assignment Name</th>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-center">Due Date</th>
                                    <th className="p-3 text-center">Due Time</th>
                                    <th className="p-3 text-center">Marks</th>
                                    <th className="p-3 text-center">PDF</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Submissions</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Assignments.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 font-medium">{item.id}</td>

                                        <td className="p-3 font-semibold text-gray-800">
                                            {item.assignmentName}
                                        </td>

                                        <td className="p-3 text-gray-600 max-w-xs truncate">
                                            {item.description}
                                        </td>

                                        <td className="p-3 text-center">{item.dueDate}</td>

                                        <td className="p-3 text-center">{item.dueTime}</td>

                                        <td className="p-3 text-center font-medium">
                                            {item.marks}
                                        </td>

                                        {/* View PDF */}
                                        <td className="p-3 text-center">
                                            <a
                                                href={item.pdfUrl}
                                                className="text-blue-600 hover:underline font-medium"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View
                                            </a>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="p-3 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${item.submissionStatus === "Open"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.submissionStatus}
                                            </span>
                                        </td>

                                        {/* Submission Count */}
                                        <td className="p-3 text-center font-medium">
                                            {item.totalSubmissions}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="px-3 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600">
                                                    View
                                                </button>
                                                <button className="px-3 py-1 text-xs rounded-md bg-yellow-500 text-white hover:bg-yellow-600">
                                                    Edit
                                                </button>
                                                <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600">
                                                    Delete
                                                </button>
                                                <button className="px-3 py-1 text-xs rounded-md bg-purple-500 text-white hover:bg-purple-600">
                                                    Reminder
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>




            </div>


            {/* assignments Pop */}
            {ClosePop && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    {/* Popup container */}
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg animate-scaleIn">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">
                            Assignment Details
                        </h2>

                        {/* Content */}
                        <div className="mb-4 text-gray-700">{section}</div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => SetClose(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-200"
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}




        </>
    )
}

export default Addassignments