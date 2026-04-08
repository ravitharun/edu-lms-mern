// MasterLogoNav.jsx
import React, { useState } from "react";
import { UserName } from "../../Apis/Islogin";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Board from "./Board";
import LogoAdmin from "./LogoAdmin";

function MasterLogoNav({ path }) {
  const [showPoup, setShowpoup] = useState(false)
  return (
    <>
      {/* </> */}
      <nav className="sticky top-0 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-0 z-40">

        {/* Left: Admin Text aligned with Sidebar */}
        <div className="hidden xl:flex absolute left-12">
          <div className="text-left leading-tight">

            <Board path={path} />
            {/* <Board path='AdminDashboard'/> */}

          </div>
        </div>

        {/* Right: Profile */}
      <LogoAdmin></LogoAdmin>
      </nav>
  

    </>
  );
}

export default MasterLogoNav;
