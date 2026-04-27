import React, { useEffect, useState } from 'react'
import App from '../../App'
import { FaRegCalendarTimes, FaUpload } from 'react-icons/fa'
import AdminHeader from '../../Components/AdminHeader'
import AddingSoon from '../../Loaders/AddingSoon'
import { MaintanceMode, url, UserName } from '../../Apis/Islogin'
import { HandelUpload } from '../../Apis/FileUploadApi'
import toast, { Toaster } from 'react-hot-toast'
import Tablecomponets from '../../Components/Tablecomponets'
import { FetchClassByTecherId } from './TechersApiCall/FectchClassApi'
import Tomany from '../../Loaders/Tomany'
import Undermanitance from '../../Loaders/Undermanitance'
import axios from 'axios'

function UploadMaterilas() {
    const [classList, setClassList] = useState([])
    const [Upload, setUpload] = useState(false)
    const [Name, setsection] = useState("")
    const [subjectname, setsubjectname] = useState("")
    const [Description, setDescription] = useState("")
    const [file, setfile] = useState(null)
    const Action = "Material"
    const [requestTimeout, setrequestTimeout] = useState(false)
    const [subjects, setsubjects] = useState([])
    const [loader, setloader] = useState(false)

    const [fetchByClass, setfetchByclass] = useState('')
    useEffect(() => {
        const Fetch_Assignment = async () => {
            try {

                const reonse = await FetchClassByTecherId()
                console.log(reonse.data.message ,'reonse')
                if (reonse.status == 429) {
                    return setrequestTimeout(true)
                }
                setrequestTimeout(false)
                setClassList(reonse?.data?.message)

            } catch (error) {
                console.log(error.message, 'from the Fetching Teacher Pages Api Call.')
                toast.error(error.message === "Request failed with status code 404" ? "No UploadMaterilas Found" : "")
            }
        }
        Fetch_Assignment()
    }, [])


    useEffect(() => {
        const getBysubjects = () => {
            console.log(Name.split(" ")[1], 'Name')
            const getBysectionSubjects = classList.filter((data) => data.classId == Name.split(" ")[1])
            console.log(getBysectionSubjects[0]?.subjects, 'getBysectionSubjects')
            setsubjects(getBysectionSubjects[0]?.subjects)
        }
        getBysubjects()
    }, [Name])



    // fetch the subjects PDfs
    useEffect(() => {
        const FetchSubjectsPdfs = async () => {
            try {
                if (classList.length == 0) {

                    return
                }
                const response = await axios.get(`${url}/api/UploadResources/fetchPdfs`, {
                    params: {
                        ClassSection: fetchByClass
                    }
                })
                console.log(response.data.message, 'api response')
            } catch (error) {
                toast.error(error)
            }

        }
        FetchSubjectsPdfs()
    }, [fetchByClass])




    console.log(fetchByClass, 'fetchByClass')
    console.log(classList[0]?.classId + "-" + classList[0]?.department + "-" + classList[0]?.year, 'classList')






    // handelSubmit to upload Material
    const handelSubmit = async () => {
        if (!Name || !Description) {
            return toast.error("Fill The Required Input's.")
        }
        const formdata = new FormData()
        formdata.append("Name", Name)
        formdata.append("subjectname", subjectname)
        formdata.append("Description", Description)
        formdata.append("file", file)
        formdata.append("Action", Action)
        formdata.append("teacher_info", JSON.stringify({
            teachername: UserName.name,
            teacher_profile: UserName.profilePreview,
            teacher_email: UserName.email,
            teacher_id: UserName.teacher_Id
        }))
        try {
            setloader(true)
            const response = await HandelUpload(formdata)
            console.log(response.data.message == 'Pdf Upoloaded')
            if (response.data.message == 'Pdf Upoloaded') {
                toast.success('Pdf Upoloaded')

                setUpload(false)

                setfile(null)
                setDescription("")
                return setsubjectname("")
            }
            setloader(false)
        } catch (error) {
            toast.error(error)
        }
        finally {
            setloader(false)

        }


    }

    // handelClear
    const handelClear = () => {
        setsection("")
        setDescription("")

        setfile(null)
    }
console.log(subjects,'subjects')

    return (
        <omany>
            <App></App>
            <Toaster />

            {requestTimeout && <Tomany />}
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

                                <div className="w-full max-w-sm bg-white rounded-xl shadow p-4">
                                    <label
                                        htmlFor="section"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Choose a Section
                                    </label>
                                    <select
                                        id="section"
                                        onChange={(e) => setsection(e.target.value)}
                                        // disabled={section}

                                        className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition `}

                                    >
                                        <option selected disabled>


                                            --Select Section --

                                        </option>
                                        {
                                            classList.map((cls, idx) => (
                                                <option
                                                    key={idx}
                                                    title='ClassSection-department-Year'
                                                    value={`${cls.classId}-${cls.department}-${cls.year}`}
                                                    className={`text-gray-700   `}


                                                >
                                                    {cls.classId} - {cls.department} - {cls.year}
                                                </option>

                                            ))
                                        }

                                    </select>
                                </div>
                                <div className="w-full max-w-sm bg-white rounded-xl shadow p-4">
                                    <label
                                        htmlFor="section"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Choose a Subject<span className="text-red-500">*</span>
                                    </label>

                                    {subjects?.length == 0 ?

                                        <div className="mt-10 flex justify-center items-center h-[20px]">
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-gray-700">
                                                    No Subjects Assigned
                                                </p>

                                            </div>
                                        </div>
                                        :

                                        <select
                                            id="section"
                                            onChange={(e) => setsubjectname(e.target.value)}
                                            className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition `}

                                        >
                                            <option selected disabled>
                                                --Choose Subject--

                                            </option>


                                            {
                                                subjects?.map((cls, idx) => (
                                                    <>

                                                        <option
                                                            key={idx}
                                                            title='ClassSection-department-Year'
                                                            value={` ${cls?.subjectName}`}
                                                            className={`text-gray-700   `}


                                                        >
                                                            {cls?.subjectName}
                                                        </option>
                                                    </>

                                                ))
                                            }

                                        </select>
                                    }
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={Name}
                                        placeholder="Enter name"
                                        // onChange={(e) => setname(e.target.value)}
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

                                {Name && <button
                                    onClick={handelSubmit}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    {loader ? "Submittin.." : "submit"}
                                </button>}
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





                <div className="w-full max-w-sm bg-white rounded-xl shadow p-4">
                    <label
                        htmlFor="section"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Choose a Section
                    </label>
                    <select
                        id="section"
                        onChange={(e) => {
                            setfetchByclass(e.target.value)

                            console.log(e.target.value, 'vlu')
                        }
                        }
                        className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition `}

                    >
                        <option selected disabled>


                            --Select Section --

                        </option>
                        {
                            classList.map((cls, idx) => (
                                <option
                                    key={idx}
                                    title='ClassSection-department-Year'
                                    value={`${cls.classId}-${cls.department}-${cls.year}`}
                                    className={`text-gray-700   `}
                                >
                                    {cls.classId} - {cls.department} - {cls.year}
                                </option>

                            ))
                        }

                    </select>
                </div>
                <div className="w-full bg-white shadow-lg rounded-xl p-4">

                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Upload Material  </h2>

                    {/* Scroll wrapper for mobile */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-sm text-left">

                            {/* Table Head */}
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    {["Section", "Name", "Description", "Uploaded Date", "views", "Actions"].map(
                                        (data, idx) => (
                                            <th key={idx} className="px-4 py-3 whitespace-nowrap">
                                                {data}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200">

                                {classList.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6 text-gray-500">
                                            There is no Upload Material Found.
                                        </td>
                                    </tr>
                                ) : (
                                    classList.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition">

                                            <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.title}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.subject}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.date}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.status}</td>

                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">

                                                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition">
                                                        View
                                                    </button>

                                                    <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
                                                        Delete
                                                    </button>

                                                    {/* <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition">
              Edit
            </button> */}

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>



            </div>

        </omany>
    )
}

export default UploadMaterilas