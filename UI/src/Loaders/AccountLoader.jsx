import React from "react";

function AccountLoader() {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 min-w-[220px]">

                {/* Spinner */}
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                {/* Title */}
                <p className="text-base font-semibold text-gray-800">
                    Processing
                </p>

                {/* Sub text */}
                <p className="text-xs text-gray-500">
                    Please wait a moment...
                </p>

            </div>

        </div>
    );
}

export default AccountLoader;