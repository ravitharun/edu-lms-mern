import React, { useState } from 'react'
import App from '../../App'
import { FaRegCalendarTimes, FaUpload } from 'react-icons/fa'
import AdminHeader from '../../Components/AdminHeader'
import AddingSoon from '../../Loaders/AddingSoon'
import { UserName } from '../../Apis/Islogin'
import { HandelUpload } from '../../Apis/FileUploadApi'

function UploadMaterilas() {
    const [Upload, setUpload] = useState(false)
    const [Name, setname] = useState("")
    const [Description, setDescription] = useState("")
    const [file, setfile] = useState(null)
    const Action="Material"

    const handelSubmit = async () => {
        const formdata = new FormData()
        formdata.append("Name", Name)
        formdata.append("Description", Description)
        formdata.append("file", file)
        formdata.append("Action", Action)
        formdata.append("teacher_info", JSON.stringify({
            teachername: UserName.name,
            teacher_profile: UserName.profilePreview,
            teacher_email: UserName.email
        }))
      
        await HandelUpload(formdata)

    }

    // handelClear
    const handelClear=()=>{
        setname("")
        setDescription("")
        setfile(null)
    }
    return (
        <>
            <App></App>
            <div className="md:ml-64 p-6 space-y-6 min-h-screen bg-gray-100">
                {/* ================= HEADER ================= */}
                <div className=''>
                    <AdminHeader pathname={"Upload Material"}></AdminHeader>
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3 mt-3">
                </h1>

                <div>
                    <button
                        onClick={() => setUpload(prev => !prev)}
                        className="rounded-lg border border-blue-600 px-5 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
                    >
                        Upload Material
                    </button>
                </div>


                {Upload && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg animate-scaleIn">

                            {/* Header */}
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                                Upload Details
                            </h2>

                            {/* Form */}
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Choose Section *                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        onChange={(e) => setname(e.target.value)}
                                        value={Name}
                                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"      value={Name}
                                        placeholder="Enter name"
                                        onChange={(e) => setname(e.target.value)}
                                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                              value={Description}
                                        placeholder="Enter description"
                                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Upload File <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) => setfile(e.target.files[0])}
                                        className="mt-1 w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-200"
                                    />
                                </div>
                            </form>

                            {/* Buttons */}
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setUpload(false)}
                                    className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handelSubmit}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={handelClear}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {false ? hi : <AddingSoon pathname={"Upload Material"}></AddingSoon>}


            </div>
        </>
    )
}

export default UploadMaterilas