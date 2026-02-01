import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiLock, FiLogOut, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { UserLogin } from '../Apis/Islogin'
import secureLocalStorage from 'react-secure-storage'

function MobilePassnav({ mobileMenuOpen }) {
    console.log(mobileMenuOpen, "mobileMenuOpen")
    const navigate=useNavigate("")
    const Logout = () => {
        console.log("first")
        let tkn = secureLocalStorage.removeItem("token")

        if (tkn == null) {
            return navigate("/login")
        }
    }

    return (
        <>

            <div className="md:hidden border-t bg-white shadow rounded-xl">
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
                        onClick={Logout}
                    >
                        {UserLogin  ? "Login" : <> <FiLogOut /> Logout</>}
                    </button>
                </div>
            </div>
        </>
    )
}

export default MobilePassnav