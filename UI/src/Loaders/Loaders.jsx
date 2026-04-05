
import React from "react";
import { FiLoader } from "react-icons/fi";
import {
    FaUserShield,
    FaChalkboardTeacher,
    FaUserGraduate,
} from "react-icons/fa";

function Loaders({ pathname = "Student", userName = "", sec = 0 }) {
    console.log(userName)
    const isAdmin = pathname === "Admin";
    const isTeacher = pathname === "Teacher";

    const roleConfig = isAdmin
        ? {
            title: "Admin Dashboard",
            subtitle: "Loading analytics, controls, and workspace...",
            icon: <FaUserShield className="text-sky-400 text-2xl" />,
            glow: "from-sky-500/20 via-blue-500/10 to-cyan-400/20",
            ring: "border-sky-400/40",
            accent: "text-sky-400",
        }
        : isTeacher
            ? {
                title: "Teacher Dashboard",
                subtitle: "Preparing classes, lessons, and teaching tools...",
                icon: <FaChalkboardTeacher className="text-violet-400 text-2xl" />,
                glow: "from-violet-500/20 via-fuchsia-500/10 to-purple-400/20",
                ring: "border-violet-400/40",
                accent: "text-violet-400",
            }
            : {
                title: "Student Dashboard",
                subtitle: "Getting courses, progress, and resources ready...",
                icon: <FaUserGraduate className="text-emerald-400 text-2xl" />,
                glow: "from-emerald-500/20 via-teal-500/10 to-cyan-400/20",
                ring: "border-emerald-400/40",
                accent: "text-emerald-400",
            };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white flex items-center justify-center px-4">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.10),_transparent_30%)]" />

            {/* Blur orbs */}
            <div className="absolute top-16 left-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-16 right-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl animate-pulse" />

            {/* Main card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/30">
                    {/* Top glow strip */}
                    <div
                        className={`h-1 w-full bg-gradient-to-r ${roleConfig.glow}`}
                    ></div>

                    <div className="px-8 py-10 flex flex-col items-center text-center">
                        {/* Icon + animated ring */}
                        <div className="relative mb-6">
                            <div
                                className={`absolute inset-0 rounded-full border ${roleConfig.ring} animate-ping`}
                            ></div>
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-lg">
                                {roleConfig.icon}
                            </div>
                        </div>

                        {/* Loader */}
                        <div className="relative mb-5">
                            <div className="absolute inset-0 rounded-full bg-white/10 blur-md"></div>
                            <FiLoader
                                className={`relative text-4xl animate-spin ${roleConfig.accent}`}
                            />
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                            <span className="block">Hey! {userName}</span>
                            <span className="block text-lg font-medium text-slate-300">
                                Loading {roleConfig.title}
                            </span>
                        </h2>

                        {/* Subtitle */}
                        <p className="mt-3 text-sm leading-6 text-slate-300 max-w-xs">
                            {roleConfig.subtitle}
                        </p>

                        {/* Progress line */}
                        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-white/40 via-white/80 to-white/40 transition-all duration-500"
                                style={{ width: `${sec * 10}%` }}
                            ></div>
                        </div>

                        {/* Timer */}
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
                            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                            {sec}s elapsed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loaders;