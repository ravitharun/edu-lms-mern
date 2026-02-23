
import React, { useState } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import "../Pages/AccountDeactivated.css";
import { Link } from "react-router-dom";
import { Header_Token_expry, UserName } from "../Apis/Islogin";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import axios from "axios";


function AccountDeactivated() {
    const [poup, setpoup] = useState(false)
    const [issuetype, settype] = useState("")



    const [Reason, setReason] = useState("")
    const handelRequest = async () => {
        console.log(Header_Token_expry, 'Header_Token_expry')

        if (!Reason) {
            toast.error("please enter required Felids")
        }
        const promise = axios.post("http://localhost:5001/api/Account/UpdateReason", { name: UserName.name, email: UserName.email, empid: UserName.teacher_Id, Reason }, Header_Token_expry)
        toast.promise(promise, {

            loading: "Submitting your request...",
            success: "Request submitted successfully. The admin will review it shortly.",
            error: "Failed to submit request. Please try again."
        })
        setpoup(false)
        setReason("")
    }
    const issueOptions = [
        { value: "account_deactivation", label: "Account Deactivation" },
        { value: "account_reactivation", label: "Account Reactivation Request" },
        { value: "login_issue", label: "Login Problem" },
        { value: "profile_issue", label: "Profile Update Issue" },
        { value: "course_issue", label: "Course Upload Issue" },
        { value: "technical_bug", label: "Technical Bug" },
        { value: "other", label: "Other" }
    ];
    return (
        <>
            <ToastContainer />
            <Toaster />
            <div className="deactivate-wrapper">
                <div className="deactivate-card">

                    {/* Icon */}
                    <div className="icon-wrapper">
                        <ShieldExclamationIcon className="icon" />
                    </div>

                    {/* Title */}
                    <h1 className="title">Account Deactivated</h1>

                    {/* Description */}
                    <p className="description">
                        Your account has been deactivated and you currently do not have access
                        to the Learning Management System.
                    </p>

                    <div className="info-box">
                        <p>
                            Please contact your institution administrator for further assistance
                            or to request account reactivation.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="button-group">
                        <Link to="/login">          <button className="btn secondary">Back to Login</button></Link>
                        <button className="btn primary" onClick={() => setpoup(true)}>Contact Administrator</button>
                    </div>

                </div>
            </div>

            {poup && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">

                        <div className="w-[400px] bg-white shadow-2xl rounded-2xl border border-gray-200 p-6 pointer-events-auto">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Contact Administrator
                                </h2>
                                <button
                                    onClick={() => setpoup(false)}
                                    className="text-gray-400 hover:text-red-500 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <label className="text-sm font-medium text-gray-700">
                                EmpID
                            </label>
                            {/* Auto-filled Info */}
                            <div className="space-y-3 mb-4">
                                <input
                                    type="text"
                                    value={UserName.teacher_Id}
                                    readOnly
                                    // onChange={(e) => setempid(e.target.value)}
                                    className={`w-full bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm ${UserName.teacher_Id && 'cursor-not-allowed'}`}
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Emp name
                                </label>

                                <input
                                    type="text"
                                    value={UserName.name}
                                    readOnly
                                    // onChange={(e) => setname(e.target.value)}

                                    className={`w-full bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm ${UserName.name && 'cursor-not-allowed'}`}
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={UserName.email}
                                    // onChange={(e) => setemail(e.target.value)}

                                    readOnly
                                    className={`w-full bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm ${UserName.email && 'cursor-not-allowed'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority
                                </label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div><div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Issue Type
                                    </label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>settype(e.target.value)}>
                                        {issueOptions.map((type, idx) => (
                                            <option key={type.value} value={type.value}>

                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* Reason */}
                            {issuetype=='other'
                                
                                &&
                                <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Reason for Reactivation
                                </label>
                                <textarea
                                    placeholder="Please explain why your account should be reactivated..."
                                    required
                                    rows="3"
                                    value={Reason}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                            </div>}
<br/>
                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setpoup(false)}
                                    className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                {Reason &&
                                    <>

                                        <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition hover:cursor-pointer"
                                            // disabled={!Reason}
                                            onClick={handelRequest}
                                        >
                                            Send Request
                                        </button>
                                    </>


                                }

                            </div>

                        </div>
                    </div>
                </>

            )}
        </>

    );
}

export default AccountDeactivated;