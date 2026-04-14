import React, { useState } from "react";
import LogoNavbar from "./Components/LogoNavbar";
import Navbar from "./Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { socket } from "./Socket";
import { useEffect } from "react";
import { UserName } from "./Apis/Islogin";
import { useNavigate } from "react-router-dom";
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const naviagte = useNavigate("")
  useEffect(() => {
    const handleAnnouncementAccount = (data) => {
      if (UserName?.email == data?.email) {
        toast.custom((t) => (
          <div
            className={`bg-white px-4 py-3 rounded-lg shadow-md border-l-4 border-red-500 flex items-center gap-3 ${t.visible ? "animate-enter" : "animate-leave"
              }`}
          >
            {/* Icon */}
            <div className="text-red-500 text-lg">⚠️</div>

            {/* Message */}
            <p className="text-sm font-medium text-gray-700">
              Your account has been deactivated by admin
            </p>
          </div>
        ));
        setTimeout(() => {
          return naviagte("/login")
        }, 2500);
      }

    };
    const handleAnnouncement = (data) => {
      alert(data);
    };
    const handleAnnouncementUpdate = (data, updatedAccount) => {
      if (UserName?.email == updatedAccount?.email) {

        return toast.success('Your Account is Activated by the Admin');
      }

    };
    const handelProfileViewNotificationToast = (data) => {
      if (UserName?.role == "student") {
        return toast.custom((t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"
              } max-w-sm w-full bg-white shadow-xl rounded-2xl pointer-events-auto flex p-3 border border-gray-200`}
          >
            {/* Profile Image */}
            <img
              src={data.profileUrl}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover border"
            />

            {/* Content */}
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-800">
                Profile Viewed 👀
              </p>

              <p className="text-sm text-gray-600">
                Prof.{data.message}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {data.timestamp}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>
        ));
      }





    }
    socket.on("AccountStatus", handleAnnouncementAccount);
    socket.on("ProfileView", handelProfileViewNotificationToast);
    socket.on("Announcement", handleAnnouncement);
    socket.on("AccountStatusUpdate", handleAnnouncementUpdate);
    // Cleanup listener on unmount
    return () => {
      socket.off("AccountStatus", handleAnnouncement);
      socket.off("AccountStatusUpdate", handleAnnouncement);
      socket.off("Announcement", handleAnnouncement);
      socket.off("ProfileView", handelProfileViewNotificationToast);
    };
  }, [])
  return (
    <>
      <Toaster></Toaster>
      {/* LogoNavbar → hidden on mobile */}
      <div className="sticky top-0 z-50 hidden md:block">
        {/* {UserRole!="Admin" ?<LogoNavbar />:""} */}
        <LogoNavbar />
      </div>

      {/* Navbar → always visible */}
      <div className="sticky top-0 md:top-16 z-40">
        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </>
  );
}

export default App;
