import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function ProgressLoader({ path }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm text-gray-600">
      {/* Big Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Text */}
      <span className="text-lg font-medium text-center">
        Updating In Progress…{" "}
        <b
          className="
            bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500
            bg-[length:200%_200%]
            bg-clip-text text-transparent
            animate-gradientMove
            drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]
          "
        >
          {path}
        </b>
        <div className="mt-5 flex justify-center">

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            <FaArrowLeft className="text-xs" />
            Back
          </button>
        </div>
      </span>
    </div>
  );
}

export default ProgressLoader;