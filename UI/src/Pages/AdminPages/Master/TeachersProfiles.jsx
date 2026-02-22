import React, { useState } from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";
import { deactivateAccount } from "./APIS/DeactivateAccount";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function TeachersProfiles() {
    const page = "Teachers";

    const Profiles = [
        {
            name: "Dr. Ananya Sharma",
            designation: "Assistant Professor",
            dept: "CSE",
            empid: "T1201",
            subjects: ["Data Structures", "Algorithms"],
            exp: 8,
            pr_url: "https://randomuser.me/api/portraits/women/50.jpg",
            isonline: false,
            status: "In Class",
            classesToday: 2,
            pendingReviews: 3,
        },
        {
            name: "Mr Ravi Tharun",
            designation: "HOD",
            dept: "CSE",
            empid: "CSE001",
            subjects: ["DBMS", "OS", "Data Structures"],
            exp: 7,
            pr_url: "https://randomuser.me/api/portraits/men/75.jpg",
            isonline: true,
            status: "Available",
            classesToday: 3,
            pendingReviews: 1,
        },
        {
            name: "Mr Ravi Tharun",
            designation: "HOD",
            dept: "CSE",
            empid: "CSE001",
            subjects: ["DBMS", "OS", "Data Structures"],
            exp: 7,
            pr_url: "https://randomuser.me/api/portraits/men/75.jpg",
            isonline: false,
            status: "Available",
            classesToday: 3,
            pendingReviews: 1,
        },
        {
            name: "Mr Ravi Tharun",
            designation: "HOD",
            dept: "CSE",
            empid: "CSE001",
            subjects: ["DBMS", "OS", "Data Structures"],
            exp: 7,
            pr_url: "https://randomuser.me/api/portraits/men/75.jpg",
            isonline: true,
            status: "Available",
            classesToday: 3,
            pendingReviews: 1,
        },
        {
            name: "Mr Ravi Tharun",
            designation: "HOD",
            dept: "CSE",
            empid: "CSE001",
            subjects: ["DBMS", "OS", "Data Structures"],
            exp: 7,
            pr_url: "https://randomuser.me/api/portraits/men/75.jpg",
            isonline: false,
            status: "Available",
            classesToday: 3,
            pendingReviews: 1,
        },
    ];
    const [getTeacherprofiles, setteacherprofile] = useState(Profiles)
    const [searchTeacher, setSerchteacherprofile] = useState([])
    const [Errormessage, seterror] = useState('')

    const handelSerach = (e) => {
        let search = e
        let search_filter = getTeacherprofiles.filter((subj) =>
            subj.name?.toLowerCase().includes(search) || subj.dept?.toLowerCase().includes(search) || subj.designation?.toLowerCase().includes(search))
        setteacherprofile(search_filter)

        if (search_filter.length == 0) {
            seterror(`No Techers Found ${search}`)
        }
        if (search == "") {
            setteacherprofile(Profiles)
        }
    }
    const handelclear = () => {
        setSerchteacherprofile('')
    }
    const HandelAccount = async (id) => {
        Swal.fire(

            {
                title: "Are you sure you want to deactivate this account? The user will lose access until the account is reactivated.",
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: "Deactivate",
                // denyButtonText: ``
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await deactivateAccount(id)
                    if (data.data.message === 'ok') {
                        Swal.fire(
                            "Success!",
                            "Account has been deactivated successfully.",
                            "success"
                        );
                        // toast.success("DeactivateAccount.")
                    }
                } else if (result.isDenied) {
                    Swal.fire(
                        "Cancelled",
                        "The action has been cancelled.",
                        "info"
                    );
                }
            });



    }
    return (
        <>
            <Toaster />

            <div className="min-h-screen flex bg-gray-50">
                <MasterAdminNavbar path={page} />
                <div className="flex-1 flex flex-col min-w-0 w-full">
                    <MasterLogoNav path={page} />
                    <main className="flex-1 mt-[72px] pb-8 px-4 md:px-6 lg:px-8 overflow-y-auto">
                        {/* Header Section */}
                        <div className="mb-6 max-w-5xl mx-auto px-2 md:px-0">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Faculty Overview
                            </h2>
                            <p className="mt-1 text-sm md:text-base text-gray-600">
                                Manage and view details of all faculty members here.
                            </p>
                            <div className="mt-4 border-b border-gray-200"></div>
                        </div>
                        <div className="max-w-md w-full mx-auto mb-6">
                            <input
                                type="text"
                                placeholder="Search faculty..."
                                onChange={(e) => handelSerach(e.target.value)}
                                // value={searchTeacher}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />



                        </div>
                        {!Errormessage ?
                            <button onClick={handelclear}>{Errormessage}</button> : ""
                        }
                        <div className="space-y-4 max-w-5xl mx-auto">
                            {getTeacherprofiles.map((pr, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 lg:p-5 border border-gray-100 w-full group"
                                >
                                    <div className="flex items-start gap-3 flex-1 min-w-0 relative">
                                        <img
                                            src={pr.pr_url}
                                            alt={pr.name}
                                            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-white shadow ring-2 ring-green-100/50 group-hover:ring-green-200/70 transition-all duration-300"
                                        />

                                        <div className="flex flex-col min-w-0 flex-1 py-1">
                                            <div className="flex items-start gap-2 flex-wrap">
                                                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 truncate">{pr.name}</h2>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs lg:text-sm font-medium rounded-full whitespace-nowrap">
                                                    {pr.designation}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2 text-sm text-gray-600">
                                                <p><span className="font-semibold text-gray-900">Dept:</span> <b>{pr.dept}</b></p>
                                                <p><span className="font-semibold text-gray-900">Emp ID:</span> <b>{pr.empid}</b></p>
                                                <p className="md:col-span-2"><span className="font-semibold text-gray-900">Subjects:</span> <b>{pr.subjects.join(", ")}</b></p>
                                                <p><span className="font-semibold text-gray-900">Exp:</span> {pr.exp} yrs</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 mt-4 lg:mt-0 lg:ml-6 w-full sm:w-auto">
                                        <div className="flex flex-col items-end sm:items-start text-sm text-gray-600 font-medium space-y-1">
                                            <span className="flex items-center gap-1">
                                                {pr.isonline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-inner"></span>}
                                                <span className={pr.isonline ? "text-green-600" : "text-red-600"}>
                                                    {pr.isonline ? "Online" : "Offline"}
                                                </span>
                                            </span>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {pr.status} • Classes Today: {pr.classesToday} • Reviews: {pr.pendingReviews}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">

                                            {/* View Profile */}
                                            <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-300 
  bg-white text-gray-700 text-sm font-medium 
  hover:bg-gray-100 hover:border-gray-400 
  transition duration-200 ease-in-out">
                                                View Profile
                                            </button>

                                            {/* Message */}
                                            <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg 
  bg-blue-600 text-white text-sm font-medium 
  hover:bg-blue-700 
  transition duration-200 ease-in-out shadow-sm hover:shadow-md">
                                                Message
                                            </button>

                                            {/* Deactivate */}
                                            <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg 
  bg-red-500 text-white text-sm font-medium 
  hover:bg-red-600 
  transition duration-200 ease-in-out shadow-sm hover:shadow-md" onClick={() => HandelAccount(pr.empid)}>
                                                Deactivate
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </main>
                </div>
            </div>
        </>

    );
}

export default TeachersProfiles;
