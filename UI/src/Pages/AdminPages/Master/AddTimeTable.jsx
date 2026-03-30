import React, { useEffect, useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import { MdSchedule } from 'react-icons/md'
import { Day, departments, Semester_year } from '../AdminExport'
import { fetchAllSubjects } from './APIS/GetAll-subjects'
import toast, { Toaster } from 'react-hot-toast'
import DisplyTimetabel from './DisplyTimetabel'
import { AddTimetable, FetchTimeTableByYear } from './APIS/HandelTimeTable'
import { MaintanceMode, UserName } from '../../../Apis/Islogin'
import Undermanitance from '../../../Loaders/Undermanitance'

function AddTimeTable() {
    const [Isopen, setopen] = useState(false)
    const [GetSubjects, setsubjects] = useState([])
    const [Department, setdept] = useState("")
    const [SemesterByyear, setSemesterByyear] = useState("")
    // const [AddByDay, setDay] = useState("")
    const [StartTime, setStartTime] = useState("")
    const [AddSubject, SetSubject] = useState("")
    const [EndTime, setEndTime] = useState("")
    const [AssignedClass, setClassRoomNumber] = useState("")
    const [PropsStarttime, setpropsStartTime] = useState("")
    const [propsEndTime, setpropsEndTime] = useState("")
    const [GetTimeTableByYear, SetGetTimeTableByYear] = useState("SEM1-1YEAR")
    const [filterBysem, setfilterbysem] = useState([])
    console.log(filterBysem)
    useEffect(() => {
        const getSubjects = async () => {
            const rsdata = await fetchAllSubjects();
            console.log(rsdata.data.message, 'rsdata')
            setsubjects(rsdata.data.message, 'rsdata')

        }
        getSubjects()
    }, [])


    // Get Data By the GetTimeTableByYear
    useEffect(() => {
        const HandelGetTimeTableByYear = async () => {
            try {
                console.log("HandelGetTimeTableByYear", GetTimeTableByYear)
                const responseGetTimeTableByYear = await FetchTimeTableByYear(GetTimeTableByYear)
                if (responseGetTimeTableByYear.data.message == `No data.`) {

                    toast.error(`No Time Table Found For these ${GetTimeTableByYear} `)
                    return setfilterbysem([])

                }
                setfilterbysem(responseGetTimeTableByYear.data.message)
            } catch (error) {

            }
        }
        HandelGetTimeTableByYear()
    }, [GetTimeTableByYear])

    const handelTimetable = (start, end) => {
        setpropsStartTime(start)
        setpropsEndTime(end)
        console.log({ start, end }, "Ture Data")
        setopen(true)
    }


    const SubmitTimetable = async (e) => {
        e.preventDefault()
        if (!Department || !SemesterByyear || !StartTime || !EndTime || !AddSubject || !StartTime || !EndTime || !AssignedClass) {
            return toast.error("Fill the required Inputs")

        }
        const TTData = {
            Department, AssignedClass, SemesterByyear, AddSubject, StartTime, EndTime, AddedByID: UserName?.Admin_Id
        }
        try {
            const response = await AddTimetable(TTData, e)
            console.log(response?.data?.message)
            if (response?.data?.message == "Data Saved") {
                toast.success("Time Table Added")

                return setopen(false)
            }
            return response
        } catch (error) {
            console.log(error)

        }
    }

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
                        <div className="flex flex-col gap-2 max-w-xs">

                            <label className="text-sm font-medium text-gray-600">
                                Semester / Year
                            </label>

                            <select
                                onChange={(e) => SetGetTimeTableByYear(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {Semester_year.map((yr, idx) => {
                                    const value = yr.toUpperCase().replace("YR", "YEAR");
                                    return (
                                        <option value={value} key={idx}>
                                            {value}
                                        </option>
                                    );
                                })}
                            </select>

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
                                    <form>

                                        <div className="space-y-4 text-sm">

                                            {/* Department */}
                                            <div>
                                                <label className="block mb-1 text-gray-600">Department</label>
                                                <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setdept(e.target.value)}

                                                    required
                                                >

                                                    <option disabled selected>Select Dept</option>
                                                    {departments.map((yr, idx) => (
                                                        <option key={idx}>{yr}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Semester */}
                                            <div>
                                                <label className="block mb-1 text-gray-600">Semester / Year</label>
                                                <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"

                                                    onClick={(e) => setSemesterByyear(e.target.value)}
                                                    required
                                                >
                                                    <option disabled selected>Select Semester</option>
                                                    {Semester_year.map((yr, idx) => (
                                                        <option key={idx}>{yr.toUpperCase().replace("YR", "YEAR")}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Day */}
                                            {/* <div>
                                            <label className="block mb-1 text-gray-600">Day</label>
                                            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option disabled selected>Select Day</option>
                                                {Day.map((day, idx) => (
                                                    <option key={idx}>{day}</option>
                                                ))}
                                            </select>
                                        </div> */}

                                            {/* Time Row */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block mb-1 text-gray-600">Class Room Number *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        // value={new Date(PropsStarttime)?.slice(17).toString()}
                                                        onChange={(e) => setClassRoomNumber(e.target.value)}
                                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-gray-600">Start Time</label>
                                                    <input
                                                        type="datetime-local"
                                                        required
                                                        // value={new Date(PropsStarttime)?.slice(17).toString()}
                                                        onChange={(e) => setStartTime(e.target.value)}
                                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block mb-1 text-gray-600">End Time</label>
                                                    <input
                                                        type="datetime-local"
                                                        required
                                                        onChange={(e) => setEndTime(e.target.value)}
                                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            {/* Subject */}
                                            <div>
                                                <label className="block mb-1 text-gray-600">Subject</label>
                                                <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                                    onClick={(e) => SetSubject(e.target.value)}
                                                    required
                                                >
                                                    <option disabled selected>Select Subject</option>
                                                    {GetSubjects?.map((subj, idx) => (
                                                        <option value={subj.subject} key={idx}>{subj.subject}-{subj.department}-{subj.courseId}-({subj?.year})</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                        <button
                                            onClick={SubmitTimetable}
                                            disabled={!Department || !SemesterByyear || !StartTime || !EndTime || !AddSubject}
                                            className={`
    mt-5 w-full flex items-center justify-center gap-2
    py-3 rounded-xl font-semibold tracking-wide
    transition-all duration-300 shadow-md

    ${!Department || !SemesterByyear || !StartTime || !EndTime || !AddSubject
                                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02] hover:shadow-lg active:scale-95"}
  `}
                                        >
                                            📅 Create Timetable
                                        </button>
                                    </form>


                                    {/* Button */}


                                </div>
                            </div>
                        )}
                        <div className='mt-10'>

                            <DisplyTimetabel Addfunction={handelTimetable} isclose={Isopen} events={filterBysem} handelYear={GetTimeTableByYear}></DisplyTimetabel>
                        </div>
                        
                    </main>

                </div>
            </div>


        </>
    )
}

export default AddTimeTable