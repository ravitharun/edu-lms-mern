import React from "react";
import { Mail, BadgeCheck, Building2, UserCircle2 } from "lucide-react";

function TeacherInfo() {
    const teacherData = {
        name: "Ravi Tharun Kumar",
        email: "ravitharun@gmail.com",
        teacherId: "TEACHER-6960",
        role: "Teacher",
        department: "ECE",
        accountStatus: false,
        profileImage:
            "https://res.cloudinary.com/dqckm1xhq/image/upload/v1774577633/hioajyri15eteytjnt3a.jpg",
        joinedOn: "27 Mar 2026",
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />

                <div className="px-6 pb-6">
                    <div className="-mt-14 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4">
                            <img
                                src={teacherData.profileImage}
                                alt={teacherData.name}
                                className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md"
                            />

                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {teacherData.name}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {teacherData.role} • {teacherData.department} Department
                                </p>
                            </div>
                        </div>

                        <span
                            className={`rounded-full px-4 py-2 text-sm font-semibold ${teacherData.accountStatus
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                        >
                            {teacherData.accountStatus ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center gap-3">
                                <UserCircle2 className="text-blue-600" size={20} />
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Teacher ID</p>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {teacherData.teacherId}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center gap-3">
                                <Mail className="text-blue-600" size={20} />
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Email</p>
                                    <p className="text-sm font-semibold text-slate-800 break-all">
                                        {teacherData.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center gap-3">
                                <BadgeCheck className="text-blue-600" size={20} />
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Role</p>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {teacherData.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center gap-3">
                                <Building2 className="text-blue-600" size={20} />
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Department</p>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {teacherData.department}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-500">Joined On</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                            {teacherData.joinedOn}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherInfo;