import React, { useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import toast, { Toaster } from 'react-hot-toast'
import App from '../../App'
import { FaCalendarAlt, FaClock, FaRegCalendarCheck, FaUsers } from 'react-icons/fa';
import { UserName } from '../../Apis/Islogin';
import Calendars from '../StudentPages/Calendars';
import axios from 'axios';

function TeacherAcademicCalendar() {
    const [Event, setAddEvent] = useState(false)
    //   const [showPopup, setShowPopup] = useState(true); // show on page load
    const features = [
        { icon: <FaCalendarAlt className="text-blue-500 text-3xl hover:text-gray-700" />, text: 'Create and edit events with ease' },
        { icon: <FaClock className="text-blue-500 text-3xl hover:text-gray-700 " />, text: 'Set reminders for important academic dates' },
        { icon: <FaRegCalendarCheck className="text-blue-500 text-3xl hover:text-gray-700" />, text: 'View calendar by month, week, or day' },
        { icon: <FaUsers className="text-blue-500 text-3xl hover:text-gray-700" />, text: 'Role-based access for admins, teachers, and students' },
    ];
    const [EventName, setEventName] = useState("")
    const [Eventtype, setEventtype] = useState("")
    const [Eventsatert, setEventsatrt] = useState("")
    const [Eventend, setEventend] = useState("")
    const [Addbyname, setaddbyname] = useState(UserName?.name)
    const [Addbyid, setaddbyid] = useState(UserName?.teacher_Id)
    const [addbrole, setaddbrole] = useState(UserName?.role)
    const [Descprition, setDescprition] = useState("")
    const HandelEvent = async () => {
        if (!EventName || !Eventtype || !Eventsatert || !Eventend || !Addbyname || !Addbyid || !addbrole || !Descprition) {
            return toast.error("fill the required input's.");
        }
        try {
            const eventData = {
                EventName, Eventsatert, Eventend, Eventtype, Addbyname, Addbyid, addbrole, Descprition
            }
            console.log(eventData)
            const responseAddEvent = await axios.post("http://localhost:5001/api/Academic/addAcademic", { eventData: eventData })
            console.log(responseAddEvent.data.message, ": responseAddEvent")
            if (responseAddEvent.data.message === "DATA ADDED INTO DB.") {
                toast.success("DATA ADDED ")
                return setAddEvent(false)
            }


        } catch (error) {
            console.log(error, "ERROR")
        }
    }
    return (
        <>


            <App></App>
            <Toaster />
            <div className="md:ml-64 p-6 space-y-6 min-h-screen bg-gray-100">
                {/* ================= HEADER ================= */}
                <AdminHeader pathname={"Manage Academic Calendar"} />

                {/* Page Title */}
                <div className="flex justify-between items-center mt-3">

                    <button
                        onClick={() => setAddEvent(prev => !prev)}
                        className="rounded-lg bg-blue-600 text-white px-6 py-2 text-sm font-medium hover:bg-blue-700 transition-shadow shadow-sm hover:shadow-md"
                    >
                        {Event ? "Close" : "Add"} Event
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500 rounded-xl">
                        <FaCalendarAlt className="text-white text-lg" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Academic Calendar </h2>
                        <p className="text-sm text-gray-500">Stay organized with upcoming events</p>
                    </div>
                </div>
                {Event && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => seteventForm(false)}
                        />

                        {/* Modal content */}
                        <div className="relative bg-white p-6 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                            {/* Header with Close Button on RIGHT SIDE */}
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500 rounded-xl">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Add New Event</h2>
                                </div>

                                {/* CLOSE BUTTON - TOP RIGHT */}
                                <button
                                    onClick={() => setAddEvent(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                                    title="Close"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-500 group-hover:text-gray-700 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form className="space-y-4">
                                {/* ROW 1: Event Name + Event Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Name *</label>
                                        <input
                                            type="text"
                                            required
                                            onChange={(e) => setEventName(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Enter event name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
                                        <select
                                            required
                                            onClick={(e) => setEventtype(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        >
                                            <option value="">Select type</option>
                                            <option value="Exam">Exam</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Holiday">Holiday</option>
                                            <option value="Assignment">Assignment</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ROW 2: Start Date + End Date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Start *</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            onChange={(e) => setEventsatrt(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event End *</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            onChange={(e) => setEventend(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* ROW 3: Your ID + Role */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your ID</label>
                                        <input
                                            type="text"
                                            value={UserName?.teacher_Id || ""}
                                            readOnly
                                            onChange={(e) => setaddbyid(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setaddbrole(e.target.value)}
                                            value={UserName?.role || ""}
                                            readOnly
                                            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        onChange={(e) => setDescprition(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Add event description (optional)..."
                                    />
                                </div>
                            </form>

                            {/* Bottom Action Buttons */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                                <button
                                    type="button"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={HandelEvent}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    Save Event
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {Event ? "" : <Calendars role="teacher"></Calendars>
                }            </div>
        </>
    )
}

export default TeacherAcademicCalendar