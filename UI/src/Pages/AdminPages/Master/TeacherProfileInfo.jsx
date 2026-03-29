import React from "react";
import { Toaster } from "react-hot-toast";
import AdminHeader from "../../../Components/AdminHeader";
import { Link, useLocation } from "react-router-dom";

function TeacherProfileInfo() {
    const location = useLocation();
    const data = location.state?.data;
    console.log(data?.AccountStatus, 'data?.AccountStatus')
    return (
        <>
            <Toaster />

            <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8 space-y-6">

                <AdminHeader pathname="Teacher Profile" />

                {/* Back Button */}
                <div>
                    <Link to="/admin/Teachers">
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                            ← Back
                        </button>
                    </Link>
                </div>

                {/* Profile Card */}
                <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                        {/* Profile Image */}
                        <img
                            src={data?.profilePreview}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                        />

                        {/* Basic Info */}
                        <div className="flex-1 text-center md:text-left space-y-2">

                            <h2 className="text-2xl font-bold text-gray-800">
                                {data?.name}
                            </h2>

                            <p className="text-gray-600">{data?.email}</p>

                            <p className="text-sm text-gray-500">
                                Teacher ID:{" "}
                                <span className="font-semibold text-gray-700">
                                    {data?.teacher_Id}
                                </span>
                            </p>

                            {/* Status Badge */}
                            <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">

                                <p className="text-gray-600 font-medium">
                                    Account Status
                                </p>

                                <span
                                    className={`px-4 py-1 rounded-full text-sm font-semibold ${!data?.AccountStatus
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {!data?.AccountStatus ? "Active" : "Deactivated"}
                                </span>
                               

                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-500">Department</p>
                            <p className="font-semibold text-gray-800">
                                {data?.department}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-semibold text-gray-800">
                                {data?.role}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-500">Created At</p>
                            <p className="font-semibold text-gray-800">
                                {new Date(data?.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-500">Updated At</p>
                            <p className="font-semibold text-gray-800">
                                {new Date(data?.updatedAt).toLocaleDateString()}
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default TeacherProfileInfo;
