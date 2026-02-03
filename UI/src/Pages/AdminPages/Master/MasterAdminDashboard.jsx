// DashboardLayout.jsx
import React from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <MasterAdminNavbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Navbar */}
        <MasterLogoNav />

        {/* Scrollable Content */}
        <main className="flex-1 pt-16 md:ml-64 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
