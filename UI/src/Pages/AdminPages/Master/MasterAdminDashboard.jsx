// // DashboardLayout.jsx

// import { useEffect } from "react";
// import MasterAdminNavbar from "./MasterAdminNavbar";
// import MasterLogoNav from "./MasterLogoNav";
// import { fun } from "../../../Components/UserisLogin";


// function DashboardLayout({ children }) {
//   useEffect(() => {
//     fun()
//   }, [])

//   const Data = [
//     { heading: "Total Students", total: 1240 },
//     { heading: "Total Teachers", total: 86 },
//     { heading: "Active Courses", total: 42 },
//     { heading: "Pending Requests", total: 12 },
//   ];

//   return (
//     <>
//       <div className="min-h-screen flex bg-gray-50">
//         {/* Sidebar */}
//         <MasterAdminNavbar path="Dashboard" />

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col min-w-0 w-full">
//           {/* Navbar */}
//           <MasterLogoNav path="AdminDashboard" />

//           {/* Scrollable Content */}
//           <main className="flex-1 pt-16 md:ml- pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
//             <div className="max-w-7xl mx-auto">

//               {/* Cards Grid */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {Data.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 border border-gray-100"
//                   >
//                     <p className="text-sm text-gray-500">{item.heading}</p>
//                     <h2 className="text-3xl font-bold text-gray-800 mt-2">
//                       {item.total}
//                     </h2>

//                     <div className="mt-4 h-1 w-12 bg-blue-500 rounded-full"></div>
//                   </div>
//                 ))}
//               </div>

//               {/* Page Content */}
//               <div className="mt-8">{children}</div>

//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashboardLayout;
import { useEffect } from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";
import { fun } from "../../../Components/UserisLogin";

function DashboardLayout({ children }) {
  useEffect(() => {
    fun();
  }, []);

  // System Stats (Teachers + Students)
  const Data = [
    { heading: "Total Teachers", total: 86 },
    { heading: "Total Students", total: 1240 },
    { heading: "Active Accounts", total: 1120 },
    { heading: "Deactivated Accounts", total: 120 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <MasterAdminNavbar path="Dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full">

        {/* Top Navbar */}
        <MasterLogoNav path="AdminDashboard" />

        {/* Content */}
        <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">

          <div className="max-w-7xl mx-auto space-y-8">

            {/* Dashboard Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow">
              <h1 className="text-2xl font-bold">
                Admin Management Dashboard 🚀
              </h1>
              <p className="text-sm mt-1 opacity-90">
                Manage Teachers, Students, Subjects & Account Status.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Data.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                >
                  <p className="text-sm text-gray-500">
                    {item.heading}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {item.total}
                  </h2>
                  <div className="mt-4 h-1 w-12 bg-indigo-500 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Management Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Teacher Management */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                  👨‍🏫 Teacher Management
                </h2>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition">
                    View Teachers
                  </button>

                  <button className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition">
                    Manage Subjects
                  </button>

                  <button className="w-full bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition">
                    Deactivate Teacher Account
                  </button>
                </div>
              </div>

              {/* Student Management */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                  👨‍🎓 Student Management
                </h2>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition">
                    View Students
                  </button>

                  <button className="w-full bg-yellow-500 text-white p-3 rounded-xl hover:bg-yellow-600 transition">
                    Approve Requests
                  </button>

                  <button className="w-full bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition">
                    Deactivate Student Account
                  </button>
                </div>
              </div>

            </div>

            {/* Children Content */}
            <div>{children}</div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;