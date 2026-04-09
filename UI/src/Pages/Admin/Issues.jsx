import { useEffect, useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import Swal from 'sweetalert2'
import { deactivateAccount } from './APIS/DeactivateAccount'

import Dataloading from '../../Loaders/Dataloading'
import { url } from '../../Apis/Islogin'

function Issues() {
    const page = 'Issues'
    const [Issues, setIssues] = useState([])
    const [loader, setloader] = useState(false)
    let GetCurrent_Date = new Date

    useEffect(() => {
        const getIssues = async () => {
            try {
                setloader(true)
                const response = await axios.get(`${url}/api/Account/GetAllUpdateReason`)

                console.log(response.data?.message, 'response api call')
                // console.log(response)
                setIssues(response.data?.message)
                setloader(false)
            } catch (error) {

                console.log(error.message)


            }
        }
        getIssues()
    }, [])



    const HandelAccountActivate = (id, action = "Update") => {

        deactivateAccount(id, action)

    }
    return (
        <div className="min-h-screen flex bg-gray-50">
            <MasterAdminNavbar path={page} />
            <Toaster />
            <div className="flex-1 flex flex-col min-w-0">
                <MasterLogoNav path={page} />

                <main className="flex-1 mt-[72px] px-4 md:px-6 lg:px-8 pb-10 overflow-y-auto">

                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Issues
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage and resolve issues reported by teachers to maintain smooth platform operations.
                            </p>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl shadow-sm p-5 border">
                                <h3 className="text-sm text-gray-500">Total Issues</h3>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{Issues.length}</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-5 border">
                                <h3 className="text-sm text-gray-500">Pending</h3>
                                <p className="text-2xl font-bold text-yellow-500 mt-1">{Issues.length == 6 && 0}</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-5 border">
                                <h3 className="text-sm text-gray-500">Resolved</h3>
                                <p className="text-2xl font-bold text-green-500 mt-1">{Issues.length || 0}</p>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Recent Issues
                            </h2>

                            <select className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Issues</option>
                                <option>Account Deactivation</option>
                                <option>Login Problem</option>
                                <option>Technical Bug</option>
                            </select>
                        </div>

                        {/* Issues List */}
                        <div className="space-y-4">

                            {Issues?.length == 0 && "no data found"}
                            {loader ? <Dataloading path='Featching the adata ' /> :





                                Issues?.map((issue) => (
                                    <div
                                        key={issue?.id}
                                        className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                            {/* Left Section */}
                                            <div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {issue?.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {issue?.email}
                                                </p>
                                                <p className="text-sm mt-2 text-gray-600">
                                                    {issue?.IssueType}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Submitted on {issue?.date || GetCurrent_Date.toLocaleDateString()}
                                                </p>
                                            </div>

                                            {/* Right Section */}
                                            <div className="flex flex-wrap gap-3 items-center">

                                                {/* Priority Badge */}
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full
                                                ${issue?.priority === "High" ? "bg-red-100 text-red-600" :
                                                        issue?.priority === "Medium" ? "bg-yellow-100 text-yellow-600" :
                                                            "bg-green-100 text-green-600"}`}>
                                                    {issue?.priority} Priority
                                                </span>

                                                {/* Status Badge */}
                                                <span>
                                                    {issue.IssueType === "account_reactivation" ? (
                                                        <button
                                                            className="px-4 py-1.5 text-xs font-semibold rounded-full 
  bg-red-100 text-red-600 border border-red-200 
  hover:bg-red-500 hover:text-white 
  transition-all duration-200 ease-in-out 
  shadow-sm hover:shadow-md cursor-pointer"
                                                            onClick={() => HandelAccountActivate(issue.empid)}
                                                        >
                                                            Account Reactivation
                                                        </button>
                                                    ) : (
                                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                                            {issue.IssueType}
                                                        </span>
                                                    )}
                                                </span>
                                                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
                                                    View
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Issues   