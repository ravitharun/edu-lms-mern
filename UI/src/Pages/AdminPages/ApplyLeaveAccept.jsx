import React, { useState } from 'react'
import App from '../../App'
import { Toaster } from 'react-hot-toast'
import AdminHeader from '../../Components/AdminHeader'
import { FaPlus } from 'react-icons/fa'
import { TbHeadings } from '../../Components/Leaveheadings'
import Dataloading from '../../Loaders/Dataloading'
import ProgressLoader from '../../Loaders/Progressloader'

function ApplyLeaveAccept() {
    const[loader,setloader]=useState(true)
    return (
        <>

            <App />
            <Toaster />
            <div className="md:ml-64 p-4 md:p-6 min-h-screen bg-gray-100 space-y-6">

                <AdminHeader pathname="Apply Leave Accept" />
                {/* Apply Button */}
                <div className="w-full overflow-x-auto bg-white rounded-lg mt-10">
                    <table className="min-w-[900px] w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                {TbHeadings.map((heading, idx) => (
                                    <th key={idx} className="p-3 text-left whitespace-nowrap">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loader && (
                                <tr>
                                    <td
                                        colSpan={TbHeadings.length}
                                        className="h-40"
                                    >
                                        <div className="flex justify-center items-center h-40">
                                            <ProgressLoader path="Apply Leave Accept " />
                                        </div>
                                    </td>
                                </tr>)}

                    </tbody>
                    </table>

                </div>
            </div>
        


            </>

            )
}

export default ApplyLeaveAccept