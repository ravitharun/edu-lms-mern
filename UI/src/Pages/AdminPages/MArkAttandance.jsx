import React, { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { TfiExport } from "react-icons/tfi";
import App from "../../App";

function MarkAttendance() {
    const [showNotifications, setShowNotifications] = useState(false);

    // Sample data for students
    const students = [
        { roll: "01", name: "Alice Johnson" },
        { roll: "02", name: "Bob Smith" },
        { roll: "03", name: "Charlie Brown" },
        { roll: "04", name: "David Lee" },
        { roll: "05", name: "Eva Green" },
    ];
    const Class = [
        {
            className: "B.tech",
            Dept: "CSE",
            section: "a"
        },
        {
            className: "B.tech", Dept: "CSE",
            section: "b"
        },
        {
            className: "B.tech", Dept: "CSE",
            section: "b"
        }
    ]
    return (
        <>
            <App></App>
           <div className="md:ml-64 p-6 min-h-screen bg-gray-100 space-y-6">
  {/* ================= HEADER ================= */}
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-semibold text-gray-800">Mark Attendance</h1>
    <div className="flex items-center gap-4">
      <FaBell
        className="text-xl text-gray-600 cursor-pointer"
        onClick={() => setShowNotifications(!showNotifications)}
      />
      <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow cursor-pointer">
        <FaUser className="text-gray-600" />
        <span className="text-gray-800 font-medium text-sm">Mr. Tharun</span>
      </div>
    </div>
  </div>

  {/* ================= SECTION DROPDOWN ================= */}
  <div className="w-full max-w-sm bg-white rounded-xl shadow p-4">
    <label
      htmlFor="section"
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      Choose a Section
    </label>
    <select
      id="section"
      onChange={(e) => console.log(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition"
    >
      <option value="" disabled selected>
        -- Select Section --
      </option>
      {Class.map((cls, idx) => (
        <option
          key={idx}
          value={`${cls.className}-${cls.Dept}-${cls.section}`}
          className="text-gray-700"
        >
          {cls.className} - {cls.Dept} - {cls.section}
        </option>
      ))}
    </select>
  </div>

  {/* ================= ATTENDANCE TABLE ================= */}
  <div className="bg-white shadow-md rounded-xl overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="p-3 text-left">Roll No</th>
          <th className="p-3 text-left">Student Name</th>
          <th className="p-3 text-center">Present</th>
          <th className="p-3 text-center">Absent</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, idx) => (
          <tr key={idx} className="border-b hover:bg-gray-50">
            <td className="p-3 font-medium">{student.roll}</td>
            <td className="p-3">{student.name}</td>
            <td className="p-3 text-center">
              <input type="checkbox" className="w-4 h-4 text-green-500" />
            </td>
            <td className="p-3 text-center">
              <input type="checkbox" className="w-4 h-4 text-red-500" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ================= ACTION BUTTON ================= */}
  <div className="flex justify-end mt-4">
    <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      <TfiExport />
      Submit Attendance
    </button>
  </div>
</div>

        </>

    );
}

export default MarkAttendance;
