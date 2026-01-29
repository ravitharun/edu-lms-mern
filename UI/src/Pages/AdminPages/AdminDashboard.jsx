import React from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTasks,
  FaCalendarCheck,
  FaBell,
} from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Teacher Dashboard
        </h1>
        <FaBell className="text-xl text-gray-600 cursor-pointer" />
      </div>

      {/* ---------- STATS CARDS ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Classes"
          value="5"
          icon={<FaChalkboardTeacher />}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Students"
          value="180"
          icon={<FaUserGraduate />}
          color="bg-green-500"
        />
        <DashboardCard
          title="Assignments"
          value="12"
          icon={<FaTasks />}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Attendance"
          value="92%"
          icon={<FaCalendarCheck />}
          color="bg-orange-500"
        />
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

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">My Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
              T
            </div>
            <div>
              <p className="font-medium">Mr. Tharun</p>
              <p className="text-sm text-gray-500">Computer Science</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- PENDING ASSIGNMENTS ---------- */}
      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Pending Assignments</h2>
        <div className="overflow-x-auto">
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
              <AssignmentRow
                cls="CSE 3rd Year"
                task="React Mini Project"
                date="28 Jan"
              />
              <AssignmentRow
                cls="CSE 2nd Year"
                task="SQL Queries"
                date="30 Jan"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const DashboardCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-lg ${color} text-white flex items-center justify-center text-xl`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
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

export default AdminDashboard;
