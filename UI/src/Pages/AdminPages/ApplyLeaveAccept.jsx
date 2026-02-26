import React, { useState } from 'react'
import App from '../../App'
import toast, { Toaster } from 'react-hot-toast'
import AdminHeader from '../../Components/AdminHeader'
import { FaPlus } from 'react-icons/fa'
import { TbHeadings } from '../../Components/Leaveheadings'
import Dataloading from '../../Loaders/Dataloading'
import ProgressLoader from '../../Loaders/Progressloader'
import { useEffect } from 'react'
import { getRequestEmail } from './TechersApiCall/LeaveApi'

function ApplyLeaveAccept() {
    const [loader, setloader] = useState(false)
    const [leaves, setleaves] = useState([])
    const [edit, setEdit] = useState(false)
    const [editid, setEditid] = useState()
    useEffect(() => {
        const get = async () => {
            setloader(true)

            const response = await getRequestEmail()
            console.log(response, 'response')
            setleaves(response, 'response')
            setloader(false)
        }
        get()
    }, [])
    const [fakeData, setFakeData] = useState([
        {
            EmpName: "Ravi Tharun",
            EmpID: "Teacher-6087",
            EmpEmailId: "tharunravi672@gmail.com",
            Fromdate: "2026-02-26T00:00:00.000Z",
            Todate: "2026-03-06T00:00:00.000Z",
            leaveType: "Casual Leave",
            TotalDays: 9,
            Application_status: "Inprogress",
            ReasonLeave: "Personal Work",
            createdAt: "2026-02-25T14:19:37.806Z",
            updatedAt: "2026-02-25T14:19:37.806Z",
        },
        {
            EmpName: "Pranav Kumar",
            EmpID: "Teacher-6090",
            EmpEmailId: "pranavkumar@gmail.com",
            Fromdate: "2026-03-10T00:00:00.000Z",
            Todate: "2026-03-12T00:00:00.000Z",
            leaveType: "Sick Leave",
            TotalDays: 3,
            Application_status: "Approved",
            ReasonLeave: "Fever and Cold",
            createdAt: "2026-03-08T10:15:22.000Z",
            updatedAt: "2026-03-08T12:00:00.000Z",
        },
        {
            EmpName: "Anjali Sharma",
            EmpID: "Teacher-6101",
            EmpEmailId: "anjali.sharma@gmail.com",
            Fromdate: "2026-04-01T00:00:00.000Z",
            Todate: "2026-04-05T00:00:00.000Z",
            leaveType: "Earned Leave",
            TotalDays: 5,
            Application_status: "Rejected",
            ReasonLeave: "Family Function",
            createdAt: "2026-03-28T09:30:00.000Z",
            updatedAt: "2026-03-29T11:45:10.000Z",
        }
    ]);

    const HandelEdit = (id) => {
        console.log(id, 'to edit')
        setEditid(id)
        setEdit((prev) => !prev)
    }
    const handleStatusChange = (index, value) => {
        const updatedData = [...fakeData];
        updatedData[index].Application_status = value;
        setFakeData(updatedData);
    };
    
    const handelUpdate = (status) => {
        toast.success(status)
        setEdit(false)
    }
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
                            {loader ? (
                                <tr>
                                    <td colSpan={TbHeadings.length} className="h-40">
                                        <div className="flex justify-center items-center h-40">
                                            <Dataloading path="Fetching the leave Applications" />
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {fakeData.length > 0 ? (
                                        fakeData.map((item, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50 text-center">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{item.leaveType}</td>
                                                <td className="p-3">{item.ReasonLeave}</td>
                                                <td className="p-3">{item.EmpEmailId}</td>
                                                <td className="p-3">{item.EmpID}</td>
                                                <td className="p-3">
                                                    {new Date(item.Fromdate).toLocaleDateString()}
                                                </td>
                                                <td className="p-3">
                                                    {new Date(item.Todate).toLocaleDateString()}
                                                </td>
                                                <td className="p-3">{item.TotalDays}</td>
                                                <td
                                                    className={`p-3 font-semibold ${item.Application_status === "Approved"
                                                        ? "text-green-600"
                                                        : item.Application_status === "Rejected"
                                                            ? "text-red-600"
                                                            : "text-yellow-600"
                                                        }`}
                                                >
                                                    {/* item.Application_status */}
                                                    {edit ? <>

                                                        {editid == index ? <>


                                                            <select
                                                                value={item.Application_status}
                                                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                                                className="px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                            >
                                                                <option value="Inprogress">Inprogress</option>
                                                                <option value="Approved">Approved</option>
                                                                <option value="Rejected">Rejected</option>
                                                            </select>
                                                        </> : item.Application_status}

                                                    </> : item.Application_status}

                                                </td>
                                                <td className="p-3">{item.TotalDays}</td>
                                                <td className="p-3"><>

                                                    <button
                                                        onClick={() => HandelEdit(index)}
                                                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 shadow-sm
  ${edit && editid === index
                                                                ? "bg-red-500 hover:bg-red-600"
                                                                : "bg-indigo-500 hover:bg-indigo-600"
                                                            }`}
                                                    >
                                                        {edit && editid === index ? "Cancel" : "Edit"}
                                                    </button>
                                                    {/* <button></button> */}
                                                </></td>
                                                <td className="p-3">


                                                    {edit ?

                                                        editid === index ? <button
                                                            className="px-4 py-1.5 rounded-lg bg-green-100 text-green-600 
             hover:bg-green-200 transition-all duration-200 
             text-sm font-medium"
                                                            onClick={() => handelUpdate(index)}
                                                        >
                                                            Update
                                                        </button>

                                                            : ""

                                                        : <>
                                                            {/* <button
                                                            className="px-4 py-1.5 rounded-lg bg-green-100 text-green-600 
             hover:bg-green-200 transition-all duration-200 
             text-sm font-medium"
                                                            onClick={() => handelUpdate(index)}
                                                        >
                                                            Update
                                                        </button> */}
                                                        </>}
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={TbHeadings.length} className="text-center p-6">
                                                No Leave Applications Found
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>



        </>

    )
}

export default ApplyLeaveAccept