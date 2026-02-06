import React, { useEffect } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { fun } from '../../../Components/UserisLogin';

function Reports() {
    const data = [
        { name: "CSE", students: 120 },
        { name: "ECE", students: 90 },
        { name: "MECH", students: 60 },
    ];
    const page='Reports'
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
                        <BarChart width={300} height={250} data={data} fill="#4f46e5">
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="students" />
                        </BarChart>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Reports