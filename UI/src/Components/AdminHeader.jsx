import React, { useState } from 'react'
import { FaBell, FaUser } from 'react-icons/fa'
import { UserName } from '../Apis/Islogin';
import { Link } from 'react-router-dom';

function AdminHeader({ pathname }) {
    console.log(pathname, 'pathname')
    const [showNotifications, setShowNotifications] = useState(false);
    return (


        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">{pathname == "" ? "empyt" : pathname}</h1>
                <div className="flex items-center gap-4">
                    <FaBell
                        className="text-xl text-gray-600 cursor-pointer"
                        onClick={() => setShowNotifications(!showNotifications)}
                    />
                    <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow cursor-pointer">
                        <FaUser className="text-gray-600" />
                        <Link to="/teachers/profile">

                            <span className="text-gray-800 font-medium text-sm">Mr. {UserName.name}</span></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHeader