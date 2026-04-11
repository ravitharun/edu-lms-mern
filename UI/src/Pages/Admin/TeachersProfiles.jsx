import React, { useEffect, useState } from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";
import { deactivateAccount } from "./APIS/DeactivateAccount";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllTeacherName, GetallTeacherProfile } from "./APIS/GetAll-subjects";
;
import { useNavigate } from "react-router-dom";
import Dataloading from "../../Loaders/Dataloading";
import AccountLoader from "../../Loaders/AccountLoader";

function TeachersProfiles() {
    const page = "Teachers";
    const [getTeacherprofiles, setteacherprofile] = useState([])
    const [searchTeacher, setSerchteacherprofile] = useState([])
    const [Errormessage, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const [Page, setpage] = useState(1);
    const [length, setlength] = useState(1);
    const [accountLoading, setaccountLoading] = useState(false)


    useEffect(() => {
        const GetallTechers = async () => {
            try {
                setloading(true)
                const response = await GetallTeacherProfile(Page)
                console.log(response.data.message, "response.data.message")
                setteacherprofile(response.data.message)
                setlength(response.data.length)
                setloading(false)
            } catch (error) {
                toast.error(error)

            }

        }
        GetallTechers()
    }, [Page])

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
        try {
            setaccountLoading(true)

            const data = await deactivateAccount(id, "")



        } catch (error) {
            console.log(error, 'error')
            toast.error("Some thing Went Wrong.")
        }
        finally { setaccountLoading(false) }



    }


    const HandelAccountActivate = async (id, action = "Update") => {
        try {
            setaccountLoading(true)


            const data = await deactivateAccount(id, action)

        } catch (error) {
            toast.error(error.message)
        }
        finally { setaccountLoading(false) }

    }
    const navigate = useNavigate("")
    const handelView = (data) => {
        navigate("/TecherProfile/Info", {
            state: {
                data
            }
        })

    }
    console.log(accountLoading, 'accountLoading1')
    return (
        <>
            {accountLoading ? <AccountLoader /> : null}
            <Toaster />
            <div className="min-h-screen flex bg-gray-50">
                <MasterAdminNavbar path={page} />
                <div className="flex-1 flex flex-col min-w-0 w-full">
                    <MasterLogoNav path={page} />
                    <main className="flex-1 mt-[72px] pb-8 px-4 md:px-6 lg:px-8 overflow-y-auto">
                        {/* Header Section */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Faculty Overview
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage and view details of all faculty members here.
                            </p>
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
                            {loading ? (
                                <Dataloading />
                            ) : (
                                getTeacherprofiles.map((pr, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col lg:flex-row justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100 w-full"
                                    >
                                        {/* LEFT SECTION */}
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <img
                                                src={pr.profilePreview}
                                                alt={pr.name}
                                                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow ring-2 ring-green-100 transition"
                                            />

                                            <div className="flex flex-col flex-1 min-w-0">
                                                {/* Name + Role */}
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h2 className="text-xl font-semibold text-gray-900 truncate">
                                                        {pr.name}
                                                    </h2>
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                        {pr.role}
                                                    </span>
                                                </div>

                                                {/* Details Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                                                    <p>
                                                        <span className="font-semibold text-gray-900">Dept:</span>{" "}
                                                        <b>{pr.department}</b>
                                                    </p>

                                                    <p>
                                                        <span className="font-semibold text-gray-900">Emp ID:</span>{" "}
                                                        <b>{pr.teacher_Id}</b>
                                                    </p>

                                                    <p className="md:col-span-2">
                                                        <span className="font-semibold text-gray-900">Subjects:</span>{" "}
                                                        <b>{pr?.subjects?.join(", ")}</b>
                                                    </p>

                                                    <p>
                                                        <span className="font-semibold text-gray-900">Exp:</span>{" "}
                                                        {pr?.exp || 0} yrs
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT SECTION */}
                                        <div className="flex flex-col items-end justify-between mt-5 lg:mt-0 lg:ml-6 min-w-[220px]">

                                            {/* Status Section */}
                                            <div className="flex flex-col items-end gap-2 text-sm font-medium">

                                                {/* Online Status */}
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`w-2.5 h-2.5 rounded-full ${pr?.isActive ? "bg-green-500" : "bg-red-500"
                                                            }`}
                                                    ></span>
                                                    <span
                                                        className={
                                                            pr?.isActive ? "text-green-600" : "text-red-600"
                                                        }
                                                    >
                                                        {pr?.isActive ? "Online" : "Offline"}
                                                    </span>
                                                    {pr?.isActive == false &&
                                                        <span
                                                            className={
                                                                "text-red-600"
                                                            }
                                                        >
                                                            { new Date(pr.lastSeen ||  new Date()).toUTCString() }
                                                            {/* {pr?.lastSeen ? new Date(pr.lastSeen).toGMTString() : new Date()} */}
                                                        </span>}
                                                </div>

                                                {/* Account Status */}
                                                {pr?.AccountStatus && (
                                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                                                        Account Deactivated
                                                    </span>
                                                )}

                                                {/* Stats */}
                                                <span className="text-xs text-gray-500 text-right">
                                                    {pr?.status} • Classes Today: {pr?.classesToday} • Reviews:{" "}
                                                    {pr?.pendingReviews}
                                                </span>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex flex-wrap gap-3 mt-4 w-full justify-end">
                                                <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 transition duration-200"
                                                    onClick={() => handelView(pr)}
                                                >
                                                    View Profile
                                                </button>

                                                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md">
                                                    Message
                                                </button>
                                                {pr?.AccountStatus ?
                                                    <button
                                                        className="px-4 py-2 rounded-lg bg-gray-400 text-white text-sm font-medium cursor-pointer hover:bg-green-500"
                                                        title="You can The Activate Account"
                                                        onClick={() => HandelAccountActivate(pr.teacher_Id)}              >
                                                        Activate
                                                    </button>
                                                    :
                                                    <button
                                                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition duration-200 shadow-sm hover:shadow-md"
                                                        onClick={() => HandelAccount(pr.teacher_Id)}
                                                    >
                                                        Deactivate
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </main>
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {/* Previous Button */}
                        <button
                            onClick={() => setpage(prev => Math.max(prev - 1, 1))}
                            className={`px-3 py-1 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 transition ${Page == 1 ? "cursor-not-allowed" : ""}`}
                        >
                            Prev
                        </button>

                        {/* Page Numbers */}
                        {[...Array(length)].map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = Page === pageNum;

                            return (
                                <button
                                    key={i}
                                    onClick={() => setpage(pageNum)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200
          ${isActive
                                            ? "bg-blue-500 text-white shadow-md scale-105"
                                            : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                                        }`}
                                >
                                    {pageNum === length ? "Last" : pageNum}
                                </button>
                            );
                        })}

                        {/* Next Button */}
                        <button
                            onClick={() => setpage(prev => Math.min(prev + 1, length))}
                            className={`px-3 py-1 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 transition ${length == Page ? "cursor-not-allowed" : ""}`}
                        >
                            Next
                        </button>

                    </div>
                </div>

            </div>

        </>

    );
}

export default TeachersProfiles;
