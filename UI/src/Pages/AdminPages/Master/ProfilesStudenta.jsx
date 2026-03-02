import React, { useEffect, useState } from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";
import Dataloading from "../../../Loaders/Dataloading";
import { GetallStudentsProfile } from "./APIS/GetAll-subjects";
import "../../../../../UI/src/App.css";

function ProfilesStudenta() {
    const StudentsProfileHeadings = [

        "Id",
        "Student Name",
        "Department",
        "Status",
        "Enorlled Date",
        "Enorlled Time",
        "StudentsYear",
        // "Actions",

    ]
    const [students, setStudents] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const getStudents = async () => {
            try {
                setLoader(true);
                const response = await GetallStudentsProfile();
                console.log(response, 'students')
                setStudents(response?.data?.message || []);
            } catch (error) {
                console.log("Error fetching students:", error);
                setStudents([]);
            } finally {
                setLoader(false);
            }
        };

        getStudents();
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Sidebar */}
            <MasterAdminNavbar path="Students" />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 w-full">

                {/* Top Navbar */}
                <MasterLogoNav path="Students" />

                {/* Content */}
                <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-6">

                        {/* Students Overview */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Students Overview
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage and view details of all students here.
                            </p>
                        </div>

                        {/* Students Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                            <table className="min-w-[900px] w-full border-collapse">

                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        {StudentsProfileHeadings.map((heading, idx) => (
                                            <th
                                                key={idx}
                                                className="p-3 text-left whitespace-nowrap"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {loader ? (
                                        <tr>
                                            <td
                                                colSpan={StudentsProfileHeadings.length}
                                                className="h-40"
                                            >
                                                <div className="flex justify-center items-center h-40">
                                                    <Dataloading path="Fetching Students Data..." />
                                                </div>
                                            </td>
                                        </tr>
                                    ) : students.length > 0 ? (
                                        students.map((item, index) => (
                                            <tr
                                                key={item._id || index}
                                                className="border-b hover:bg-gray-50 text-center"
                                            >
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{item.name}</td>
                                                <td className="p-3">{item.department}</td>

                                                <td className="p-3">
                                                    {(() => {
                                                        const isActive = !item.AccountStatus;

                                                        const baseStyle =
                                                            "px-3 py-1 text-xs font-semibold rounded-full";

                                                        const statusStyle = isActive
                                                            ? "bg-green-100 text-green-700 blink-green"
                                                            : "bg-red-100 text-red-700 blink-red";

                                                        return (
                                                            <span className={`${baseStyle} ${statusStyle}`}>
                                                                {isActive ? "🟢 Active" : "🔴 Deactive"}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td className="p-3">{new Date(item.createdAt).toLocaleTimeString()}</td>
                                                <td className="p-3">
                                                    {item?.StudentsYearDepartment?.split(" ")?.[1] || "Null"}
                                                </td>                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={StudentsProfileHeadings.length}
                                                className="text-center p-6 text-gray-500"
                                            >
                                                No Students Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default ProfilesStudenta;