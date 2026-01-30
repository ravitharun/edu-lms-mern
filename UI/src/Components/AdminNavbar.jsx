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
    FaBell,
} from "react-icons/fa";

function AdminSidebar() {
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
            {/* ================= MOBILE TOP BAR ================= */}
            <div className="md:hidden flex items-center justify-between h-14 px-4 bg-white border-b">
                <h1 className="text-lg font-semibold text-blue-600">
                    Teacher Panel
                </h1>
                <button
                    onClick={() => setMenuOpen(true)}
                    className="text-2xl text-gray-600"
                >
                    <FaBars />
                </button>
            </div>

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col bg-white border-r">
                <div className="h-14 flex items-center px-6 border-b">
                    <h1 className="text-xl font-bold text-blue-600">
                        Teacher Panel
                    </h1>
                </div>
                <div className="mt-10 px-4">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">

                        {/* Left: Profile */}
                        <div className="flex items-center gap-3">
                            <img
                                src="https://ui-avatars.com/api/?name=Tharun+Kumar"
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="leading-tight">
                                <p className="text-xs text-gray-500">
                                    Hello, <span className="font-medium">Mr.</span>
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    Tharun Kumar
                                </p>
                            </div>
                        </div>

                        {/* Right: Notification */}
                        <div className="relative cursor-pointer">
                            <FaBell className="text-lg text-gray-600 hover:text-blue-600" />
                            {/* Notification dot */}
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
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
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>

            {/* ================= MOBILE SIDEBAR ================= */}
            <div
                className={`fixed inset-0 z-50 md:hidden ${menuOpen ? "visible" : "invisible"
                    }`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setMenuOpen(false)}
                />

                {/* Sidebar */}
                <div
                    className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex items-center justify-between h-14 px-4 border-b">
                        <h2 className="text-lg font-semibold text-blue-600">
                            Menu
                        </h2>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-xl text-gray-600"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="mt-10 px-4">
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">

                            {/* Left: Profile */}
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://ui-avatars.com/api/?name=Tharun+Kumar"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />

                                <div className="leading-tight">
                                    <p className="text-xs text-gray-500">
                                        Hello, <span className="font-medium">Mr.</span>
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Tharun Kumar
                                    </p>
                                </div>
                            </div>

                            {/* Right: Notification */}
                            <div className="relative cursor-pointer">
                                <FaBell className="text-lg text-gray-600 hover:text-blue-600" />
                                {/* Notification dot */}
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </div>
                        </div>
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
                                    <Icon className="text-lg" />
                                    {item.name}
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
