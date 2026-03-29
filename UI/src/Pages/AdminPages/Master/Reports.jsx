import React, { useEffect, useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { fun } from '../../../Components/UserisLogin';
import { MdMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import ProgressLoader from '../../../Loaders/Progressloader';
import StudentsReports from './StudentsReports';
import TeachersReports from './TeachersReports';

function Reports() {



    const [close, setClose] = useState(false)
    let [selectReports, setReports] = useState("All")
    const data = [
        { name: "CSE", students: 120 },
        { name: "ECE", students: 90 },
        { name: "MECH", students: 60 },
    ];
    const page = 'Reports'
    useEffect(() => {
        fun()
    }, [])
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <MasterAdminNavbar path={page} />
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 w-full">
                {/* Navbar */}
                <MasterLogoNav path={page} />

                {/* Scrollable Content */}
                {/* <main className="flex-1 pt-16 md:ml- pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto"> */}
                <main className="flex-1 mt-[72px] pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="w-full bg-white shadow-sm">
                            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                                {/* Logo / Title */}
                                <h1 className="text-lg font-bold text-indigo-600">
                                    {selectReports == 'All' ? "" : selectReports} Analytics
                                </h1>
                                {/* Desktop Menu */}
                                <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
                                    <li className={`${selectReports == 'Students' ? 'text-blue-600 ' : 'text-black'} cursor-pointer transition`} onClick={() => setReports("Students")}>
                                        Students
                                    </li>
                                    <li className={`${selectReports == 'Teachers' ? 'text-blue-600 ' : 'text-black'} cursor-pointer transition`} onClick={() => setReports("Teachers")}>
                                        Teachers
                                    </li>
                                    <li className={`${selectReports == 'All' ? 'text-blue-600 ' : 'text-black'} cursor-pointer transition`} onClick={() => setReports("All")}>
                                        All
                                    </li>

                                </ul>

                                {/* Mobile Menu Button */}
                                <button className="md:hidden text-gray-700" onClick={() => setClose((prev) => !prev)}>
                                    {close ? <IoCloseOutline /> : <MdMenu />}
                                </button>
                            </nav>

                            {/* Mobile Menu */}
                            {close && <ul className="md:hidden px-4 pb-3 flex flex-col gap-3 text-gray-600 font-medium">
                                <li className={`${selectReports == 'Students' ? 'text-blue-600 ' : 'text-black'} cursor-pointer transition`} onClick={() => setReports("Students")}>Students</li>
                                <li className={`${selectReports == 'Teachers' ? 'text-blue-600 ' : 'text-black'} cursor-pointer transition`} onClick={() => setReports("Teachers")}>Teachers</li>
                                {/* <li className="py-2 hover:text-blue-600">Title</li> */}
                                <li className={`${selectReports == 'All' ? 'text-blue-600 ' : 'text-black'} cursor-pointer transition`} onClick={() => setReports("All")}>
                                    All
                                </li>
                            </ul>}
                        </div>
                    </div>


                    {selectReports == "All" && <>

                        {/* {selectReports} adding Soon ... */}
                        <div>      <h1 className="mt-10">Students Reports</h1>
                            <StudentsReports></StudentsReports></div>
                        <div>
                            <h1 className="mt-10">Techers Reports</h1>
                            <TeachersReports></TeachersReports>
                        </div>
                        <ProgressLoader path={selectReports} />

                    </>}
                    {selectReports == "Students" && <>

                        <div>
                            {/* {selectReports} adding Soon ... */}
                            <StudentsReports></StudentsReports>
                            <ProgressLoader path={selectReports} />

                        </div>
                    </>}
                    {selectReports == "Teachers" && <>


                        <div>
                            {selectReports} adding Soon ...
                            <TeachersReports></TeachersReports>
                            <ProgressLoader path={selectReports} />

                        </div>
                    </>}
                </main>
            </div>
        </div>

    )
}

export default Reports