// MasterLogoNav.jsx
import React, { useState } from "react";
import { UserName } from "../../../Apis/Islogin";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function MasterLogoNav({ path }) {
  const [showPoup, setShowpoup] = useState(false)
  const handelPoup_profile = () => {
    // console.log(url,'url')
    setShowpoup((prev) => !prev)
  }
  return (
    <>
      {/* </> */}
      <nav className="sticky top-0 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-0 z-40">

        {/* Left: Admin Text aligned with Sidebar */}
        <div className="hidden xl:flex absolute left-12">
          <div className="text-left leading-tight">
            {/* <p className="text-xs text-gray-500"></p> */}
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <Link to="/AdminDashboard">
                <span className="font-medium text-gray-500">{path == "AdminDashboard" ? "" : "Dashboard"}</span></Link>
              {path && (
                <>
                  {path == "AdminDashboard" ? "" : <FaChevronRight className="text-xs text-gray-400" />}
                  <span className="font-semibold text-blue-600">{path}</span>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-4 ml-auto pr-6">
          <div className="hidden lg:text-right lg:block leading-tight">
            <p className="text-xs text-gray-500">Admin</p>
            <p className="text-sm font-medium text-gray-800">{UserName?.name}</p>
          </div>
          <img
            src={UserName?.profilePreview}
            alt="Profile"
            onClick={() => handelPoup_profile(UserName?.profilePreview)}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all"
          />
        </div>
      </nav>
      {showPoup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-80 sm:w-96 relative pointer-events-auto flex flex-col items-center space-y-4 border border-gray-200 dark:border-gray-700">

            {/* Close Button */}
            <button
              onClick={() => setShowpoup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              ✕
            </button>

            {/* User Image */}
            <img
              src={UserName?.profilePreview}
              alt={UserName?.name}
              className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
            />

            {/* User Name */}
            <p className="text-lg font-semibold text-gray-800 dark:text-white text-center">
              {UserName?.name} -({UserName?.role})
            </p>

            {/* Optional Email */}
            {UserName?.email && (
              <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
                {UserName.email}
              </p>
            )}
          </div>
        </div>
      )}

    </>
  );
}

export default MasterLogoNav;
