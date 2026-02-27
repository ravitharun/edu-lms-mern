import React, { useState } from 'react'
import App from '../../App'
import Swal from "sweetalert2";

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

    const [Status, setstatus] = useState("")
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
    const [fakeData, setFakeData] = useState([]);

    const HandelEdit = (id) => {
        console.log(id, 'to edit')
        setEditid(id)
        setEdit((prev) => !prev)
    }
    const handleStatusChange = (index, value) => {
        const updatedData = [...leaves];
        updatedData[index].Application_status = value;
        setstatus(value)
        setleaves(updatedData);
    };

    const handelUpdate = (id, Fromdate, Todate) => {

        if (!id || !Fromdate || !Todate) {

            return toast.error("Something went wrong");
        }
        // ]
        const data = {
            id,
            Fromdate, Todate
        }
        Swal.fire({
            title: "Approve Leave?",
            text: "Do you want to approve this leave request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Approve",
            cancelButtonText: "Reject"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Approved!", "Leave has been approved.", "success");
            } else {
                Swal.fire("Rejected!", "Leave has been rejected.", "error");
            }
        });
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
                                    {leaves.length > 0 ? (
                                        leaves.map((item, index) => (
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
                                                            onClick={() => handelUpdate(item.EmpID, item.Fromdate, item.Todate)}
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