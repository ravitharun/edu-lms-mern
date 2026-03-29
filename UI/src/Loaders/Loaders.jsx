import React from 'react'

function Loaders({ pathname }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

            {/* Loader */}
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

            {/* Text */}
            <h2 className="text-xl font-semibold text-gray-800">
                Preparing Your Teaching Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                Please wait while we load the tools you need to manage your classes.
            </p>


        </div>
    )
}

export default Loaders