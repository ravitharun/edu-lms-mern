import React from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'
import AddingSoon from '../../Loaders/AddingSoon'

function ApplyLeave() {
    return (
        <>
            <App></App>
            <div className="md:ml-64 p-6 min-h-screen bg-gray-100 space-y-6">
                {/* ================= HEADER ================= */}
                {/* <AdminHeader></AdminHeader> */}
                <AdminHeader pathname="ApplyLeave"></AdminHeader>
                <AddingSoon pathname="ApplyLeave"></AddingSoon>
            </div>
        </>
    )
}

export default ApplyLeave