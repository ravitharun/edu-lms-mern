import React, { useEffect, useState } from 'react'
import App from '../../App'
import { FaBell, FaUser } from "react-icons/fa";
import { TfiExport } from "react-icons/tfi";
import AdminHeader from '../../Components/AdminHeader';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { handleLogout, Header_Token_expry_Formdata, MaintanceMode, url, UserLogin, UserName, UserProfileInfo } from '../../Apis/Islogin';
import Tablecomponets from '../../Components/Tablecomponets';
import Tomany from '../../Loaders/Tomany';
import Undermanitance from '../../Loaders/Undermanitance';
import StudentAssignmentsSubmissions from './StudentAssignmentsSubmissions';
import { toast, Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

function Addassignments() {
    // const naviagte = useNavigate()
    const [ChooseNavbar, setDefaultNavbar] = useState("Assignments Uploaded");
    const location = useLocation()
    const [classList, setClassList] = useState([])
    const [Uploadsection, setUploadsection] = useState('')
    const [ClosePop, SetClose] = useState(false)
    const [StateClassID, LocationStateClassID] = useState(location.state)
    const [section, setsection] = useState(StateClassID ? StateClassID : "")
    const [requestTimeout, setrequestTimeout] = useState(false)
    const [Mark, setMark] = useState(0)
    const [AssignmentName, setAssignmentName] = useState("")
    const [Assignmentfile, setAssignmentfile] = useState(null)
    const [Duedate, setDuedate] = useState(null)
    const [resources, setresources] = useState([])
    const [isuploading, setisuploading] = useState(false)

    console.log(classList, 'classList')
    console.log(Uploadsection, 'Uploadsection')

    // fect the classId
    useEffect(() => {
        const Fetch_Assignment = async () => {
            try {

                const reonse = await axios.get("http://localhost:5001/api/classlist/getsection", {
                    params: {
                        teacher_Id: UserName.teacher_Id
                    }
                })


                setClassList(reonse.data.message)

            } catch (error) {
                if (error.status == 429) {

                    return setrequestTimeout(true)
                }
                setrequestTimeout(false)
                console.error(error.status, 'from the Fetching Teacher Pages Api Call.')
                // toast.error(error.message)
            }
        }
        Fetch_Assignment()
    }, [])


    // fetch Resources



    useEffect(() => {
        const Fetch_Assignment = async () => {
            try {
                console.log(section, 'section')

                const response = await axios.get(`${url}/api/UploadAssignments/Assignment/`, { params: { section: section.trim() } })

                console.log(response.data.data, 'response.data.message')
                setresources(response.data.data)

            } catch (error) {

                if (error.response.status == 401) {
                    toast.error("Token Expry")
                    setTimeout(() => {
                        return handleLogout()
                    }, 1300);
                }
                if (error.status == 429) {

                    return setrequestTimeout(true)
                }
                setrequestTimeout(false)
                console.error(error.status, 'from the Fetching Teacher Pages Api Call.')
                // toast.error(error.message)
            }
        }
        Fetch_Assignment()
    }, [section])




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



    const handlefileAssigmentUpload = (file) => {

        const validate_file = file

        if (!validate_file) {



            return toast.info("File is required.to Upload")
        }

        const acceptfile = ["application/pdf", "application/word", "application/docx"]
        console.log(acceptfile)
        if (!acceptfile.includes(validate_file.type)) {
            return toast.error(`File allowed only These Format : ${acceptfile}`)
        }


        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
        if (validate_file.size > MAX_FILE_SIZE) {


            return toast.error('Only 5mb file can upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        toast.success("File Uploaded")

        setAssignmentfile(file)
    }




    // submit the file
    const submitFile = async (e) => {
        e.preventDefault();


        if (!Uploadsection || !Assignmentfile || !AssignmentName || !Mark || !Duedate || !UserProfileInfo?.teacher_Id || !Uploadsection) {
            return toast.error("Some fields are required.");
        }

        const formData = new FormData();

        formData.append("Assignmentfile", Assignmentfile);
        formData.append("AddedBy", UserProfileInfo?._id);
        formData.append("Mark", Mark);
        formData.append("Duedate", Duedate);
        formData.append("AssignmentName", AssignmentName);
        formData.append("SUbjectsId", Uploadsection.split(" ")[6]);
        formData.append("section", Uploadsection);

        try {
            setisuploading(true);

            const response = await axios.post(
                `${url}/api/UploadAssignments/Assignments`,
                formData,
                {
                    headers:
                        { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${UserLogin}`, }

                }
            );

            console.log(response.status);

            if (response.status === 201) {
                toast.success(response.data.message)
                setDuedate(null)
                setAssignmentName(null)
                setMark(null)
                setAssignmentfile(null)
                setMark(null)
                return SetClose(false);
            }
        } catch (error) {
            console.log(error);

            const err_status = error?.response?.status;
            const err_message =
                error?.response?.data?.message || "Something went wrong.";

            if (err_status === 500) {
                toast.error(err_message);
            } else {
                toast.error(err_message);
            }
        } finally {
            setisuploading(false);
        }
    };
    const [SubmissionsData, setSubmissionsData] = useState(0)

    const handelSubmissions = (data, id) => {
        setSubmissionsData({ data, id })
        console.log({ data, id }, '{data,id}')
        setDefaultNavbar("Student Submissions")
    }


    return (
        <>
            <App></App>
            <ToastContainer></ToastContainer>
            {MaintanceMode ? <Undermanitance /> : ""}
            {requestTimeout && <Tomany />}
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
                        <option value={section} selected disabled>
                            {section ? section :

                                '      --Select Section --'
                            }
                        </option>
                        {
                            classList.map((cls, idx) => (
                                <option
                                    key={idx}
                                    title='ClassSection-department-Year'
                                    value={` ${cls.classId} - ${cls.department} - ${cls.year} - ${cls?.subjects?.[0]?.subjectId || "No Subject"}`}
                                    className={`text-gray-700 `}


                                >
                                    {cls.classId} - {cls.department} - {cls.year} - {cls?.subjects?.[0]?.subjectName || "No Subject"}
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
                                    <th className="p-3 text-left">S.No

                                    </th>
                                    <th className="p-3 text-left">Assignment Name</th>
                                    <th className="p-3 text-left">Section</th>
                                    <th className="p-3 text-center">Due Date</th>
                                    <th className="p-3 text-center">Due Time</th>
                                    <th className="p-3 text-center">Marks</th>
                                    <th className="p-3 text-center">PDF</th>
                                    {/* <th className="p-3 text-center">Status</th> */}
                                    <th className="p-3 text-center">Submissions</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {!resources || resources.length === 0 && <>
                                    <Tablecomponets col={10} text="There is no Assignment Found" />
                                </>
                                }

                                {resources?.map((item, id) => (
                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 font-medium">{id + 1}</td>

                                        <td className="p-3 font-semibold text-gray-800">
                                            {item.AssignementName || "assignmentName"}
                                        </td>

                                        <td className="p-3 text-gray-600 max-w-xs truncate">
                                            {item.Section || "Section"}
                                        </td>

                                        <td className="p-3 text-center">{new Date(item.DueDate).toDateString() || "dueDate"}</td>
                                        <td className="p-3 text-center">{item.dueTime || "dueTime"}</td>

                                        <td className="p-3 text-center font-medium">
                                            {item.Marks || 0}
                                        </td>

                                        <td className="p-3 text-center">
                                            <a
                                                href={`https://docs.google.com/gview?url=${encodeURIComponent(
                                                    item.Assignementurl
                                                )}&embedded=true`}
                                                target="_parent"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                View
                                            </a>
                                        </td>

                                        {/* <td className="p-3 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${item.submissionStatus === "Open"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.submissionStatus}
                                            </span>
                                        </td> */}

                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handelSubmissions(item, id)}
                                                className="inline-flex items-center justify-center rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                                            >
                                                View Submissions
                                            </button>
                                        </td>

                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <a


                                                    href={`https://docs.google.com/gview?url=${encodeURIComponent(item.Assignementurl)}&embedded=true`}
                                                    target="_blank"
                                                    className="px-3 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600">
                                                    View
                                                </a>
                                                {/* <button className="px-3 py-1 text-xs rounded-md bg-yellow-500 text-white hover:bg-yellow-600">
                                                    Edit
                                                </button> */}
                                                <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600">
                                                    Delete
                                                </button>
                                                {/* <button className="px-3 py-1 text-xs rounded-md bg-purple-500 text-white hover:bg-purple-600">
                                                    Reminder
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>


                {ChooseNavbar == "Student Submissions" && <StudentAssignmentsSubmissions Data={SubmissionsData} setDefaultNavbar={setDefaultNavbar} />}

            </div>

            {ClosePop && (
                <form >

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 p-4 sm:p-8">
                        {/* Popup container - zoomed out, responsive, scrollable */}
                        <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-scaleIn max-h-[90vh] overflow-y-auto transform scale-95 md:scale-100">

                            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
                                Assignment Details
                            </h2>

                            <div className="space-y-5">
                                {/* Section Dropdown */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Choose Section
                                        {section && (
                                            <span className="ml-2 text-blue-600 font-semibold">
                                                {section}
                                            </span>
                                        )}
                                    </label>

                                    <select
                                        id="section"
                                        onChange={(e) => setUploadsection(e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    >
                                        <option value={section} disabled selected>
                                            {section ? section : "-- Select Section --"}
                                        </option>
                                        {classList.map((cls, idx) => (
                                            <option
                                                key={idx}
                                                value={`${cls.classId} - ${cls.department} - ${cls.year} - ${cls?.subjects[0]?.subjectId} - ${cls?.subjects[0]?._id}`}
                                            >
                                                {cls.classId} - {cls.department} - {cls.year} - {cls?.subjects?.[0]?.subjectName || "No Subject"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Assignment Name */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Assignment Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter assignment name"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                        onChange={(e) => setAssignmentName(e.target.value)}
                                        value={AssignmentName}
                                    />
                                </div>

                                {/* Marks */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Marks
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter marks"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                        min="0"
                                        onChange={(e) => setMark(e.target.value)}
                                        value={Mark}


                                        max="100"
                                    />
                                </div>

                                {/* Due Date */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                        onChange={(e) => setDuedate(e.target.value)}
                                        value={Duedate}
                                    />
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Upload File
                                    </label>

                                    <label className="flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-10 h-10 text-blue-500 mb-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
                                            />
                                        </svg>

                                        <p className="text-sm font-medium text-gray-700">
                                            Click to upload or drag & drop
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            PDF, DOC, DOCX (Max 5MB)
                                        </p>

                                        <input
                                            type="file"
                                            required
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => handlefileAssigmentUpload(e.target.files?.[0])}

                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                                <button
                                    onClick={() => SetClose(false)}
                                    className="px-5 py-2.5 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium flex-1 sm:flex-none"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    disabled={isuploading}
                                    onClick={submitFile}
                                    className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white shadow-md transition-all duration-300
    ${isuploading
                                            ? "bg-blue-500 cursor-not-allowed opacity-80"
                                            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                                        }`}
                                >
                                    {isuploading && (
                                        <svg
                                            className="w-4 h-4 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    )}

                                    {isuploading ? "Uploading..." : "Upload Assignment"}
                                </button>
                            </div>
                        </div>

                    </div>
                </form>

            )}






        </>
    )
}

export default Addassignments