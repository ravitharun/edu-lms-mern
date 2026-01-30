import React from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'
import AddingSoon from '../../Loaders/AddingSoon'

function Students() {
    return (
        <>
            <App></App>
            <div className="md:ml-64 p-6 space-y-6 min-h-screen bg-gray-100">
                {/* ================= HEADER ================= */}
                <div className=''>
                    <AdminHeader pathname={"Students"}></AdminHeader>
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3 mt-3">
                </h1>
            <AddingSoon pathname={"Students"}></AddingSoon> 
            </div>

        </>
    )
}

export default Students