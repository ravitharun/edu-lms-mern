import React, { useState } from "react";
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaClipboardCheck, FaClock, FaPlus, FaTimes, FaUpload, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import App from "../../App";

function Classes() {
  const [Action, SetActon] = useState("");
  const [handelAction, SethandelActon] = useState(false);

  const options = [
    { icon: <FaPlus />, label: "Add Assignment", color: "bg-blue-100 text-blue-500", url: "/assignments" },
    { icon: <FaUpload />, label: "Upload Material", color: "bg-green-100 text-green-500", url: "" },
    { icon: <FaClipboardCheck />, label: "Mark Attendance", color: "bg-yellow-100 text-yellow-500", url: "/attendance" },
  ];

  const handelActionType = (type) => {
    SetActon(type);
    SethandelActon(true);
  };

  return (
    <>
    <App></App>
    <div className="md:ml-64 p-6 space-y-6 min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Classes</h1>

      {/* ================= QUICK ACTION CARDS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {options.map((opt, idx) => (
          <Link key={idx} to={opt.url || "#"}>
            <div
              className={`bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-gray-50`}
              onClick={() => handelActionType(opt.label)}
            >
              <div className={`text-2xl ${opt.color}`}>{opt.icon}</div>
              <p className="text-sm font-medium text-gray-700">{opt.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= CLASSES TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-center">Students</th>
              <th className="p-3 text-left">Schedule</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">CSE – 3A</td>
              <td className="p-3">Operating Systems</td>
              <td className="p-3 text-center">60</td>
              <td className="p-3">Mon–Fri 9–10 AM</td>
              <td className="p-3 text-center">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">Active</span>
              </td>
              <td className="p-3 text-center flex justify-center gap-3">
                <FaPlus className="cursor-pointer text-blue-600" />
                <FaClipboardCheck className="cursor-pointer text-green-600" />
                <FaUsers className="cursor-pointer text-purple-600" />
                <FaChartBar className="cursor-pointer text-orange-600" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

     
    </div>
    </>

  );
}

export default Classes;
