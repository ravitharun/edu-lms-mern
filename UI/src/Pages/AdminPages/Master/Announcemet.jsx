import React, { useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import { Toaster } from 'react-hot-toast'
import { FiX, FiCalendar, FiUpload, FiTag, FiPlus } from "react-icons/fi";
import GetAnnouncement from '../GetAnnouncement';
function Annoncement() {
    const page = "Annoncement"
    const [openPoup, setopenPoup] = useState(false)
    const Roles = ["Students", "Teacher", "Both"]
    return (
        <div className="min-h-screen flex bg-gray-50">
            <MasterAdminNavbar path={page} />
            <Toaster />

            <div className="flex-1 flex flex-col min-w-0">
                <MasterLogoNav path={page} />

                <main className="flex-1 mt-[72px] px-4 md:px-6 lg:px-8 pb-10 overflow-y-auto">

                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Announcements
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Create and manage important announcements for students and instructors to keep everyone informed about updates and academic activities.
                            </p>
                        </div>

                        <button
                            onClick={() => setopenPoup(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                        >
                            <FiPlus size={18} />
                            Add Announcement
                        </button>
                        {openPoup && (
                            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-50 p-4">

                                {/* Modal */}
                                <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

                                    {/* Header */}
                                    <div className="flex justify-between items-center border-b px-5 py-3">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            Create Announcement
                                        </h2>

                                        <button
                                            onClick={() => setopenPoup(false)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            <FiX size={20} />
                                        </button>
                                    </div>

                                    {/* Scrollable Form */}
                                    <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">

                                        {/* Title */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Title</label>
                                            <div className="flex items-center border rounded-lg mt-1 px-3">
                                                <FiTag className="text-gray-400 mr-2" />
                                                <input
                                                    type="text"
                                                    placeholder="Enter announcement title"
                                                    className="w-full py-2 outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Announcement Type
                                            </label>
                                            <select className="w-full border rounded-lg mt-1 px-3 py-2 outline-none">
                                                <option disabled selected>Select announcement type</option>
                                                <option value="exam">Exam</option>
                                                <option value="result">Exam Result</option>
                                                <option value="holiday">Holiday</option>
                                                <option value="event">College Event</option>
                                                <option value="festival">Festival</option>
                                                <option value="assignment">Assignment</option>
                                                <option value="general">General Notice</option>
                                            </select>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Start Date
                                                </label>
                                                <div className="flex items-center border rounded-lg mt-1 px-3">
                                                    <FiCalendar className="text-gray-400 mr-2" />
                                                    <input
                                                        type="datetime-local"
                                                        className="w-full py-2 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    End Date
                                                </label>
                                                <div className="flex items-center border rounded-lg mt-1 px-3">
                                                    <FiCalendar className="text-gray-400 mr-2" />
                                                    <input
                                                        type="datetime-local"
                                                        className="w-full py-2 outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Banner */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Upload Banner
                                            </label>
                                            <div className="flex items-center border rounded-lg mt-1 px-3 py-2">
                                                <FiUpload className="text-gray-400 mr-2" />
                                                <input type="file" className="w-full text-sm" />
                                            </div>
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Target Audience
                                            </label>
                                            <select className="w-full border rounded-lg mt-1 px-3 py-2">
                                                <option disabled selected>
                                                    Choose Target Role
                                                </option>

                                                {Roles.map((roles, idx) => (
                                                    <option value={roles} key={idx}>
                                                        {roles}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-end gap-3 border-t px-5 py-3">
                                        <button
                                            onClick={() => setopenPoup(false)}
                                            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>

                                        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                            Publish
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                        <GetAnnouncement></GetAnnouncement>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Annoncement