import React from 'react'

function Loaders({ pathname }) {
    return (
        // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

        //     {/* Loader */}
        //     <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

        //     {/* Text */}
        //     <h2 className="text-xl font-semibold text-gray-800">
        //         Preparing Your {pathname} Dashboard
        //     </h2>
        //     <p className="text-sm text-gray-500 mt-1">
        //         {pathname === "Admin"
        //             ? "Loading admin tools and controls..."
        //             : pathname === "teacher"
        //                 ? "Getting your classes ready..."
        //                 : "Preparing your learning dashboard..."}
        //     </p>


        // </div>
        <>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

                <div className="flex flex-col items-center space-y-6">

                    {/* Animated Spinner */}
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold tracking-wide animate-pulse">
                        Preparing Your {pathname} Dashboard
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-300 text-center max-w-xs">
                        {pathname === "Admin"
                            ? "Loading admin tools and controls..."
                            : pathname === "teacher"
                                ? "Getting your classes ready..."
                                : "Preparing your learning dashboard..."}
                    </p>

                    {/* Animated Dots */}
                    <div className="flex space-x-2 mt-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Loaders