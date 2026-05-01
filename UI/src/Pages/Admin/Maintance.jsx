import React, { useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import Announcement from '../../Components/Announcement'
import { url, UserName } from '../../Apis/Islogin'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import MaintanceToast from '../../Components/CustomToast/MaintanceToast'
import { useEffect } from 'react'
import { FetchMaintanceMode, HandelUpdate } from './APIS/maintanceModeApi'


function Maintance() {
    const [Activate, setActivate] = useState(null)
    const [ActivateTime, setActivateTime] = useState('')
    const [ActivateText, setActivateText] = useState('')
    const [showAlert, setshowalert] = useState(false)
    const [toastText, settoastText] = useState("")
    const [MaintanceMode, setMaintanceMode] = useState([])
    const [loader, setloder] = useState(false);
    const [type, setypeToast] = useState("")



    useEffect(() => {
        const response = async () => {
            try {
                const response = await FetchMaintanceMode()
                setMaintanceMode(response.data.date)
            } catch (error) {
                toast.error(error.message)

            }
        }
        response()

    }, [])




    const handleReset = () => {
        setActivate(false)
        setActivateTime('')
        setActivateText('')
    }
    // AddMode
    const ActivateMode = async (e) => {
        e.preventDefault()

        try {

            const data = {
                Activate,
                ActivateTime,
                ActivateText,
                Admin_Id: UserName?.Admin_Id

            }
            console.log(data, 'data')
            setloder(true)
            const response = await axios.post(`${url}/api/maintanceMode/Activate`, { data: data })
            console.log(response.data.message, 'response')
            if (response.data.message === 'Maintance Mode Activated.') {
                setypeToast("success")
                setshowalert(true)
                settoastText(response.data.message)
                setloder(false)

            }

        } catch (error) {
            console.log(error.response.data, 'err')
            const err = ['date and text is required.', 'Activate Mode is required.', "Mode already exists, updating instead of creating duplicate"]
            if (err.includes(error.response.data.message)) {
                setshowalert(true)
                setypeToast("warning")
                return settoastText(error.response.data.message)
            }
        }
        finally {
            setloder(false)
        }
    }

    const handelUpdte = async(id, type) => {
        console.log({ id, type })
        const data = { id, type }
        const response = await HandelUpdate(data)
        console.log(response,'response')

    }

    return (
        <>
            <div className="min-h-screen flex bg-gray-50">
                <Toaster />
                <Announcement />

                {/* Sidebar */}
                <MasterAdminNavbar path="Maintance Mode" Active={true} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">

                    {/* Top Navbar */}
                    <MasterLogoNav path="Dashboard" />

                    <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">

                        <div className="max-w-7xl mx-auto space-y-8">
                            <form>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                    {/* LEFT */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                System Status
                                            </h2>
                                        </div>

                                        <div className="p-5 bg-gray-50 rounded-xl">
                                            <p className="text-gray-600 text-sm mb-2">Current Mode</p>
                                            <h1 className="text-2xl font-bold text-red-600">
                                                Maintenance Mode
                                            </h1>
                                            <p className="text-sm text-gray-500 mt-2">
                                                LMS is currently restricted for all users
                                            </p>
                                        </div>

                                        <div className="mt-5 flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                                            <span className="text-gray-700 font-medium">
                                                Enable Maintenance <span className="text-red-500">*</span>
                                            </span>

                                            <input
                                                type="checkbox"
                                                checked={Activate}
                                                onChange={() => setActivate((prev) => !prev)}
                                                className="w-5 h-5 accent-red-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Maintenance Settings
                                        </h2>

                                        {/* Time */}
                                        <div className="mb-4">
                                            <label className="text-sm text-gray-600">
                                                Estimated Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="datetime-local"
                                                onChange={(e) => setActivateTime(e.target.value)}
                                                value={ActivateTime}
                                                required
                                                className="w-full mt-2 p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
                                            />
                                        </div>

                                        {/* Message */}
                                        <div className="mb-4">
                                            <label className="text-sm text-gray-600">
                                                Message for Users <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows="4"
                                                onChange={(e) => setActivateText(e.target.value)}
                                                value={ActivateText}
                                                required
                                                className="w-full mt-2 p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
                                            />
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                                                onClick={(e) => ActivateMode(e)}
                                            >
                                                {loader ? "Activating.." : "Activate"}
                                            </button>

                                            <button
                                                type="button"
                                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-medium transition"
                                                onClick={handleReset}
                                            >
                                                Reset
                                            </button>
                                        </div>

                                    </div>


                                </div>
                            </form>
                            <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

                                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">

                                    {/* Header */}
                                    <div className="p-4 border-b flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-700">
                                            Maintenance Mode Logs
                                        </h2>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">

                                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                                <tr>
                                                    <th className="p-3">S.No</th>
                                                    <th className="p-3">Added By</th>
                                                    <th className="p-3">Maintenance Until</th>
                                                    <th className="p-3">Status</th>
                                                    <th className="p-3">Created At</th>
                                                    <th className="p-3">Updated At</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {MaintanceMode.map((data, idx) => (
                                                    <tr
                                                        key={data._id || idx}
                                                        className="border-b hover:bg-gray-50 transition"
                                                    >
                                                        <td className="p-3 font-medium text-gray-700">
                                                            {idx + 1}
                                                        </td>

                                                        <td className="p-3">{data.modeAddedBy}</td>

                                                        <td className="p-3 text-gray-600">
                                                            {new Date(data.maintenanceUntil).toLocaleString()}
                                                        </td>

                                                        {/* Status Button */}
                                                        <td className="p-3">
                                                            {data.isMaintenanceMode ? (
                                                                <button className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition" onClick={() => handelUpdte(data._id, false)}>
                                                                    Deactivate
                                                                </button>
                                                            ) : (
                                                                <button className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition" onClick={() => handelUpdte(data._id, true)}>
                                                                    Activate
                                                                </button>
                                                            )}
                                                        </td>

                                                        <td className="p-3 text-gray-500 text-xs">
                                                            {new Date(data.createdAt).toLocaleString()}
                                                        </td>

                                                        <td className="p-3 text-gray-500 text-xs">
                                                            {new Date(data.updatedAt).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* ALERT */}
            {showAlert && (
                <>



                    <MaintanceToast setshowalert={setshowalert} text={toastText} type={type}></MaintanceToast>
                </>

            )}



        </>

    )
}

export default Maintance