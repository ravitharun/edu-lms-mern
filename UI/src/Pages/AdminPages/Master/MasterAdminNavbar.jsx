import React, { useState } from "react";
import { FaBars, FaTimes, FaTachometerAlt, FaBook, FaChalkboardTeacher, FaUsers, FaUserGraduate, FaCog, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function MasterAdminNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar - Only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white border-b shadow-sm">
        <h1 className="font-semibold text-gray-800 text-lg">Admin Panel</h1>
        <button onClick={() => setOpen(true)} className="p-1 rounded-lg hover:bg-gray-100">
          <FaBars className="text-xl text-gray-700" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on desktop, slides in on mobile */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo/Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
              LMS
            </div>
            <span className="font-semibold text-gray-800 text-lg">Admin</span>
          </div>
          <button
            className="md:hidden p-1 rounded-lg hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="text-lg text-gray-600" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-6 space-y-2 mt-4">
          <SidebarItem icon={<FaTachometerAlt />} title="Dashboard" active={true} url="/AdminDashboard"/>
          <SidebarItem icon={<FaBook />} title="Subjects Master" url="/Admin/AssiginSubjects" />
          <SidebarItem icon={<FaChalkboardTeacher />} title="Assign Teachers" url="/admin/Assign-Teachers" />
          <SidebarItem icon={<FaUserGraduate />} title="Students"  url="/admin/Students"/>
          <SidebarItem icon={<FaChalkboardTeacher />} title="Teachers"  url="/admin/Teachers"/>
          {/* <SidebarItem icon={<FaCog />} title="Settings" url="/admin/" /> */}
          <SidebarItem icon={<FaUser />} title="Profile" url="/admin/Profile" />
        </nav>
      </aside>
    </>
  );
}

const SidebarItem = ({ icon, title, active = false, url }) => (
  <Link to={url}>

    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer group
    ${active
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      }`}>
      <span className={`text-lg ${active ? 'text-white' : 'group-hover:text-blue-600'}`}>{icon}</span>
      <span>{title}</span>
    </div>
  </Link>
);

export default MasterAdminNavbar;
