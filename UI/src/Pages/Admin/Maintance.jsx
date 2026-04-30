import React, { useState } from 'react'
import MasterLogoNav from './MasterLogoNav'
import MasterAdminNavbar from './MasterAdminNavbar'
import Announcement from '../../Components/Announcement'
import { url, UserName } from '../../Apis/Islogin'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


function Maintance() {
    const [Activate, setActivate] = useState(null)
    const [ActivateTime, setActivateTime] = useState('')
    const [ActivateText, setActivateText] = useState('')

    const handleReset = () => {
        setActivate(false)
        setActivateTime('')
        setActivateText('')
    }
    const ActivateMode = async () => {
        try {
            const data = {
                Activate,
                ActivateTime,
                ActivateText,
                Admin_Id: UserName?.Admin_Id

            }
            console.log(data, 'data')
            const response = await axios.post(`${url}/api/maintanceMode/Activate`, { data: data })
            console.log(response.data.message, 'response')
            console.log(response.data.status, 'response')
        } catch (error) {
            console.log(error.response.data)
            const err = ['date and text is required.', 'Activate Mode is required.']
            if (err.includes(error.response.data.message)) {
                return toast.error(error.response.data.message)
            }
        }
    }
    return (
        <>
            <div className="min-h-screen flex bg-gray-50">
                <Toaster></Toaster>
                <Announcement></Announcement>
                {/* Sidebar */}
                <MasterAdminNavbar path="Maintance Mode" Active={true} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">

                    {/* Top Navbar */}
                    <MasterLogoNav path="Dashboard" />
                    <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">

                        <div className="max-w-7xl mx-auto space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* LEFT - Status Card */}
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
                                        <span className="text-gray-700 font-medium">Enable Maintenance <span className='text-red-500'>*</span></span>

                                        <input
                                            type="checkbox"
                                            checked={Activate}
                                            onChange={() => setActivate((prev) => !prev)}
                                            className="w-5 h-5 accent-red-500 cursor-pointer"
                                        />
                                    </div>

                                </div>

                                {/* RIGHT - Settings Card */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                        Maintenance Settings
                                    </h2>

                                    {/* Estimated Time */}
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-600">Estimated Time <span className='text-red-500'>*</span></label>
                                        <input
                                            type="datetime-local"
                                            placeholder="e.g. 2 hours / 10AM - 12PM"
                                            onChange={(e) => setActivateTime(e.target.value)}
                                            value={ActivateTime}

                                            className="w-full mt-2 p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-600">Message for Users <span className='text-red-500'>*</span></label>
                                        <textarea
                                            rows="4"
                                            placeholder="We are upgrading LMS, please wait..."
                                            onChange={(e) => setActivateText(e.target.value)}
                                            value={ActivateText}

                                            className="w-full mt-2 p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition" onClick={ActivateMode}>
                                            Activate
                                        </button>

                                        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-medium transition" onClick={handleReset}>
                                            Reset
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </main>
                </div>


            </div >


        </>)
}

export default Maintance