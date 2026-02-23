
import React, { useState } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import "../Pages/AccountDeactivated.css";
import { Link } from "react-router-dom";
import { UserName } from "../Apis/Islogin";

function AccountDeactivated() {
    const [poup, setpoup] = useState(false)
    console.log(UserName, 'poup')
    return (
        <>

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
                                    className={`w-full bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm ${UserName.teacher_Id && 'cursor-not-allowed'}`}
                                />
                                <label className="text-sm font-medium text-gray-700">
                                  Emp name
                                </label>
                                <input
                                    type="text"
                                    value={UserName.name}
                                    readOnly
                                    className={`w-full bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm ${UserName.name && 'cursor-not-allowed'}`}
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={UserName.email}
                                    readOnly
                                    className={`w-full bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm ${UserName.email && 'cursor-not-allowed'}`}
                                />
                            </div>

                            {/* Reason */}
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Reason for Reactivation
                                </label>
                                <textarea
                                    placeholder="Please explain why your account should be reactivated..."
                                    rows="3"
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setPoup(false)}
                                    className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition hover:cursor-pointer">
                                    Send Request
                                </button>
                            </div>

                        </div>
                    </div>
                </>

            )}
        </>

    );
}

export default AccountDeactivated;