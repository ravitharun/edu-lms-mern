import React, { useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import { MdSchedule } from 'react-icons/md'
import { Day, departments, Semester_year } from '../AdminExport'

function AddTimeTable() {
    const [Isopen, setopen] = useState(false)

    const handelTimetable = () => {
        setopen(true)
    }
    return (


        <>
            <div className="min-h-screen flex bg-gray-50">
                {/* Sidebar */}
                <MasterAdminNavbar path="Dashboard" />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">

                    {/* Top Navbar */}
                    <MasterLogoNav path="TimeTable" />

                    {/* Content */}
                    <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">

                        <div className="max-w-7xl mx-auto space-y-8">
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition" onClick={handelTimetable}>
                                <MdSchedule />
                                {Isopen ? "close" : "Add"} Timetable
                            </button>
                        </div>
                        {Isopen && (
                            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">

                                <div className="bg-white shadow-xl rounded-2xl p-6 w-80 border pointer-events-auto">

                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold">Add Timetable</h2>
                                        <button
                                            onClick={() => setopen(false)}
                                            className="text-gray-500 hover:text-red-500 text-lg"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-4">
                                        Create a new timetable entry
                                    </p>
                                    <div>

                                        <label htmlFor="">Departments</label>
                                        <select name="" id="">
                                            <option value="Chhose Dept" disabled selected>Select Dept</option>
                                            {departments.map((yr, idx) => (
                                                <option value={yr} key={idx}>{yr}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>

                                        <label htmlFor="">Semester_year</label>
                                        <select name="" id="">
                                            <option value="Chhose Dept" disabled selected>Select Semester_year</option>
                                            {Semester_year.map((yr, idx) => (
                                                <option value={yr} key={idx}>{yr}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>

                                        <label htmlFor="">Day</label>
                                        <select name="" id="">
                                            <option value="Chhose Dept" disabled selected>Select Day</option>
                                            {Day.map((day, idx) => (
                                                <option value={day} key={idx}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>

                                        <label htmlFor="">Start Time</label>
                                        <input type="datetime-local" />
                                    </div>
                                    <div>

                                        <label htmlFor="">End Time</label>
                                        <input type="datetime-local" />
                                    </div>
                                    <div>

                                <select name="" id="">

                                    <option value=""></option>
                                </select>
                                    </div>
                                    <div>

                                        <label htmlFor="">End Time</label>
                                        <input type="datetime-local" />
                                    </div>

                                    <br />
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                                        Add
                                    </button>

                                </div>

                            </div>
                        )}
                    </main>

                </div>
            </div>


        </>
    )
}

export default AddTimeTable