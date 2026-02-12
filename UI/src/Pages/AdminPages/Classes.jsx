import React, { useEffect, useState } from "react";
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaClipboardCheck, FaClock, FaPlus, FaTimes, FaUpload, FaUsers, FaChartBar, FaFileUpload, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import App from "../../App";
import MasterAdmin from "./Master/MasterAdmin";
import toast from "react-hot-toast";
import { GetClassList } from "./TechersApiCall/FetchApicall";

function Classes() {
  const [Action, SetActon] = useState("");
  const [handelAction, SethandelActon] = useState(false);
  const [assignedClasses, setAssignedClasses] = useState([])


  useEffect(() => {
    const Fetch_Class = async () => {
      try {
        const response_class = await GetClassList()
        setAssignedClasses(response_class.data.message)

      } catch (error) {
        console.log(error.message, 'from the Fetching Teacher Pages Api Call.')
        toast.error(error.message)
      }
    }
    Fetch_Class()
  }, [])
  console.log(assignedClasses)

  const options = [
    { icon: <FaPlus />, label: "Add Assignment", color: "bg-blue-100 text-blue-500", url: "/assignments" },
    { icon: <FaUpload />, label: "Upload Material", color: "bg-green-100 text-green-500", url: "/Upload-Material" },
    { icon: <FaClipboardCheck />, label: "Mark Attendance", color: "bg-yellow-100 text-yellow-500", url: "/attendance" },
  ];

  const handelActionType = (type) => {
    SetActon(type);
    SethandelActon(true);
  };
  const ActionsTodo = [{ color: "cursor-pointer text-blue-600", title: "Add assigment", Name: "", Link: "/assignments", icon: <FaPlus /> }, { color: "cursor-pointer text-green-600", title: "Upload Material", Name: "", Link: "/Upload-Material", icon: <FaFileUpload /> }, { color: "cursor-pointer text-purple-600", title: "Students", Name: "", Link: "/students", icon: <FaUsers /> }, { color: "cursor-pointer text-orange-600", title: "report", Name: "", Link: "/report", icon: <FaChartBar /> }]
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
              {assignedClasses.length === 0 ? <>

                <td colSpan="6" className="py-16">
                  <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-10 shadow-sm">

                    {/* Icon */}
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17v-6a3 3 0 016 0v6M5 21h14"
                        />
                      </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800">
                      No Classes Available
                    </h2>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-500 mt-2 text-center max-w-sm">
                      There are currently no classes assigned. Once a class is created or assigned,
                      it will appear here.
                    </p>

                  </div>
                </td>
              </> :
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">CSE – 3A</td>
                  <td className="p-3">Operating Systems</td>
                  <td className="p-3 text-center">60</td>
                  <td className="p-3">Mon–Fri 9–10 AM</td>
                  <td className="p-3 text-center">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">Active</span>
                  </td>
                  <td className="p-4 text-center flex justify-center gap-3">

                    {ActionsTodo.map((im, idx) =>
                      <Link to={im.Link}>
                        <td
                          title={im.title}
                          className={`${im.color} cursor-pointer transition-all duration-200 
              hover:scale-110 hover:text-black`}
                        >
                          {im.icon}
                        </td>

                      </Link>
                    )}
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>


      </div>
    </>

  );
}

export default Classes;
