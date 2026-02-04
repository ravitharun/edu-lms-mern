// MasterLogoNav.jsx
import React from "react";

function MasterLogoNav({path}) {
  return (
    <nav className="sticky top-0 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-0 z-40">
      
      {/* Left: Admin Text aligned with Sidebar */}
      <div className="hidden xl:flex absolute left-12">
        <div className="text-left leading-tight">
          {/* <p className="text-xs text-gray-500"></p> */}
          <p className="text-sm font-medium text-gray-800">{path==""?'':path}</p>
        </div>
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-4 ml-auto pr-6">
        <div className="hidden lg:text-right lg:block leading-tight">
          <p className="text-xs text-gray-500">Admin</p>
          <p className="text-sm font-medium text-gray-800">Ravi Tharun</p>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all"
        />
      </div>
    </nav>
  );
}

export default MasterLogoNav;
