import React, { useEffect, useState } from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";
import Dataloading from "../../Loaders/Dataloading.jsx";
import { GetallStudentsProfile } from "./APIS/GetAll-subjects";

import "../../../../UI/src/App.css"
import toast, { Toaster } from "react-hot-toast";


import { MaintanceMode } from "../../Apis/Islogin.js";
import Undermanitance from "../../Loaders/Undermanitance.jsx";

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
    const [searchFillterArray, setsearchFillterArray] = useState([])
    const [SearchFilters, setsearchFilters] = useState("")
    const [SearchError, setsearchError] = useState("")

    const [length, setlength] = useState(1)
    const [Page, setPage] = useState(1)

    useEffect(() => {
        const getStudents = async () => {
            try {
                setLoader(true);
                const response = await GetallStudentsProfile(Page);
                setStudents(response?.data?.message || []);
                setlength(response?.data?.TotalDocument || 1);
                setsearchFillterArray(response?.data?.message || []);
            } catch (error) {
                console.log("Error fetching students:", error);
                setStudents([]);
            } finally {
                setLoader(false);
            }
        };

        getStudents();
    }, [Page]);



    const Years = ["1", "2", "3", "4"]



    const HandelSearch = (text) => {

        // If search empty → show all students
        if (!text.trim()) {
            console.log("hi")
            setStudents(searchFillterArray);  // keep original data separately
            setsearchError("");
            return;
        }

        const filteredStudents = students.filter((item) => {
            const searchText = text.toLowerCase();

            return (
                item.name?.toLowerCase().includes(searchText) ||
                item.email?.toLowerCase().includes(searchText) ||
                item.department?.toLowerCase().includes(searchText) ||
                item.StudentsYearDepartment
                    ?.split(" ")[1]
                    ?.toLowerCase()
                    .includes(searchText) ||
                item.Student_ID?.toString().includes(text)
            );
        });

        if (filteredStudents.length === 0) {
            setsearchError("NOT FOUND.");
        } else {
            setsearchError("");
        }

        setStudents(filteredStudents);
    };

    const HandelFilterYear = (e) => {

        if (e === "ALL") {
            setStudents(searchFillterArray);  // original data
            return;  // 🔥 stop execution here
        }

        const YearFilter = searchFillterArray.filter((item) => {
            return item.StudentsYearDepartment
                ?.split(" ")[1]   // ⚠ year should usually be index 0
                ?.toLowerCase()
                .includes(e.toLowerCase());
        });

        setStudents(YearFilter);
    };
    const HandelFilterStatus = (e) => {
        let value = ""
        if (e === "ALL") {
            setStudents(searchFillterArray);  // original data
            return;  // 🔥 stop execution here
        }
        else if (e == "Active") {
            value = true
        }
        else {
            value = false
        }
        const StatusFilter = searchFillterArray.filter((item) => {
            return item.AccountStatus == !value || item.AccountStatus == !value
        });

        setStudents(StatusFilter);
    };

    const HandelDept = (data) => {
        if (data == "ALL") {
            setStudents(searchFillterArray);  // original data
            return
        }
        const FillterByDept = students.filter((dept) => {
            return dept?.department.includes(data)
        })
        setStudents(FillterByDept);

    }
    const ClearFilter = () => {
        HandelDept("")
        setStudents(searchFillterArray);  // keep original data separately
    }
    return (
        <>
        <Toaster></Toaster>
            {MaintanceMode ?<Undermanitance />:
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
                            {/* Filter Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100">

                                {/* Top Header */}
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-700">
                                        Student Filters
                                    </h2>

                                    <button
                                        className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 
      rounded-lg transition-all duration-200"
                                        onClick={ClearFilter}
                                    >
                                        Clear Filters
                                    </button>
                                </div>

                                {/* Search + Filters */}
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

                                    {/* Search */}
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm text-gray-500">Search</label>

                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                onChange={(e) => HandelSearch(e.target.value)}
                                                // value={SearchFilters}
                                                placeholder="Name, ID, Email..."
                                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl
      focus:ring-2 focus:ring-blue-500 focus:outline-none
      transition-all duration-200"
                                            />

                                            {SearchFilters && (
                                                <button
                                                    onClick={() => setsearchFilters("")}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2
        text-gray-400 hover:text-red-500 text-sm font-semibold"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Year Filter */}
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm text-gray-500">Year</label>
                                        <select
                                            className="px-4 py-2 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-blue-500 focus:outline-none
        transition-all duration-200"
                                            onChange={(e) => HandelFilterYear(e.target.value)}
                                        >
                                            <option value="ALL">ALL</option>
                                            {Years.map((yr, idx) => (
                                                <option value={yr} key={idx}>{yr}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Status Filter */}
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm text-gray-500">Status</label>
                                        <select
                                            className="px-4 py-2 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-blue-500 focus:outline-none
        transition-all duration-200"
                                            onChange={(e) => HandelFilterStatus(e.target.value)}
                                        >
                                            <option value="" selected disabled>Choose Status</option>
                                            {["ALL", "Active", "Deactive"].map((sts, idx) => (
                                                <option value={sts} key={idx}>{sts}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Department Filter */}
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm text-gray-500">Department</label>
                                        <select
                                            className="px-4 py-2 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-blue-500 focus:outline-none
        transition-all duration-200"

                                            onChange={(e) => HandelDept(e.target.value)}
                                        >
                                            <option value=" " selected disabled>Choose Department</option>
                                            {["ALL", "CSE", "MECH", "ECE", "EEE", "Civil"].map((dep, idx) => (
                                                <option value={dep} key={idx}>{dep}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
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
                                        {SearchError && <>

                                            <div>
                                                {SearchError}
                                            </div>
                                        </>}
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
                    <div className="flex justify-center items-center gap-2  mb-5 mt-5">

                        {/* Previous Button */}
                        {Page <= 1 ? <button
                            onClick={() => setPage(prev => Math.min(prev + 1, length))}
                            className={`px-3 py-1 text-sm font-medium rounded-md  transition ${Page == Page && 'bg-blue-500 hover:bg-blue-400 text-white '}`}
                        >
                            Next
                        </button> : <>

                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                className={`px-3 py-1 text-sm font-medium rounded-md  transition ${Page == Page && 'bg-blue-500 hover:bg-blue-400 text-white'}`}
                            >
                                Prev
                            </button>

                            <button
                                onClick={() => setPage(prev => Math.min(prev + 1, length))}
                                className={`px-3 py-1 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 transition ${Page == length && 'cursor-not-allowed'} `}
                                disabled={Page == length}
                            >
                                Next
                            </button>
                        </>}
                        {/* <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            Prev
                        </button> */}

                        {/* Page Numbers */}
                        {/* {[...Array(length)].map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = Page === pageNum;

                            return (
                                <button
                                    key={i}
                                    onClick={() => setPage(pageNum)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200
          ${isActive
                                            ? "bg-blue-500 text-white shadow-md scale-105"
                                            : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                                        }`}
                                >
                                    {pageNum === length ? "Last" : pageNum}
                                </button>
                            );
                        })} */}

                        {/* Next Button */}
                        {/* <button
                            onClick={() => setPage(prev => Math.min(prev + 1, length))}
                            className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            Next
                        </button> */}

                    </div>

                </div>
            </div>}
        </>

    );
}

export default ProfilesStudenta;