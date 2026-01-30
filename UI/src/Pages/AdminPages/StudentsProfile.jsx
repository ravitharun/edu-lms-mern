import React from "react";

function StudentProfile() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
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
            src="https://ui-avatars.com/api/?name=Arjun+Kumar"
            alt="student"
            className="w-20 h-20 rounded-full border"
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Arjun Kumar
            </h2>
            <p className="text-sm text-gray-600">Roll No: 21CS001</p>
            <p className="text-sm text-gray-600">Department: CSE</p>
            <p className="text-sm text-gray-600">Email: arjun@college.edu</p>
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
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Send Reminder
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
          Back
        </button>
      </div>

    </div>
  );
}

export default StudentProfile;
