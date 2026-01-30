import React from "react";

function AddingSoon({ pathname }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

            {/* Loader */}
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

            {/* Text */}
            <h2 className="text-xl font-semibold text-gray-800">
                Feature Adding Soon - <b className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">{pathname}</b>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                We’re working hard to bring this feature to you 🚀
            </p>

        </div>
    );
}

export default AddingSoon;
