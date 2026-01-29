import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTasks,
  FaCalendarCheck,
  FaBell,
  FaPlus,
  FaUpload,
  FaClipboardCheck,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import secureLocalStorage from "react-secure-storage";
import { TfiAnnouncement } from "react-icons/tfi";
import App from "../../App";

function AdminDashboard() {
  const handleLogout = () => {
    secureLocalStorage.clear();
    window.location.href = "/login";
  };
  const [showNotifications, setShowNotifications] = useState(false);


  return (
    <>
    <App></App>
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Teacher Dashboard
        </h1>
        <div className="relative">
          <FaBell
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-xl text-gray-600 cursor-pointer"
          />

          {showNotifications && (
            <div className="absolute right-6 top-14 w-72 bg-white shadow-lg rounded-xl z-50 border border-gray-100">
              {/* Header */}
              <div className="p-3 border-b font-semibold text-sm text-gray-700 bg-gray-50">
                Notifications
              </div>

              {/* Scrollable notifications */}
              <div className="max-h-64 overflow-y-auto">
                <NotificationItem text="New assignment submitted" />
                <NotificationItem text="Attendance marked for CSE 2nd Year" />
                <NotificationItem text="Student sent a doubt" />
                <NotificationItem text="Material uploaded for CSE 3rd Year" />
                <NotificationItem text="Exam schedule updated" />
                <NotificationItem text="Extra notification example" />
                <NotificationItem text="Another notification" />
              </div>
            </div>



          )}
        </div>


      </div>



      {/* ---------- QUICK ACTIONS ---------- */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <QuickAction icon={<FaPlus />} label="Add Assignment" />
        <QuickAction icon={<FaUpload />} label="Upload Material" />
        <QuickAction icon={<FaClipboardCheck />} label="Mark Attendance" />
        <QuickAction icon={<FaCalendarAlt />} label="Add Event" />
      </div> */}

      {/* ---------- STATS CARDS ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Classes" value="5" icon={<FaChalkboardTeacher />} color="bg-blue-500" />
        <DashboardCard title="Students" value="180" icon={<FaUserGraduate />} color="bg-green-500" />
        <DashboardCard title="Assignments" value="12" icon={<FaTasks />} color="bg-purple-500" />
        <DashboardCard title="Attendance" value="92%" icon={<FaCalendarCheck />} color="bg-orange-500" />
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Today's Classes</h2>
          <ul className="space-y-3">
            <ClassItem title="CSE 3rd Year - Web Development" time="10:00 AM" />
            <ClassItem title="CSE 2nd Year - DBMS" time="12:00 PM" />
            <ClassItem title="Final Year - Project Lab" time="2:30 PM" />
          </ul>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">My Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
              T
            </div>
            <div>
              <p className="font-medium">Mr. Tharun</p>
              <p className="text-sm text-gray-500">Computer Science</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-200 rounded">
              <FaUserEdit /> Edit
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-red-500 text-white rounded"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* ---------- NOTIFICATIONS & EVENTS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 ">
       
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
          <ul className="space-y-2 text-sm">
            <li>📅 Faculty Meeting – Jan 30</li>
            <li>📅 Internal Exams – Feb 2</li>
          </ul>
        </div>
      </div>

      {/* ---------- PENDING ASSIGNMENTS ---------- */}
      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Pending Assignments</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Class</th>
              <th>Assignment</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <AssignmentRow cls="CSE 3rd Year" task="React Mini Project" date="28 Jan" />
            <AssignmentRow cls="CSE 2nd Year" task="SQL Queries" date="30 Jan" />
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

/* ---------- COMPONENTS ---------- */

const DashboardCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg ${color} text-white flex items-center justify-center text-xl`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  </div>
);

const QuickAction = ({ icon, label }) => (
  <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
    <div className="text-xl text-blue-500">{icon}</div>
    <p className="text-sm font-medium">{label}</p>
  </div>
);

const ClassItem = ({ title, time }) => (
  <li className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
    <span className="font-medium">{title}</span>
    <span className="text-sm text-gray-500">{time}</span>
  </li>
);

const AssignmentRow = ({ cls, task, date }) => (
  <tr className="border-b">
    <td className="py-2">{cls}</td>
    <td>{task}</td>
    <td>{date}</td>
    <td>
      <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
        Pending
      </span>
    </td>
  </tr>
);
const NotificationItem = ({ text, time = "Just now", unread = true }) => (
  <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
    {/* Icon */}
    <div className="mt-1 text-blue-500">
      <FaBell />
    </div>
    {/* Content */}
    <div className="flex-1">
      <p className="text-sm text-gray-700">{text}</p>
      <span className="text-xs text-gray-400">{time}</span>
    </div>

    {/* Unread dot */}
    {unread && (
      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></span>
    )}
  </div>
);


export default AdminDashboard;
