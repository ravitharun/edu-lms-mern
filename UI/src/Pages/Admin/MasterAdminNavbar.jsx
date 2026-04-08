import React, { useState } from "react";
import { FaBars, FaTimes, FaTachometerAlt, FaBook, FaChalkboardTeacher, FaUsers, FaUserGraduate, FaCog, FaUser, FaCheck, FaUserCheck, FaPowerOff, FaBullhorn, FaCalendarAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleLogout, UserLogin } from "../../Apis/Islogin";
import { handelLogin } from "../../Apis/Signup";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Board from "./Board";
import LogoAdmin from "./LogoAdmin";

function MasterAdminNavbar({ path, Active }) {
  console.log({ path, Active })
  const [open, setOpen] = useState(true);
  // console.log(open, 'opn')
  return (
    <>
      {/* Mobile Top Bar - Only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 
  flex items-center h-16 px-6 bg-white border-b shadow-sm">

        {/* 🖤 Heading (Black Section) */}
        <div className=" text-black px-4 py-2 rounded-md">
          <h1 className="text-sm font-semibold">
            Admin Panel
          </h1>
        </div>
        <Board path={path}></Board>

        {/* 🔴 Middle Component Section */}
        <div className="ml-auto  flex items-center gap-4  px-4 py-2 rounded-md">
          <LogoAdmin />
        </div>

        {/* 🔵 Bars Section */}
        {!open &&
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg transition-all duration-300 
              hover:bg-gray-100 active:scale-95"
          >
            <FaBars className="text-lg text-gray-700 
                      transition-all duration-300 
                      hover:text-blue-600 hover:rotate-90" />
          </button>
        }

      </div>


      {/* Mobile Overlay */}
      {
        open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )
      }

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
            <span className="font-semibold text-gray-800 text-lg">Admin </span>
          </div>
          <button
            className="md:hidden p-2 rounded-lg 
             transition-all duration-300 
             hover:bg-red-50 active:scale-95"
            onClick={() => setOpen(false)}
          >
            <FaTimes
              className="text-lg text-gray-600 
               transition-all duration-300 
               hover:text-red-600 hover:rotate-90"
            />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-6 space-y-2 mt-4">
          <SidebarItem icon={<FaTachometerAlt />} title="Dashboard" active={0} url="/AdminDashboard" />
          <SidebarItem icon={<FaBook />} title="Manage Subjects" url="/Admin/AssiginSubjects" path={path} active={Active} />
          <SidebarItem icon={<FaChalkboardTeacher />} title="Assign Teachers" url="/admin/Assign-Teachers" active={Active} path={path} />
          <SidebarItem icon={<FaUserGraduate />} title="Reports" url="/admin/Reports" path={path} active={Active} />
          <SidebarItem icon={<FaChalkboardTeacher />} title="Teachers" url="/admin/Teachers" path={path} active={Active} />
          <SidebarItem icon={<FaRegCalendarAlt />} title="Add Holiday" url="/admin/Uploadholidays" path={path} active={Active} />

          <SidebarItem icon={<FaUsers />} title="Students" url="/admin/Studenta" path={path} active={Active} />
          <SidebarItem icon={<FaCalendarAlt />} title="TimeTable" url="/admin/AddTimeTable" path={path} active={Active} />
          <SidebarItem icon={<FaUser />} title="Profile" url="/admin/Profile" path={path} active={Active} />
          <SidebarItem icon={<HiOutlineExclamationCircle />} title="Issues" url="/admin/Issues" path={path} active={Active} />
          <SidebarItem icon={<FaBullhorn />} title="Annoncement" url="/admin/Annoncement" path={path} active={Active} />
          {<>

            {UserLogin && <SidebarItem icon={<FaPowerOff />} title="LogOut" path={path} active={Active} onClick={handleLogout} />}
          </>}
        </nav>
      </aside>
    </>
  );
}

const SidebarItem = ({ icon, title, active, url, path, onClick }) => (

  <>
    <Link to={url}>
      <>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer group
   
    ${title === path  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`} onClick={onClick}>
          <span className={`text-lg ${path == title ? 'text-white' : 'group-hover:text-blue-600'}`}>{icon}</span>
          <span >{title}  </span>

        </div>

      </>

    </Link>

  </>

);
<div>



</div>
export default MasterAdminNavbar;
