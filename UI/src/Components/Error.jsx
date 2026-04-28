import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { UserName } from "../Apis/Islogin";
import RedirectPopup from "./RedirectPopup";
import { useEffect } from "react";

function Error() {
  const navigate = useNavigate();
  const userInfo = secureLocalStorage.getItem("User_info");
  const role = userInfo?.role || "Unknown";
  const name = userInfo?.name || "User";

  const requiredRole = "Admin";
  const [redirectLogin, setredirect] = useState(false)
  const handleLogout = () => {
    setredirect(true)
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("User_info");
    setTimeout(() => {
      navigate("/login");
    }, 3500);
  };

    console.log(window.location.pathname)
  // useEffect(() => {
  //   const user = secureLocalStorage.getItem("User_info");

  //   if (!user) return; // no user → stay on /
  //   if (user.role === "Admin") {
  //     navigate("/Admin-Dashboard");
  //   } else if (user.role === "teacher") {
  //     navigate("/teacher-dashboard");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);




  // handelPageRoute
  const handelPageRoute = () => {
    if (UserName?.role == "student") {
      navigate("/")

    }
    else if (UserName?.role == "Teacher") {
      navigate("/teacher-dashboard")

    }
    else {

      navigate("/AdminDashboard")
    }
  }
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE - Academic Info Panel */}
      <div className="hidden md:flex w-1/2 bg-blue-800 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            Learning Management System
          </h1>
          <p className="mt-4 text-blue-100 text-sm leading-relaxed max-w-sm">
            Secure academic platform providing role-based access
            to courses, reports, and administrative resources.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Access Card */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full border">

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800">
            Access Restricted
          </h2>

          <p className="mt-3 text-gray-600 text-sm">
            Hello <span className="font-medium">{UserName
              ?.role || "User"}</span>,
            your current role is <span className="font-medium text-blue-700">{UserName
              ?.role || "Unknown"}</span>.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            This resource is not available for your account.
          </p>
          {/* Info Box */}
          <div className="mt-5 bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
            If you believe this is a mistake, please contact your academic administrator.
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handelPageRoute}
              className="w-full py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition"
            >
              Back to Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Logout & Switch Account
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-xs text-red-400 text-center">
            Error Code: 403 • Role-Based Access Control
          </p>

        </div>
      </div>
      {redirectLogin && <RedirectPopup onComplete={handleLogout} type="Logout" />}
    </div>
  );
}

export default Error;