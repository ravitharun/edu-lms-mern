import React, { useState } from 'react'
import { FaBell, FaUser } from 'react-icons/fa'

function AdminHeader() {
    const [showNotifications, setShowNotifications] = useState(false);
    return (


        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Add Assignments</h1>
                <div className="flex items-center gap-4">
                    <FaBell
                        className="text-xl text-gray-600 cursor-pointer"
                        onClick={() => setShowNotifications(!showNotifications)}
                    />
                    <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow cursor-pointer">
                        <FaUser className="text-gray-600" />
                        <span className="text-gray-800 font-medium text-sm">Mr. Tharun</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHeader