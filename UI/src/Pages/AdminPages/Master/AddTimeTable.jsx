import React, { useEffect, useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import { MdSchedule } from 'react-icons/md'
import { Day, departments, Semester_year } from '../AdminExport'
import { fetchAllSubjects } from './APIS/GetAll-subjects'
import toast, { Toaster } from 'react-hot-toast'
import DisplyTimetabel from './DisplyTimetabel'

function AddTimeTable() {
    const [Isopen, setopen] = useState(false)
    const [GetSubjects, setsubjects] = useState([])
    const [Department, setdept] = useState("")
    const [SemesterByyear, setSemesterByyear] = useState("")
    const [AddByDay, setDay] = useState("")
    const [StartTime, setStartTime] = useState("")
    const [AddSubject, SetSubject] = useState("")
    const [EndTime, setEndTime] = useState("")
    const [PropsStarttime, setpropsStartTime] = useState("")
    const [propsEndTime, setpropsEndTime] = useState("")
    useEffect(() => {
        const getSubjects = async () => {
            const rsdata = await fetchAllSubjects();
            console.log(rsdata.data.message, 'rsdata')
            setsubjects(rsdata.data.message, 'rsdata')

        }
        getSubjects()
    }, [])

    const handelTimetable = (start, end) => {
        setpropsStartTime(start)
        setpropsEndTime(end)
        console.log({ start, end }, "Ture Data")
        setopen(true)
    }

    const SubmitTimetable = async () => {
        // const TTData={
        toast.success("hey");

        // }
        // console.log(TTData)
    }
    console.log({ PropsStarttime, propsEndTime })
    return (


        <>
            <Toaster></Toaster>
            <div className="min-h-screen flex bg-gray-50">
                {/* Sidebar */}
                <MasterAdminNavbar path="dashboard" />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">

                    {/* Top Navbar */}
                    <MasterLogoNav path="TimeTable" />

                    {/* Content */}
                    <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">

                        <div className="max-w-7xl mx-auto space-y-8">
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition" onClick={handelTimetable}>
                                <MdSchedule />
                                {Isopen ? "Close" : "Add"} Timetable
                            </button>
                        </div>

                        {Isopen && (
                            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 px-3">

                                <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl border pointer-events-auto 
                    p-5 sm:p-6 animate-[scaleIn_0.2s_ease]">

                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                                            Add Timetable
                                        </h2>
                                        <button
                                            onClick={() => setopen(false)}
                                            className="text-gray-400 hover:text-red-500 text-lg"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Form */}
                                    <div className="space-y-4 text-sm">

                                        {/* Department */}
                                        <div>
                                            <label className="block mb-1 text-gray-600">Department</label>
                                            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setdept}>
                                                <option disabled selected>Select Dept</option>
                                                {departments.map((yr, idx) => (
                                                    <option key={idx}>{yr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Semester */}
                                        <div>
                                            <label className="block mb-1 text-gray-600">Semester / Year</label>
                                            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option disabled selected>Select Semester</option>
                                                {Semester_year.map((yr, idx) => (
                                                    <option key={idx}>{yr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Day */}
                                        <div>
                                            <label className="block mb-1 text-gray-600">Day</label>
                                            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option disabled selected>Select Day</option>
                                                {Day.map((day, idx) => (
                                                    <option key={idx}>{day}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Time Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block mb-1 text-gray-600">Start Time</label>
                                                <input
                                                    type="datetime-local"
                                                    // value={new Date(PropsStarttime)?.slice(17).toString()}
                                                    onChange={(e) => setpropsStartTime(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1 text-gray-600">End Time</label>
                                                <input
                                                    type="datetime-local"
                                                    // value={new Date(propsEndTime)?.slice(17).toString()}
                                                    onChange={(e) => setpropsEndTime(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="block mb-1 text-gray-600">Subject</label>
                                            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option disabled selected>Select Subject</option>
                                                {GetSubjects.map((subj, idx) => (
                                                    <option value={subj.subject} key={idx}>{subj.subject}-{subj.department}-{subj.courseId}-({subj?.year})</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>

                                    {/* Button */}
                                    <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition font-medium" onClick={SubmitTimetable}>
                                        Add Timetable
                                    </button>

                                </div>
                            </div>
                        )}
                        <div className='mt-10'>

                            <DisplyTimetabel Addfunction={handelTimetable} isclose={Isopen}></DisplyTimetabel>
                        </div>
                    </main>

                </div>
            </div>


        </>
    )
}

export default AddTimeTable