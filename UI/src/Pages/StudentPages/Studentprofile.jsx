import React from 'react'
import BackButton from '../../Components/BackButton'
import App from '../../App'
import { UserName } from '../../Apis/Islogin'

function Studentprofile() {

    const inputStyle = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

    console.log(UserName, 'UserName')

    return (
        <>
            <App />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-10">

                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Hi, {UserName?.name} 👋
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage your profile information
                        </p>
                    </div>

                    <button className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm">
                        Save Changes
                    </button>
                </div>

                {/* Main Card */}
                <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-6 md:p-10">

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 mb-10 border-b pb-6">

                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img
                                    src={UserName?.profilePreview || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
                                />

                                <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    Edit
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {UserName?.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Student Profile
                                </p>
                            </div>
                        </div>

                        <input type="file" className="text-xs cursor-pointer" />
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <div className="space-y-4">
                            <h3 className="text-md font-semibold text-gray-700">
                                Personal Information
                            </h3>

                            <input type="text" placeholder="Full Name" className={inputStyle} />
                            <input type="email" placeholder="Email Address" className={inputStyle} />
                            <input type="tel" placeholder="Phone Number" className={inputStyle} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-md font-semibold text-gray-700">
                                Academic Information
                            </h3>

                            <input type="text" placeholder="Student ID" className={inputStyle} />
                            <input type="text" placeholder="Department" className={inputStyle} />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Year" className={inputStyle} />
                                <input type="text" placeholder="Section" className={inputStyle} />
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="mt-8">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">
                            About
                        </h3>
                        <textarea
                            rows="4"
                            placeholder="Write something about yourself..."
                            className={inputStyle}
                        ></textarea>
                    </div>

                    {/* Mobile Button */}
                    <div className="mt-8 md:hidden">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Studentprofile
