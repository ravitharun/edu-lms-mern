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
const naviagte=useNavigate("")
  useEffect(() => {
    const handleAnnouncementAccount = (data) => {
      console.log(UserName?.email == data?.email)
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
      console.log(data, "Account status");

    };
    const handleAnnouncement = (data) => {
      console.log(data, "New Announcement App level");
      alert(data);
    };
    const handleAnnouncementUpdate = (data, updatedAccount) => {
      console.log(data, 'AccountStatusUpdate')
      if (UserName?.email == updatedAccount?.email) {

        return toast.success('Your Account is Activated by the Admin');
      }

    };
    socket.on("AccountStatus", handleAnnouncementAccount);
    socket.on("Announcement", handleAnnouncement);
    socket.on("AccountStatusUpdate", handleAnnouncementUpdate);
    // Cleanup listener on unmount
    return () => {
      socket.off("AccountStatus", handleAnnouncement);
      socket.off("AccountStatusUpdate", handleAnnouncement);
      socket.off("Announcement", handleAnnouncement);
    };
  }, [])



  // useEffect(() => {
  //   const handleAnnouncementUpdate = (data) => {
  //     console.log(data, 'AccountStatusUpdate')
  //     toast.success(data);

  //   };
  //   socket.on("AccountStatusUpdate", handleAnnouncement);

  //   // Cleanup listener on unmount
  //   return () => {
  //     socket.off("AccountStatusUpdate", handleAnnouncement);
  //   };
  // }, [])
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
