import React, { useEffect, useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { fun } from '../../../Components/UserisLogin';
import { MdMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import ProgressLoader from '../../../Loaders/Progressloader';

function Reports() {



    const [close, setClose] = useState(false)
    const [selectReports, setReports] = useState("All")
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
                <main className="flex-1 pt-16 md:ml- pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="w-full bg-white shadow-sm">
                            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                                {/* Logo / Title */}
                                <h1 className="text-lg font-semibold text-gray-800">
                                    MyApp
                                </h1>

                                {/* Desktop Menu */}
                                <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
                                    <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => setReports("Students")}>
                                        Students
                                    </li>
                                    <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => setReports("Teachers")}>
                                        Teachers
                                    </li>
                                    <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => setReports("All")}>
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
                                <li className="py-2 border-b hover:text-blue-600" onClick={() => setReports("Students")}>Students</li>
                                <li className="py-2 border-b hover:text-blue-600" onClick={() => setReports("Teachers")}>Teachers</li>
                                {/* <li className="py-2 hover:text-blue-600">Title</li> */}
                                <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => setReports("All")}>
                                    All
                                </li>
                            </ul>}
                        </div>

                        <BarChart width={300} height={250} data={data} fill="#4f46e5" className='mt-10'>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="students" />
                        </BarChart>
                    </div>
                    <center>

                        {selectReports == "All" && <>

                            {selectReports} adding Soon ...
                            <ProgressLoader path={selectReports} />

                        </>}
                        {selectReports == "Students" && <>

                            <div>
                                {selectReports} adding Soon ...
                                <ProgressLoader path={selectReports} />

                            </div>
                        </>}
                        {selectReports == "Teachers" && <>


                            <div>
                                {selectReports} adding Soon ...
                                <ProgressLoader path={selectReports} />

                            </div>
                        </>}
                    </center>
                </main>
            </div>
        </div>
    )
}

export default Reports