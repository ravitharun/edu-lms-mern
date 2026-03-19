import React, { useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import { MdSchedule } from 'react-icons/md'

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
                        {Isopen && <>


                            <div>
                                <button onClick={() => setopen(false)}>Close</button>

                            </div>
                        </>}
                    </main>

                </div>
            </div>


        </>
    )
}

export default AddTimeTable