import React from "react";
import Undermanitance from "./Undermanitance";

function AddingSoon({ pathname }) {
    return (
     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center relative px-4">

  {/* 🌟 Main Card */}
  <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center">

    {/* Title */}
    <h2 className="text-xl font-semibold text-gray-800">
      Feature Coming Soon 🚧
    </h2>

    <p className="text-sm text-gray-500 mt-2 mb-6">
      {pathname}
    </p>

    {/* ✅ TIMER */}
    <div className="flex justify-center gap-3 mb-6">
      <Undermanitance Ui="timer" />
    </div>

    {/* Subtitle */}
    <p className="text-xs text-gray-400">
      We’re working hard to bring this feature 🚀
    </p>
  </div>

  {/* 🔽 Floating Loader */}
  <div className="absolute bottom-10 flex flex-col items-center">
    
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    
    <p className="text-xs text-gray-400 mt-2">Loading...</p>
  </div>

</div>
    );
}

export default AddingSoon;
