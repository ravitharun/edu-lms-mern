import React, { useEffect, useState } from 'react'
import App from '../../App'
import AdminHeader from '../../Components/AdminHeader'
import ProgressLoader from '../../Loaders/Progressloader'
import { FaCalendarAlt, FaPlus } from 'react-icons/fa'
import { ClassName_hover_btn, dt, UserLogin, UserName } from '../../Apis/Islogin'
import toast, { Toaster } from 'react-hot-toast'
import { ApplyLeaveRequest, GetLeavesApplyByID } from './TechersApiCall/LeaveApi'
import Dataloading from '../../Loaders/Dataloading'
import HandelshowPoupLeave from './HandelshowPoupLeave'
import DownloadReports from './Master/DownloadReports'
import PoupLogin from '../../Components/PoupLogin'
// import { TbHeadings } from '../../Components/Leaveheadings'


function ApplyLeave() {
    const TbHeadings = [
        "S. No",
        "Leave Type",
        "Reason",
        "Reuested Email To",
        "EmpId",
        "From Date",
        "To Date",
        "Total Days",
        "Status",
        "Applied On",
        "Actions"
    ]
    const [handelpoup, sethandelPoup] = useState(false)
    const [handelshowPoup, sethandelshowPoup] = useState(false)
    const [PoupData, setPoupData] = useState(null)
    const [id, setid] = useState(null)
    let progress = false
    const [LeavesData, setLeavesData] = useState([])
    const [Fromdate, setFromdate] = useState("")
    const [Todate, setTodate] = useState("")
    const [TotalDays, setTotalDays] = useState("0")
    const [leaveType, setleavetype] = useState("")
    const [ReasonLeave, setLeaveReason] = useState("")
    const [EmpEmailId, setEmpEmailId] = useState("")
    const [Loader, setLoader] = useState(false)
    const [userlogin, setuserlogin] = useState(false)

    useEffect(() => {
        const getApplyedLeaves = async () => {
            setLoader(true)
            const response_Data = await GetLeavesApplyByID()
            console.log(response_Data.data.message, 'Based on the EmpId leaves Applyications.')
            setLeavesData(response_Data.data.message)
            setLoader(false)
        }
        getApplyedLeaves()
    }, [])



    const handelTodate = (date) => {
        if (!Fromdate) return alert("Fill From Date first")
        let from = new Date(Fromdate)
        let to = new Date(date)
        const oneDay = 24 * 60 * 60 * 1000
        setTotalDays(Math.round((to - from) / oneDay) + 1)
        setTodate(date)
    }

    const Handelclear = () => {
        setFromdate("")
        setTodate("")
        setTotalDays("0")
    }

    const HandelLeave = async () => {
        try {

            if (!Fromdate || !Todate || !leaveType || !ReasonLeave || !EmpEmailId) {
                console.log(ReasonLeave, 'ReasonLeave')
                return toast.error("Please fill the required filed's")
            }
            // make json data to send server
            const data = {
                ReasonLeave: ReasonLeave,
                EmpName: UserName.name,
                EmpID: UserName.teacher_Id,
                Fromdate: Fromdate,
                Emp_req_EmailId: EmpEmailId,
                EmpEmail: UserName.email,
                Todate: Todate,
                leaveType: leaveType,
                TotalDays: TotalDays

            }

            const response = await ApplyLeaveRequest(data)
            console.log(response.data.message == "leave application sent")
            if (response.data.message == "leave application sent") {
                toast.success(" Leave Application Sent Successfully!", {
                    style: {
                        border: "1px solid #4CAF50",
                        padding: "12px",
                        color: "#155724",
                        background: "#E6FFFA",
                        borderRadius: "8px",
                    },
                    iconTheme: {
                        primary: "#4CAF50",
                        secondary: "#fff",
                    },
                });
                return sethandelPoup(false)
            }
            else {
                toast.error("❌ Failed to Send Leave Application!", {
                    style: {
                        border: "1px solid #f44336",
                        padding: "12px",
                        color: "#721c24",
                        background: "#fdecea",
                        borderRadius: "8px",
                    },
                    iconTheme: {
                        primary: "#f44336",
                        secondary: "#fff",
                    },
                });
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handelPoup = (data) => {
        setid(data._id)
        sethandelshowPoup((prev) => !prev)
        setPoupData(data)
        console.log(data)
    }
    const handelPoupLeave = () => {
        if (UserLogin == null) {
            console.log("hey")
            setuserlogin(true);
            return
        }
        sethandelPoup(true)
    }
    return (
        <>
            <App />
            <Toaster />
            <PoupLogin check={userlogin}></PoupLogin>
            <div className="md:ml-64 p-4 md:p-6 min-h-screen bg-gray-100 space-y-6" >
                <AdminHeader pathname="ApplyLeave" />

                {/* Apply Button */}
                <button
                    onClick={handelPoupLeave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    <FaPlus /> Apply Leave
                </button>
                <DownloadReports data={LeavesData} fileName={dt} buttonName="Leave"></DownloadReports>
                {/* ================= MODAL ================= */}
                {handelpoup && (

                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white w-full max-w-2xl mx-3 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">

                                {/* Header */}
                                <div className="flex justify-between items-center px-6 py-4 border-b">
                                    <h2 className="font-semibold text-lg flex items-center gap-2">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <FaCalendarAlt className="text-blue-600 text-sm" />
                                        </div>
                                        Apply Leave
                                    </h2>      <button
                                        onClick={() => sethandelPoup(false)}
                                        className="text-gray-500 hover:text-black text-lg hover:cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="px-6 py-6 space-y-5">

                                    {/* Row 1 */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave Type</label>
                                            <select
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => setleavetype(e.target.value)}
                                            >
                                                <option value="">Select Leave Type</option>
                                                {["Casual Leave", "Sick Leave", "Emergency Leave", "On Duty"].map((data, idx) => (
                                                    <option key={idx} value={data}>{data}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Email to Request</label>
                                            <input
                                                type="email"
                                                required
                                                onChange={(e) => setEmpEmailId(e.target.value)}
                                                placeholder="example@college.edu"
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave From Date</label>
                                            <input
                                                type="date"
                                                value={Fromdate}
                                                onChange={(e) => setFromdate(e.target.value)}
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave To Date</label>
                                            <input
                                                type="date"
                                                value={Todate}
                                                onChange={(e) => handelTodate(e.target.value)}
                                                disabled={!Fromdate}
                                                className="border rounded-lg px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3 */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Total Days</label>
                                            <input
                                                readOnly
                                                value={TotalDays}
                                                className="bg-gray-100 border rounded-lg px-3 py-2"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-1 min-w-[48%]">
                                            <label className="mb-1 text-sm font-medium">Leave Reason</label>
                                            <textarea
                                                rows="1"
                                                onChange={(e) => setLeaveReason(e.target.value)}
                                                placeholder="Reason"
                                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                </div>

                                {/* Footer */}
                                <div className="flex justify-end gap-3 px-6 py-4 border-t">
                                    <button
                                        onClick={Handelclear}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                    >
                                        Clear
                                    </button>

                                    {ReasonLeave && <button
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                        onClick={HandelLeave}
                                    >
                                        Submit
                                    </button>}
                                </div>

                            </div>
                        </div>



                    </>
                )}
                {/* ================= RESPONSIVE TABLE ================= */}
                <div className="w-full overflow-x-auto bg-white rounded-lg">
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
                            {Loader ? (
                                <tr>
                                    <td colSpan={TbHeadings.length} className="h-40">
                                        <div className="flex justify-center items-center h-40">
                                            <Dataloading path="Leave" />
                                        </div>
                                    </td>
                                </tr>
                            ) : LeavesData === "No Leave Applications Yet" ? (
                                <tr>
                                    <td colSpan={TbHeadings.length} className="text-center p-5">
                                        No Leave Applications Yet
                                    </td>
                                </tr>
                            ) : (

                                LeavesData?.map((data, idx) => (
                                    <tr key={data._id} className="border-b hover:bg-gray-50" >
                                        <td className="p-3">{idx + 1}</td>
                                        <td className="p-3 whitespace-nowrap">{data.leaveType}</td>
                                        <td className="p-3 min-w-[200px]">{data.ReasonLeave}</td>
                                        <td className="p-3 break-all min-w-[220px]">
                                            <a href={`mailto:${data.EmpEmailId}`} className="text-blue-600">
                                                {data.EmpReq_EmailId}
                                            </a>
                                        </td>
                                        <td className="p-3 whitespace-nowrap">{data.EmpID}</td>
                                        <td className="p-3 whitespace-nowrap">
                                            {new Date(data.Fromdate).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 whitespace-nowrap">
                                            {new Date(data.Todate).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">{data.TotalDays}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-white text-xs ${data.Application_status === "Accepted"
                                                    ? "bg-green-500"
                                                    : data.Application_status === "Inprogress"
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                    }`}
                                            >
                                                {data.Application_status}
                                            </span>
                                        </td>
                                        <td className="p-3 whitespace-nowrap">
                                            {new Date(data.createdAt).toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            {handelshowPoup
                                                ?
                                                data._id === id ?
                                                    <button className={`px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 hover:cursor-pointer`} onClick={() => sethandelshowPoup(false)}>

                                                        Close

                                                    </button>
                                                    :

                                                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700" oonClick={() => handelPoup(data)}>
                                                        View


                                                    </button>

                                                :
                                                <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700" onClick={() => handelPoup(data)}>

                                                    View
                                                </button>

                                            }
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>


                {progress && <ProgressLoader />}
            </div>
            {handelshowPoup && <HandelshowPoupLeave PoupData={PoupData} click={handelPoup} />}
        </>
    )
}

export default ApplyLeave
