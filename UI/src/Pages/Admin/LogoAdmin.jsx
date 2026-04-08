import React from 'react'
import { useState } from 'react'
import { UserName } from '../../Apis/Islogin'

function LogoAdmin() {
    const [showPoup, setShowpoup] = useState(false)
    const handelPoup_profile = () => {
        // console.log(url,'url')
        setShowpoup((prev) => !prev)
    }

    return (
        <>
            <div className="flex items-center gap-3 ml-auto pr-4">

                <div className="hidden lg:block text-right leading-tight">
                    <p className="text-[10px] text-gray-500">Admin</p>
                    <p className="text-xs font-medium text-gray-800">
                        {UserName?.name}
                    </p>
                </div>

                <img
                    src={UserName?.profilePreview}
                    alt="Profile"
                    onClick={() => handelPoup_profile(UserName?.profilePreview)}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 hover:border-blue-400 cursor-pointer transition"
                />

            </div>  
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


    )
}

export default LogoAdmin