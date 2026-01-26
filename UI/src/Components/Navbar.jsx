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
} from "react-icons/fi";
import LogoNavbar from "./LogoNavbar";
import MobilePassnav from "./MobilePassnav";

function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <>

      <nav className="sticky top-0 z-50 bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6">
              <NavItem to="/" icon={<FiHome size={20} />} title="Dashboard" />
              <NavItem to="/feedback" icon={<FiMessageCircle size={20} />} title="Feedback" />
              <NavItem to="/my-course" icon={<FiFileText size={20} />} title="Study Materials" />

              {/* Academics Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setAcademicsOpen(!academicsOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-white/10 hover:backdrop-blur-md border border-transparent hover:border-white/30 transition"
                >
                  <FiCalendar size={20} />
                  <span>Academics</span>
                </button>
                {academicsOpen && (
                  <div className="absolute top-full mt-2 w-56 rounded-lg bg-gray-700/90 backdrop-blur-md border border-white/20 shadow-lg">
                    <DropdownItem to="/Exam-Schedule" title="Exam Schedule" />
                    <DropdownItem to="/Class-Timings" title="Class Timings" />
                    <DropdownItem to="/Schedule-Timetable" title="Timetable" />
                  </div>
                )}
              </div>


            </div>

            {/* MOBILE TOGGLE */}
            <div className="flex items-center justify-between md:hidden w-full">
              {/* Menu text on left */}
              <span className="text-white font-semibold text-lg">Menu</span>

              {/* Hamburger/X icon on right */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="text-white cursor-pointer"
              >
                {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <>

            <div className="md:hidden bg-gray-800 border-t border-white/10 shadow-lg">
              <div className="flex flex-col gap-2 p-4">

                <MobileItem to="/" icon={<FiHome />} title="Dashboard" />
                <MobileItem to="/my-course" icon={<FiBook />} title="My Courses" />

                {/* Mobile Academics Dropdown */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setAcademicsOpen(!academicsOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-md transition"
                  >
                    <FiCalendar />
                    Academics
                  </button>
                  {academicsOpen && (
                    <div className="ml-4 flex flex-col gap-1">
                      <MobileItem to="/Exam-Schedule" title="Exam Schedule" />
                      <MobileItem to="/Class-Timings" title="Class Timings" />
                      <MobileItem to="/Schedule-Timetable" title="Timetable" />
                    </div>
                  )}
                </div>

                <MobileItem to="/studyMaterials" icon={<FiFileText />} title="Materials" />

                {/* Logo mobile view  */}


                <nav className="sticky top-0 z-50 shadow">
                  <button
                    onClick={() => setOpenProfile((prev) => !prev)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                  >


                    <div className="flex items-center gap-2 group cursor-pointer">
                      <FiUser className="text-white group-hover:text-black transition-colors duration-300" />
                      <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        HI, Ravi Tharun
                      </span>
                    </div>



                    {openProfile ? <FiChevronUp className="text-white" /> : <FiChevronDown className="text-gray-500" />}
                    {/* {openProfile ? "open dropdown" :"clse drop donw" } */}
                  </button>


                </nav>
                {/* <MobilePassnav mobileMenuOpen={mobileMenuOpen}  /> */}

                {openProfile && (
                  <MobilePassnav />
                )}
              </div>

            </div>

          </>
        )}


      </nav>
    </>

  );
}

















/* ================= COMPONENTS ================= */

const NavItem = ({ to, icon, title }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-white/10 hover:backdrop-blur-md border border-transparent hover:border-white/30 transition"
  >
    {icon}
    <span>{title}</span>
  </Link>
);

const DropdownItem = ({ to, title }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-white/10 hover:backdrop-blur-md transition"
  >
    {title}
  </Link>
);

const MobileItem = ({ to, icon, title }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
  >
    {icon && icon}
    <span>{title}</span>
  </Link>
);

export default Navbar;
