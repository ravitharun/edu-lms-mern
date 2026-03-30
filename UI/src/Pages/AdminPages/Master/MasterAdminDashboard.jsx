
import { useEffect, useState } from "react";
import MasterAdminNavbar from "./MasterAdminNavbar";
import MasterLogoNav from "./MasterLogoNav";
import { fun } from "../../../Components/UserisLogin";
import { Link } from "react-router-dom";
import WelcomeMessage from "../../../Components/WelcomeMessage";
import Announcement from "../../../Components/Announcement";
import axios from "axios";
import { socket } from "../../../Socket";
import { MaintanceMode } from "../../../Apis/Islogin";
import Undermanitance from "../../../Loaders/Undermanitance";


function DashboardLayout({ children }) {
  useEffect(() => {
    fun();

  }, []);
  useEffect(() => {
    // Listen for the "Announcement" event
    const handleAnnouncement = (data) => {
      console.log(data, "New Announcement App level");
      alert(data); // or toast.success(data) if using React-Toastify
    };

    socket.on("Announcement", handleAnnouncement);

    // Cleanup listener on unmount
    return () => {
      socket.off("Announcement", handleAnnouncement);
    };
  }, []); // Empty dependency ensures this runs once on app load
  // System Stats (Teachers + Students)

  const [Count, setcount] = useState([])
  useEffect(() => {
    const Getdata = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/UsersCount/user")
        console.log(response.data, "Count")
        setcount(response.data.message)
      } catch (error) {
        console.log(error.message)
      }
    }
    Getdata()
  }, [])
  return (
    <>
      {MaintanceMode ? <Undermanitance /> :


        <div className="min-h-screen flex bg-gray-50">

          <Announcement></Announcement>
          {/* Sidebar */}
          <MasterAdminNavbar path="Dashboard" />

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 w-full">

            {/* Top Navbar */}
            <MasterLogoNav path="AdminDashboard" />

            {/* Content */}
            <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">

              <div className="max-w-7xl mx-auto space-y-8">
                <WelcomeMessage></WelcomeMessage>
                {/* Dashboard Banner */}


                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                  <div

                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                  >
                    <p className="text-sm text-gray-500">
                      Total Teachers
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                      {Count?.GetuserInfo_user_Teacher}
                    </h2>
                    <div className="mt-4 h-1 w-12 bg-indigo-500 rounded-full"></div>
                  </div>
                  {/* Total Students */}
                  <div

                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                  >
                    <p className="text-sm text-gray-500">
                      Total Students
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                      {Count?.GetuserInfo_user_student}
                    </h2>
                    <div className="mt-4 h-1 w-12 bg-indigo-500 rounded-full"></div>
                  </div>
                  {/* Active Accounts */}
                  <div

                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                  >
                    <p className="text-sm text-gray-500">
                      Active Accounts
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                      {Count?.GetuserInfo_user_ActiveAccounts}
                    </h2>
                    <div className="mt-4 h-1 w-12 bg-indigo-500 rounded-full"></div>
                  </div>
                  {/* Deactivated Accounts */}
                  <div

                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                  >
                    <p className="text-sm text-gray-500">
                      Deactivated Accounts
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                      {Count?.GetuserInfo_user_DeActiveAccounts}
                    </h2>
                    <div className="mt-4 h-1 w-12 bg-indigo-500 rounded-full"></div>
                  </div>

                </div>

                {/* Management Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* Teacher Management */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

                    <h2 className="text-xl font-bold mb-6 text-gray-800">
                      👨‍🏫 Teacher Management
                    </h2>

                    <div className="flex flex-col gap-5">

                      <Link to="/admin/Teachers">
                        <div className="group cursor-pointer flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition">
                          <span className="font-medium text-gray-700 group-hover:text-blue-600">
                            View Teachers
                          </span>
                          <span className="text-blue-500 text-lg">→</span>
                        </div>
                      </Link>

                      <Link to="/Admin/AssiginSubjects">
                        <div className="group cursor-pointer flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition">
                          <span className="font-medium text-gray-700 group-hover:text-green-600">
                            Manage Subjects
                          </span>
                          <span className="text-green-500 text-lg">→</span>
                        </div>
                      </Link>

                      <Link to="/admin/Teachers">
                        <div className="group cursor-pointer flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-red-500 hover:shadow-md transition">
                          <span className="font-medium text-gray-700 group-hover:text-red-600">
                            Deactivate Teacher Account
                          </span>
                          <span className="text-red-500 text-lg">→</span>
                        </div>
                      </Link>

                    </div>
                  </div>


                  {/* Student Management */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

                    <h2 className="text-xl font-bold mb-6 text-gray-800">
                      👨‍🎓 Student Management
                    </h2>

                    <div className="flex flex-col gap-6">

                      <Link to="/admin/Studenta">
                        <div className="group cursor-pointer flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition">
                          <span className="font-medium text-gray-700 group-hover:text-blue-600">
                            View Students
                          </span>
                          <span className="text-blue-500 text-lg">→</span>
                        </div>
                      </Link>

                      <Link to="/admin/Studenta">
                        <div className="group cursor-pointer flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-red-500 hover:shadow-md transition">
                          <span className="font-medium text-gray-700 group-hover:text-red-600">
                            Deactivate Student Account
                          </span>
                          <span className="text-red-500 text-lg">→</span>
                        </div>
                      </Link>

                    </div>

                  </div>

                </div>

                {/* Children Content */}
                <div>{children}</div>

              </div>
            </main>
          </div>
        </div>}
    </>
  );
}

export default DashboardLayout;