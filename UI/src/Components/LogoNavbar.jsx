import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FiUser,
    FiLogOut,
    FiLock,
    FiChevronDown,
    FiMenu,
    FiX,
    FiChevronUp,
} from "react-icons/fi";

function LogoNavbar() {
    const [openProfile, setOpenProfile] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);

    return (
    
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* LEFT: Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                        LMS
                    </div>
                    <span className="hidden sm:block text-lg font-semibold text-gray-800">
                        Student Portal
                    </span>
                </Link>

                {/* RIGHT: Desktop Profile */}
                <div className="hidden md:flex items-center gap-4 relative">
                    <button
                        onClick={() => setOpenProfile((prev)=>!prev)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                        <FiUser className="text-gray-700" />
                        <span className="text-sm font-medium text-gray-700">
                            HI,  Ravi Tharun
                        </span>
                        {openProfile ? <FiChevronUp className="text-gray-500"/>: <FiChevronDown className="text-gray-500" />}
                    </button>

                    {/* Profile Dropdown */}
                    {openProfile && (
                        <div className="absolute right-0 top-12 w-44 rounded-lg bg-white shadow-lg ">
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                            >
                                <FiUser /> Profile
                            </Link>

                            <Link
                                to="/change-password"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                            >
                                <FiLock /> Change Password
                            </Link>

                            <button
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpenMobile(!openMobile)}
                >
                    {openMobile ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {openMobile && (
                <div className="md:hidden border-t bg-white shadow">
                    <div className="flex flex-col gap-2 px-4 py-4">

                        <Link
                            to="/profile"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-indigo-50"
                        >
                            <FiUser /> Profile
                        </Link>

                        <Link
                            to="/change-password"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-indigo-50"
                        >
                            <FiLock /> Change Password
                        </Link>

                        <button
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                        >
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default LogoNavbar;
