import React, { useState } from "react";
import LogoNavbar from "./Components/LogoNavbar";
import Navbar from "./Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { socket } from "./Socket";
import { useEffect } from "react";


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
