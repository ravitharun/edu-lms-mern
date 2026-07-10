
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBook,
  FiCalendar,
  FiFileText,
  FiMessageCircle,
  FiLogOut,
  FiLock,
  FiUser,
  FiChevronUp,
  FiChevronDown,
  FiClock,
  FiClipboard,
  FiGrid
} from "react-icons/fi";

import LogoNavbar from "./LogoNavbar";
import MobilePassnav from "./MobilePassnav";
import AdminNavbar from "./AdminNavbar";
import { UserRole } from "../Apis/Islogin";
import MasterAdminNavbar from "../Pages/Admin/MasterAdminNavbar";
import { MdOutlineAssessment } from "react-icons/md";

function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {

  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [role] = useState(UserRole?.role);

  return (
    <>
      {/* Admin Navbar */}
      {role !== "student" ? (
        <>
          <AdminNavbar />
        </>
      ) : (
        <>
          <nav className="sticky top-0 z-50 bg-gray-800 shadow-md">

            <div className="max-w-7xl mx-auto px-6">

              <div className="h-16 flex items-center justify-between">

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-6">

                  <NavItem to="/StudentDashboard" icon={<FiHome size={20} />} title="Dashboard" />

                  <NavItem
                    to="/my-course"
                    icon={<FiFileText size={20} />}
                    title="Study Materials"
                  />

                  <NavItem
                    to="/feedback"
                    icon={<FiMessageCircle size={20} />}
                    title="Feedback"
                  />

                  {/* Academics Dropdown */}
                  <div className="relative">

                    <button
                      onClick={() => setAcademicsOpen(!academicsOpen)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-white/10 transition"
                    >
                      <FiCalendar size={20} />
                      <span>Academics</span>
                      {academicsOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {academicsOpen && (
                      <div className="absolute top-full mt-2 w-56 rounded-lg bg-gray-700 border border-white/20 shadow-lg">

                        <DropdownItem
                          to="/Exam-Schedule"
                          icon={<FiClipboard />}
                          title="Exam Schedule"
                        />

                        <DropdownItem
                          to="/Class-Timings"
                          icon={<FiClock />}
                          title="Class Timings"
                        />

                        <DropdownItem
                          to="/Academic-Calendar"
                          icon={<FiCalendar />}
                          title="Academic Calendar"
                        />
                        <MobileItem
                          to="/Academic-Marks"
                          icon={<MdOutlineAssessment />}
                          title="Academic Marks"
                        />

                      </div>
                    )}
                  </div>

                </div>


                {/* MOBILE HEADER */}
                <div className="flex items-center justify-between w-full md:hidden">

                  <img
                    loading="lazy"
                    src="https://www.bing.com/th/id/OIP.zSG2VrHBm9ix_kbmmhw5cwHaHa?w=195&h=211&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
                    alt="Logo"
                    className="h-8"
                  />

                  <button
                    onClick={() => setMobileMenuOpen(prev => !prev)}
                    className="text-white cursor-pointer"
                  >
                    {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                  </button>

                </div>

              </div>

            </div>


            {/* MOBILE MENU */}
            {mobileMenuOpen && (

              <div className="md:hidden bg-gray-800 border-t border-white/10 shadow-lg">

                <div className="flex flex-col gap-2 p-4">

                  <MobileItem to="/" icon={<FiHome />} title="Dashboard" />

                  <MobileItem
                    to="/my-course"
                    icon={<FiFileText />}
                    title="Study Materials"
                  />

                  <MobileItem
                    to="/feedback"
                    icon={<FiMessageCircle />}
                    title="Feedback"
                  />

                  {/* Mobile Academics */}
                  <div className="flex flex-col gap-1">

                    <button
                      onClick={() => setAcademicsOpen(!academicsOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <FiCalendar />
                      Academics
                      {academicsOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {academicsOpen && (
                      <div className="ml-4 flex flex-col gap-1">

                        <MobileItem
                          to="/Exam-Schedule"
                          icon={<FiClipboard />}
                          title="Exam Schedule"
                        />

                        <MobileItem
                          to="/Class-Timings"
                          icon={<FiClock />}
                          title="Class Timings"
                        />

                        <MobileItem
                          to="/Academic-Calendar"
                          icon={<FiCalendar />}
                          title="Academic Calendar"
                        />

                        <MobileItem
                          to="/Schedule-Timetable"
                          icon={<FiGrid />}
                          title="Timetable"
                        />
                        <MobileItem
                          to="/Schedule-Timetable"
                          icon={<MdOutlineAssessment />}
                          title="Academic Marks"
                        />

                      </div>
                    )}

                  </div>


                  {/* Profile */}
                  <button
                    onClick={() => setOpenProfile(prev => !prev)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-700"
                  >

                    <FiUser className="text-white" />

                    <span className="text-sm font-medium text-white">
                      HI, Ravi Tharun
                    </span>

                    {openProfile ? (
                      <FiChevronUp className="text-white" />
                    ) : (
                      <FiChevronDown className="text-gray-400" />
                    )}

                  </button>

                  {openProfile && <MobilePassnav />}

                </div>

              </div>
            )}
          </nav>
        </>
      )}

      {role === "Admin" && <MasterAdminNavbar />}
    </>
  );
}


/* ================= COMPONENTS ================= */

const NavItem = ({ to, icon, title }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-white/10 transition"
  >
    {icon}
    <span>{title}</span>
  </Link>
);

const DropdownItem = ({ to, icon, title }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-white/10 transition"
  >
    {icon}
    <span>{title}</span>
  </Link>
);

const MobileItem = ({ to, icon, title }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
  >
    {icon}
    <span>{title}</span>
  </Link>
);

export default Navbar;