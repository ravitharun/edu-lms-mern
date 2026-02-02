import React from "react";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function Error() {
    const HandelLogout = () => {
        const clr_token_logout = secureLocalStorage.removeItem("token")
        const clr_userInfo_logout = secureLocalStorage.removeItem("User_info")
        if (!clr_token_logout || !clr_userInfo_logout) {
            navigate("/login")
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="flex justify-center hover:cursor-not-allowed">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-3xl">🚫</span>
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="mt-4 text-4xl font-bold text-red-600">
                    Access Restricted
                </h1>

                {/* Message */}
                <p className="mt-3 text-gray-600">
                    This page is not available for your current role.
                    Please contact your instructor or log in with a valid account.
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3">
                    <Link
                        to="/dashboard"
                        className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                    >
                        Go to Dashboard
                    </Link>

                    <Link
                        to="/login"
                        onClick={HandelLogout}
                        className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Switch Account
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-6 text-sm text-gray-400">
                    LMS Security Policy • 403 Error
                </p>
            </div>
        </div>
    );
}

export default Error;
