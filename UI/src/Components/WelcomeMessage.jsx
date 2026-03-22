import React, { useEffect, useState } from "react";
import { UserName } from "../Apis/Islogin";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"
function WelcomeMessage() {
    const name = UserName?.name || "Tharun Kumar";
    const role = UserName?.role || "Teacher";
    


    return (
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between transition hover:shadow-lg">

            {/* Left */}
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                        {name}
                    </span>{" "}
                    👋
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    {role === "Admin"
                        ? "Admin Management Dashboard"
                        : "Teacher Course Dashboard"}
                </p>

                <span
                    className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full
          ${role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {role}
                </span>
            </div>

            {/* Right */}
            <div className="flex gap-3 mt-4 md:mt-0">
                <Link to="/Admin/AssiginSubjects">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                        View Courses
                    </button>
                </Link>

                {role === "Admin" && (
                    <Link to="/admin/Teachers" >

                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
                            Manage Users
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default WelcomeMessage;