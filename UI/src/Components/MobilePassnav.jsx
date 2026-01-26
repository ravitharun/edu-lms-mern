import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiLock, FiLogOut, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function MobilePassnav({ mobileMenuOpen }) {
    console.log(mobileMenuOpen, "mobileMenuOpen")
    // const [openProfile, setOpenProfile] = useState(true);
    return (
        <>

            <div className="md:hidden border-t bg-white shadow">
                <div className="flex flex-col gap-2 px-4 py-4">
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                        <FiUser /> Profile
                    </Link>

                    <Link
                        to="/change-password"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                        <FiLock /> Change Password
                    </Link>

                    <button
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default MobilePassnav