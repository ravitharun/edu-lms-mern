import React, { useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import toast, { Toaster } from 'react-hot-toast'
import { FiX, FiCalendar, FiUpload, FiTag, FiPlus } from "react-icons/fi";
import axios from 'axios';
import GetAnnouncement from './GetAnnouncement';
import { useEffect } from 'react';
import { socket } from '../../Socket';
import { MaintanceMode, UserName } from '../../Apis/Islogin';
import Undermanitance from '../../Loaders/Undermanitance';
function Annoncement() {
    const page = "Annoncement"
    const [openPoup, setopenPoup] = useState(false)
    const Roles = ["Students", "Teacher", "Both"]
    const [Title, setTitle] = useState("")
    const [AnnouncementType, setAnnouncementType] = useState("")
    const [StartDate, setStartDate] = useState("")
    const [EndDate, setEndDate] = useState("")
    const [Banner, setBanner] = useState(null)
    const [TargetAudience, setTargetAudience] = useState('')
    useEffect(() => {
        // Listen for the "Announcement" event
        const handleAnnouncement = (data) => {
            console.log(data, "New Announcement App level");
            alert(data); // or toast.success(data) if using React-Toastify
        };

        socket.on("Announcement", handleAnnouncement);

        // Cleanup listener on unmount
        return () => {
            socket.off("Announcement", handleAnnouncement);
        };
    }, []);
    const HandelFile = (e) => {
        const file = e.target.files[0]
        console.log(file)
        const FileUploadType = ["image/png", "image/jpeng"]
        if (!FileUploadType.includes(file.type)) {

            toast.error("Allowed Fiels to Uplaod Only ", FileUploadType)
            return setBanner(null)
        }
        if (!file) {
            return toast.error("File is reuired.")
        }
        setBanner(file)
    }

    console.log(UserName, 'UserName')
    const HandelAnnoncement = async () => {


        try {
            if (!isNaN(Title)) {
                return toast.error(`"${Title}" is not valid. Title should contain only characters.`);
            }
            if (!Title || !AnnouncementType || !StartDate || !EndDate || !TargetAudience || !Banner) {
                return toast.error("Fill all required Feilds.")
            }
            const formdata = new FormData()
            formdata.append("Title", Title)
            formdata.append("AnnouncementType", AnnouncementType)
            formdata.append("StartDate", StartDate)
            formdata.append("EndDate", EndDate)
            formdata.append("profile", Banner)
            formdata.append("TargetAudience", TargetAudience)
            formdata.append("AddedBy", UserName?.role == 'Admin' ? UserName?.Admin_Id : UserName?.teacher_Id)
            formdata.append("Role", UserName?.role)
            const response = await axios.post("http://localhost:5001/api/Announcement/addAnnouncement", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (response.data.message == 'Announcement Published') {
                toast.success(response.data.message)
                return setopenPoup(false)
            }
            console.log(response, 'response')
            console.log({ Title, AnnouncementType, StartDate, EndDate, TargetAudience, Banner })
        } catch (error) {
            console.log(error)
            return toast.error("error")
        }


    }
    return (
        <>

            {MaintanceMode ? <Undermanitance /> :

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
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/* Type */}
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">
                                                        Announcement Type
                                                    </label>
                                                    <select className="w-full border rounded-lg mt-1 px-3 py-2 outline-none" onChange={(e) => setAnnouncementType(e.target.value)}>
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
                                                                required
                                                                onChange={(e) => setStartDate(e.target.value)}
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
                                                                type="datetime-local" required
                                                                className="w-full py-2 outline-none"
                                                                onChange={(e) => setEndDate(e.target.value)}

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
                                                        <input type="file" className="w-full text-sm" onChange={(e) => HandelFile(e)} required />
                                                    </div>
                                                </div>

                                                {/* Role */}
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">
                                                        Target Audience
                                                    </label>

                                                    <select className="w-full border rounded-lg mt-1 px-3 py-2" onChange={(e) => setTargetAudience(e.target.value)} >
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

                                                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" onClick={HandelAnnoncement}>
                                                    Publish
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                                <GetAnnouncement   ></GetAnnouncement>

                            </div>
                        </main>
                    </div>


                </div>}
        </>
    )
}

export default Annoncement