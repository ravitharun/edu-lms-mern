import React, { useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import { Toaster } from 'react-hot-toast'
import App from '../../App'
import { FaCalendarAlt, FaClock, FaRegCalendarCheck, FaUsers } from 'react-icons/fa';
import { UserName } from '../../Apis/Islogin';
import Calendars from '../StudentPages/Calendars';

function TeacherAcademicCalendar() {
    const [Event, setAddEvent] = useState(false)
    //   const [showPopup, setShowPopup] = useState(true); // show on page load
    const features = [
        { icon: <FaCalendarAlt className="text-blue-500 text-3xl hover:text-gray-700" />, text: 'Create and edit events with ease' },
        { icon: <FaClock className="text-blue-500 text-3xl hover:text-gray-700 " />, text: 'Set reminders for important academic dates' },
        { icon: <FaRegCalendarCheck className="text-blue-500 text-3xl hover:text-gray-700" />, text: 'View calendar by month, week, or day' },
        { icon: <FaUsers className="text-blue-500 text-3xl hover:text-gray-700" />, text: 'Role-based access for admins, teachers, and students' },
    ];

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
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/30"
      onClick={() => seteventForm(false)}
    ></div>

    {/* Modal content */}
    <div className="relative bg-gray-50 p-6 rounded-2xl w-full max-w-md z-50 pointer-events-auto">
      <h2 className="text-xl font-semibold mb-4">Add Event</h2>

      <div className="flex flex-col gap-3">
        <label className="font-medium">Event Name</label>
        <input type="text" className="border rounded-md p-2 w-full" />

        <label className="font-medium">Event Start</label>
        <input type="datetime-local" className="border rounded-md p-2 w-full" />

        <label className="font-medium">Event End Date</label>
        <input type="datetime-local" className="border rounded-md p-2 w-full" />

        <label className="font-medium">Your ID</label>
        <input
          type="text"
          value={UserName?.teacher_Id}
          readOnly
          className="border rounded-md p-2 w-full bg-gray-100 cursor-not-allowed"
        />

        <label className="font-medium">Role</label>
        <input
          type="text"
          value={UserName?.role}
          readOnly
          className="border rounded-md p-2 w-full bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => seteventForm(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Close
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Save
        </button>
      </div>
    </div>
  </div>
)}
                <Calendars role="teacher"></Calendars>
            </div>
        </>
    )
}

export default TeacherAcademicCalendar