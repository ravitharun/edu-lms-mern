// import React from "react";
// import { UserName } from "../Apis/Islogin";

// function WelcomeMessage() {
//   const name = UserName?.name || "Tharun Kumar";
//   const role = UserName?.role || "Teacher";

//   return (
//     <div className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">

//       {/* Left Section */}
//       <div>
//         <h1 className="text-3xl font-bold">
//           Welcome back, {name} 👋
//         </h1>

//         <p className="mt-2 text-sm text-indigo-100">
//           {role === "Admin"
//             ? "Manage teachers, students, subjects and platform activities."
//             : "Manage your courses, track students and upload materials."}
//         </p>

//         <div className="mt-4">
//           <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
//             {role}
//           </span>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex gap-3 flex-wrap">

//         <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
//           View Courses
//         </button>

//         {role === "Admin" && (
//           <button className="bg-indigo-900 px-4 py-2 rounded-lg font-medium hover:bg-indigo-800 transition">
//             Manage Users
//           </button>
//         )}

//       </div>
//     </div>
//   );
// }

// export default WelcomeMessage;
import React from "react";
import { UserName } from "../Apis/Islogin";
import { Link } from "react-router-dom";

function WelcomeMessage() {
    const name = UserName?.name || "Tharun Kumar";
    const role = UserName?.role || "Teacher";

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between transition hover:shadow-lg">

            {/* Left */}
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                        {name}
                    </span>{" "}
                    👋
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    {role === "Admin"
                        ? "Admin Management Dashboard"
                        : "Teacher Course Dashboard"}
                </p>

                <span
                    className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full
          ${role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {role}
                </span>
            </div>

            {/* Right */}
            <div className="flex gap-3 mt-4 md:mt-0">
                <Link to="/Admin/AssiginSubjects">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                        View Courses
                    </button>
                </Link>

                {role === "Admin" && (
                    <Link to="/admin/Teachers" >

                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
                            Manage Users
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default WelcomeMessage;