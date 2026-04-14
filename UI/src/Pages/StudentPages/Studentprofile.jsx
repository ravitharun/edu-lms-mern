import React, { useState } from 'react'
import BackButton from '../../Components/BackButton'
import App from '../../App'
import { MaintanceMode, UserName } from '../../Apis/Islogin'
import Undermanitance from '../../Loaders/Undermanitance';

function Studentprofile() {

    const inputStyle = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
    const [file, setfile] = useState(null)
    const [profilePrivew, setprofilePrivew] = useState('')
    const [name, setname] = useState("")
    const [Email, setemail] = useState("")
    const [ID, setID] = useState("")
    const [Department, setDepartment] = useState("")
    const [Phonenumber, setPhonenumber] = useState("")
    const [Year, setYear] = useState("")
    const [Section, setSection] = useState("")
    const [Bio, setBio] = useState("")

    const [Edit, setEdit] = useState(false)
    const fileUpdate = (e) => {
        const file = e.target.files[0]
    
        const profilePrivew_url = URL.createObjectURL(file)
        setprofilePrivew(profilePrivew_url)
        setfile(file)
    }

    const handelEdit = () => {
        // alert("hi")
        setEdit((prev) => !prev)

    }
    return (
        <>
      
            <App />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-10">

                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Hi, <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                                {UserName?.name}
                            </span> 👋
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage your profile information
                        </p>
                    </div>

                    {Edit && <button className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition">
                        Save Changes
                    </button>}
                </div>

                {/* Main Card */}
                <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-6 md:p-10">

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b pb-6">

                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img
                                    src={profilePrivew ? profilePrivew : UserName.profilePreview}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
                                />
                                <button className={`absolute bottom-0 right-0 ${Edit ? "bg-green-600" : "bg-blue-600"} text-white text-xs px-2 py-0.5 rounded-full`} onClick={handelEdit}>
                                    {Edit ? <button onClick={() => alert("Savebtn")}>Save</button> : "Edit"}
                                </button>
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

                        <input type="file" className="text-xs cursor-pointer" onChange={(e) => fileUpdate(e)} />
                    </div>

                    {/* Form Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Personal Information */}
                        <div className="space-y-5">
                            <h3 className="text-md font-semibold text-gray-700 border-b pb-2">
                                Personal Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    value={UserName?.name || ""}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className={inputStyle}
                                    value={UserName?.email || ""}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Phone Number
                                </label>
                                <input type="tel" className={inputStyle} />
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="space-y-5">
                            <h3 className="text-md font-semibold text-gray-700 border-b pb-2">
                                Academic Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Student ID
                                </label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    value={UserName?.Student_ID || ""}
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    value={UserName?.department || ""}
                                    readOnly
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        className={inputStyle}
                                        value={UserName?.StudentsYearDepartment?.split(" ")[1] || ""}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Section
                                    </label>
                                    <input
                                        type="text"
                                        className={inputStyle}
                                        value={UserName?.department || ""}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* About Section */}
                    <div className="mt-10">
                        <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">
                            About
                        </h3>

                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Bio
                        </label>

                        <textarea
                            rows="4"
                            className={inputStyle}
                            placeholder="Write something about yourself..."
                        ></textarea>
                    </div>

                    {/* Mobile Save Button */}
                    <div className="mt-8 md:hidden">
                        {Edit ? <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
                            Save Changes
                        </button> : ""}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Studentprofile
