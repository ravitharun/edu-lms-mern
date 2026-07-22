

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PiExamFill } from "react-icons/pi";
import {
    FaHome,
    FaChalkboardTeacher,
    FaTasks,
    FaCalendarCheck,
    FaUserGraduate,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaBell,
    FaUpload,
    FaRegCalendarTimes,
    FaRegCalendarAlt,
    FaPenAlt,
} from "react-icons/fa";
import { handleLogout, UserRole } from "../Apis/Islogin";

function AdminSidebar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navbar = [
        { name: "Dashboard", link: "/teacher-dashboard", icon: FaHome },
        { name: "Classes", link: "/classes", icon: FaChalkboardTeacher },
        { name: "Upload Material", link: "/Upload-Material", icon: FaUpload },
        { name: "Assignments", link: "/assignments", icon: FaTasks },
        { name: "Attendance", link: "/attendance", icon: FaCalendarCheck },
        { name: "Students", link: "/students", icon: FaUserGraduate },
        { name: "Marks", link: "/StudentMarks", icon: PiExamFill  },
        { name: "Create Exams", link: "/exam", icon: FaPenAlt },
        { name: "Profile", link: "/teachers/profile", icon: FaUser },
        { name: "Manage Academic Calendar", link: "/teacher/Academic-Calendar", icon: FaCalendarCheck },
        { name: "ApplyLeave", link: "/teachers/ApplyLeave", icon: FaRegCalendarTimes },
        { name: "Leave Requests", link: "/teachers/ApplyLeaveAccept", icon: FaRegCalendarAlt },
        { name: "Logout", icon: FaSignOutAlt },
    ];

    return (
        <>
            {/* ================= MOBILE TOP BAR ================= */}
            <div className="md:hidden flex items-center justify-between h-14 px-4 bg-white border-b">
                <Link to="/teacher-dashboard">
                    <h1 className="text-lg font-semibold text-blue-600 hover:text-black">
                        Teacher Panel
                    </h1>
                </Link>
                <button
                    onClick={() => setMenuOpen(true)}
                    className="text-2xl text-gray-600"
                >
                    <FaBars />
                </button>
            </div>

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col bg-white border-r">

                {/* HEADER */}
                <div className="h-14 flex items-center px-6 border-b flex-shrink-0">
                    <h1 className="text-xl font-bold text-blue-600"></h1>
                </div>

                {/* PROFILE */}
                <div className="mt-4 px-4 flex-shrink-0">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">

                        <div className="flex items-center gap-3">
                            <img
                                src={`${UserName?.profilePreview || `https://ui-avatars.com/api/?name=${UserName?.name}`}`}
                                alt="Profile"
                                 loading="lazy"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="leading-tight space-y-1">
                                <p className="text-xs text-gray-500">
                                    Hello, <span className="font-medium">Mr.</span>
                                </p>

                                <p className="text-sm font-semibold text-gray-800 leading-none">
                                    {UserName?.name}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>Assistant Professor</span>
                                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px]">
                                        ID: {UserName?.teacher_Id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative cursor-pointer">
                            <FaBell className="text-lg text-gray-600 hover:text-blue-600" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </div>
                    </div>
                </div>

                {/* NAV (SCROLLABLE + HIDDEN SCROLLBAR) */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
                    {navbar.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={idx}
                                to={item.link}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                                    ${isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                <Icon className="text-lg" />
                                {item.name === 'Logout' ? (
                                    <button onClick={handleLogout}>{item.name}</button>
                                ) : (
                                    item.name
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>

            {/* ================= MOBILE SIDEBAR ================= */}
            <div
                className={`fixed inset-0 z-50 md:hidden ${menuOpen ? "visible" : "invisible"}`}
            >
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setMenuOpen(false)}
                />

                <div
                    className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex items-center justify-between h-14 px-4 border-b">
                        <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
                        <button onClick={() => setMenuOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    <nav className="p-4 space-y-1">
                        {navbar.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={idx}
                                    to={item.link}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                                        ${isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    <Icon />
                                    {item.name === 'Logout' ? (
                                        <button onClick={handleLogout}>{item.name}</button>
                                    ) : (
                                        item.name
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
}

export default AdminSidebar;