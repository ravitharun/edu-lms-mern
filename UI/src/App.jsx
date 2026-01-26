import React, { useState } from "react";
import LogoNavbar from "./Components/LogoNavbar";
import Navbar from "./Components/Navbar";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log(mobileMenuOpen)
  return (
    <>
      {/* Hide LogoNavbar when mobile menu in Navbar is open */}
  <>
  {/* LogoNavbar sticky */}
  <div className="sticky top-0 z-50">
    <LogoNavbar hide={mobileMenuOpen} />
  </div>

  {/* Navbar sticky below LogoNavbar */}
  <div className="sticky top-16 z-40"> 
    <Navbar
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  </div>
</>

    </>
  );
}

export default App;
