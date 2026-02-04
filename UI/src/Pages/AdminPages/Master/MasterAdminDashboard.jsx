// DashboardLayout.jsx
import React from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";

function DashboardLayout({ children }) {
  const Data = [
    { heading: "Total Students", total: 1240 },
    { heading: "Total Teachers", total: 86 },
    { heading: "Active Courses", total: 42 },
    { heading: "Pending Requests", total: 12 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <MasterAdminNavbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Navbar */}
        <MasterLogoNav path="AdminDashboard" />

        {/* Scrollable Content */}
        <main className="flex-1 pt-16 md:ml- pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Data.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 border border-gray-100"
                >
                  <p className="text-sm text-gray-500">{item.heading}</p>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {item.total}
                  </h2>

                  <div className="mt-4 h-1 w-12 bg-blue-500 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Page Content */}
            <div className="mt-8">{children}</div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
