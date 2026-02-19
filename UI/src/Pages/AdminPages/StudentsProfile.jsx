import React, { useState } from "react";
import AdminHeader from "../../Components/AdminHeader";
import App from "../../App";
import { Link, useLocation } from "react-router-dom";

function StudentProfile() {
  const date = useLocation()
  console.log(date.state
  )
  const [remainder, setremainder] = useState(false)
  return (
    <>
      <App></App>
      <div className="md:ml-64 p-6 space-y-6 min-h-screen bg-gray-100">
        {/* ================= HEADER ================= */}
        <div className=''>
          <AdminHeader pathname={"Student Profile"}></AdminHeader>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3 mt-3">
        </h1>
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="p-6 bg-gray-100 min-h-screen">

            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Student Profile
              </h1>
              <p className="text-sm text-gray-500">
                View student academic and attendance details
              </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <div className="flex items-center gap-6">
                <img
                  src={`https://ui-avatars.com/api/?name=${date.state.name}`}
                  alt="student"
                  className="w-20 h-20 rounded-full border"
                />

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {date.state.name}
                  </h2>
                  <p className="text-sm text-gray-600">{date.state.rollnumber || 123}</p>
                  <p className="text-sm text-gray-600">{date.state.dept || 'Department:CSE'}</p>
                  <p className="text-sm text-gray-600">{date.state.email || "Email: arjun@college.edu"}</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

              <div className="bg-white rounded-xl shadow p-5 text-center">
                <p className="text-sm text-gray-500">Attendance</p>
                <h3 className="text-2xl font-semibold text-green-600">92%</h3>
              </div>

              <div className="bg-white rounded-xl shadow p-5 text-center">
                <p className="text-sm text-gray-500">Assignments Submitted</p>
                <h3 className="text-2xl font-semibold text-blue-600">7 / 8</h3>
              </div>

              <div className="bg-white rounded-xl shadow p-5 text-center">
                <p className="text-sm text-gray-500">Average Marks</p>
                <h3 className="text-2xl font-semibold text-purple-600">85</h3>
              </div>

            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Attendance
              </h3>

              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">20 Jan 2026</td>
                    <td className="p-3 text-green-600 font-medium">Present</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">19 Jan 2026</td>
                    <td className="p-3 text-red-600 font-medium">Absent</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View Submissions
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={() => setremainder((prev) => !prev)}>
                Send Reminder
              </button>
              <Link to="/students">
                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400" onClick={() => console.log("i")}>
                  Back
                </button>

              </Link>
            </div>

          </div>
        </div>
      </div>
      {remainder && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  bg-white shadow-xl rounded-xl p-6 w-96 border border-gray-200 z-50">

          <h2 className="text-lg font-semibold mb-5 text-center">
            Send Reminder
          </h2>

          {/* Student ID */}
          <label className="block text-sm font-medium mb-1">
            Student Name
          </label>
          <input
            type="text"
            value={date?.state?.name}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-sm bg-gray-100 cursor-not-allowed"
          />

          {/* Issue Title */}
          <label className="block text-sm font-medium mb-1">
            Issue Title
          </label>
          <input
            type="text"
            placeholder="Enter issue title"
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-sm"
          />

          {/* Message */}
          <label className="block text-sm font-medium mb-1">
            Reminder Message
          </label>
          <textarea
            placeholder="Write reminder message..."
            rows="3"
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-sm"
          ></textarea>

          {/* Priority */}
          <label className="block text-sm font-medium mb-1">
            Set Priority
          </label>
          <select className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-sm">
            <option>Low Priority</option>
            <option>Medium Priority</option>
            <option>High Priority</option>
          </select>

          {/* Date */}
          <label className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg mb-5 text-sm"
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setremainder(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </div>

        </div>
      )}




    </>

  );
}

export default StudentProfile;
