import React from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'

function ProfilesStudenta() {
    return (
        <>
            <div className="min-h-screen flex bg-gray-50">

                {/* Sidebar */}
                <MasterAdminNavbar path="Students" />

                {/* Main Content */}
                < div className="flex-1 flex flex-col min-w-0 w-full">

                    {/* Top Navbar */}
                    <MasterLogoNav path="Students" />

                    {/* Content */}
                    <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">

                        <div className="max-w-7xl mx-auto space-y-4">

                            {/* Students Overview */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Students Overview
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Manage and view details of all students here.
                                </p>
                            </div>

                            {/* Faculty Overview */}
                            

                        </div>
                    </main>
                </div>
            </div>

        </>)
}

export default ProfilesStudenta