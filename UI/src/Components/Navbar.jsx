import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                                LMS
                            </div>
                            <span className="text-lg font-semibold text-gray-800">
                                Student Portal
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/">
                            <NavItem title="Dashboard" />
                        </Link>
                        <Link to="/my-course">
                            <NavItem title="My Courses" />
                        </Link>

                        {/* Academics Dropdown */}
                        <Dropdown title="Academics">


                            <Link to="/Exam-Schedule">
                                <DropdownItem title="Exam Schedule" />

                            </Link>
                            <Link to="/Class-Timings">
                                <DropdownItem title="Class Timings" />
                            </Link>
                            <Link to="/Schedule-Timetable">
                                <DropdownItem title="Schedule / Timetable" />
                            </Link>
                        </Dropdown>

                        {/* Exams & Results Dropdown */}
                        <Dropdown title="Exams & Results">
                            <Link to="/OnlineExams-Tests" >
                                <DropdownItem title="Online Exams / Tests" />
                            </Link>
                            <Link to="/results">
                                <DropdownItem title="Results" />
                            </Link>
                            <Link to="/grades">
                                <DropdownItem title="Grades / GPA / CGPA" />
                            </Link>
                        </Dropdown>
                        <Link to="/studyMaterials">
                            <NavItem title="Study Materials" />
                        </Link>
                        <Link to="/StudentProfile">
                            <NavItem title="Profile" />
                        </Link>

                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t shadow-sm">
                    <div className="flex flex-col px-4 py-3 space-y-3">
                        <Link to="/">
                            <MobileItem title="Dashboard" />
                        </Link>
                        <Link to="/my-course">
                            <MobileItem title="My Courses" />
                        </Link>
                        <Link to="/Schedule-Timetable">
                            <MobileItem title="Schedule / Timetable" />
                        </Link>
                        <Link to="/OnlineExams-Tests" >
                            <MobileItem title="Exams / Tests" />
                        </Link>
                        <Link to="/StudentProfile">
                            <MobileItem title="Results & Grades" />
                        </Link>
                        <Link to="/StudyMaterials">
                            <MobileItem title="Study Materials" />
                        </Link>
                        <Link to="/StudentProfile">
                            <MobileItem title="Profile" />
                        </Link>

                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

/* Reusable Components */

const NavItem = ({ title }) => (
    <button className="text-gray-700 font-medium hover:text-blue-600 transition">
        {title}
    </button>
);

const Dropdown = ({ title, children }) => (
    <div className="relative group">
        <button className="text-gray-700 font-medium hover:text-blue-600 transition">
            {title}
        </button>
        <div className="absolute left-0 mt-2 w-52 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
            {children}
        </div>
    </div>
);

const DropdownItem = ({ title }) => (
    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
        {title}
    </button>
);

const MobileItem = ({ title }) => (
    <button className="text-left text-gray-700 font-medium hover:text-blue-600 transition">
        {title}
    </button>
);

export default Navbar;
