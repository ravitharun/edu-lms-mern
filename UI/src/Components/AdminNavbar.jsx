import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";

function AdminNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navbar = [
        { name: "Dashboard", link: "/admin-dashboard", icon: FaHome },
        { name: "Classes", link: "/classes", icon: FaChalkboardTeacher },
        { name: "Assignments", link: "/assignments", icon: FaTasks },
        { name: "Attendance", link: "/attendance", icon: FaCalendarCheck },
        { name: "Students", link: "/students", icon: FaUserGraduate },
        { name: "Profile", link: "/teachers/profile", icon: FaUser },
        { name: "Logout", link: "/teachers/logout", icon: FaSignOutAlt },
    ];

    return (
        <>
            {/* ---------- TOP NAVBAR ---------- */}
            <nav className="w-full bg-white shadow-md px-4 h-14 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-blue-600">Teacher Panel</h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 items-center">
                    {navbar.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <li key={idx}>
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md
                    ${isActive
                                            ? "bg-blue-100 text-blue-600"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    <Icon />
                                    {item.name}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl text-gray-600"
                    onClick={() => setMenuOpen(true)}
                >
                    <FaBars />
                </button>
            </nav>

            {/* ---------- MOBILE SLIDE MENU ---------- */}
            <div
                className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${menuOpen ? "visible" : "invisible"
                    }`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/40 ${menuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setMenuOpen(false)}
                />

                {/* Sidebar */}
                <div
                    className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex items-center justify-between px-4 h-14 border-b">
                        <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
                        <button
                            className="text-xl text-gray-600"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <ul className="flex flex-col py-4">
                        {navbar.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <li key={idx}>
                                    <NavLink
                                        to={item.link}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 text-sm font-medium
                      ${isActive
                                                ? "bg-blue-100 text-blue-600"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`
                                        }
                                    >
                                        <Icon className="text-lg" />
                                        {item.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                        
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AdminNavbar;
