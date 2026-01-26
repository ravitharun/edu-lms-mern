import React, { useState } from "react";
import LogoNavbar from "./Components/LogoNavbar";
import Navbar from "./Components/Navbar";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* LogoNavbar → hidden on mobile */}
      <div className="sticky top-0 z-50 hidden md:block">
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
