import React, { useState } from 'react'
import App from '../../App'
import toast, { Toaster } from 'react-hot-toast'
import AdminHeader from '../../Components/AdminHeader'
import { FaPlus } from 'react-icons/fa'
import ProgressLoader from '../../Loaders/Progressloader'
import { UserName } from '../../Apis/Islogin'
import axios from 'axios'
import GetUserProfile from './TechersApiCall/GetUserProfile'
import { useEffect } from 'react'

function TeachersProfile() {
    const [Edit, setEdit] = useState(false)
    const [Techername, setTEachername] = useState("")
    const [TecherEmail, setTEacherEmail] = useState(UserName?.name)
    const [profile, setTeacherProfile] = useState('')
    const [TecherId, setTeacherId] = useState(UserName?.teacher_Id)
    const [TecheRole, setTeacherrole] = useState(UserName?.role)
    const [About, setAbout] = useState(UserName?.About)
    const [Experience, setExperience] = useState(UserName?.Experience)
    const [Phone, setPhone] = useState(UserName?.Phone)
    const [Designation, setDesignation] = useState(UserName?.Designation)
    const [Qualification, setQualification] = useState(UserName?.Qualification)
    const [PrivewUrlImg, setPrivewUrlImg] = useState("")

    const [Profileloader, SetLoader] = useState(false)


    useEffect(() => {
        const response = async () => {
            try {
                const response_profile = await GetUserProfile()
                console.log(response_profile)
            } catch (error) {
                console.log(error, 'error from the GetUserProfile.')
            }
        }
        response()
    }, [])


    const ProfileEdit = () => {
        toast.success("Editing the Profie")
        setEdit(true)
    }

    const PrivewImges = (e) => {
        console.log(e.target.files[0], 'imgurl')
        let fileUrl = e.target.files[0]
        const checkType = ['image/jpeg', "image/png"]
        setTeacherProfile(fileUrl)
        console.log(fileUrl, 'imgurl.target.files[0]')
        if (!checkType.includes(fileUrl.type)) {
            return toast.error(`only Accept these Format :${checkType}`)
        }
        if (e) {
            const url = URL.createObjectURL(fileUrl);
            console.log(url, 'url')
            setPrivewUrlImg(url);
        }



    }

    const SaveProfile = async () => {
        console.log(Techername, ' : Techername')
        SetLoader(true)

        if (!Techername || !TecheRole || !profile || !TecherId || !TecherEmail || !About || !Phone || !Experience || !Designation || !Qualification) {
            console.log({ Techername, TecheRole, TecherProfile, TecherId, TecherEmail, About, Phone, Experience, Designation, Qualification })
            return toast.error('Fill the reuired')
        }
        const formData = new FormData();

        formData.append("Techername", Techername);
        formData.append("TecheRole", TecheRole);
        formData.append("TecherId", TecherId);
        formData.append("TecherEmail", TecherEmail);
        formData.append("Designation", Designation);
        formData.append("Qualification", Qualification);
        formData.append("About", About);
        formData.append("Phone", Phone);
        formData.append("Experience", Experience);
        formData.append("profile", profile);
        toast.success("saving the Profile....😊😊😊")
        try {
            const response_update_Profile = await axios.post(
                "http://localhost:5001/api/Profile/CreateProfile",
                formData
            ); console.log(response_update_Profile, 'response_update_Profile form the Profile')
        } catch (error) {
            console.log(error.message, 'err')
        }


    }


    return (
        <>
            <App />
            <Toaster />

            <div className="md:ml-64 min-h-screen bg-gray-50 p-4 md:p-8">

                <AdminHeader pathname={"Teachers Profile"} />
                <div className="max-w-3xl mx-auto bg-white border rounded-lg p-6 mt-15">

                    {/* Profile Section */}
                    <div className="flex items-center justify-between border-b pb-6">

                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4">

                            {/* Profile Image */}
                            <img
                                src={Edit ? PrivewUrlImg : UserName?.profilePreview}
                                alt={Edit ? "Image" : UserName?.name}
                                className="w-16 h-16 rounded-full object-cover border"
                            />

                            {/* User Info */}
                            {!Edit && (
                                <div className="flex-1" title={`Hey ${UserName?.name?.toUpperCase()}`}>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {UserName?.name}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium text-gray-700">Role:</span> {UserName?.role}
                                    </p>
                                </div>
                            )}

                            {/* Upload Image */}
                            {Edit && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-red-400">Add Your Profile</span>

                                    <input
                                        type="file"
                                        className="text-sm text-gray-600 
  file:mr-4 file:py-2 file:px-4
  file:rounded-md file:border-0
  file:text-sm file:font-medium
  file:bg-blue-500 file:text-white
  hover:file:bg-blue-600
  cursor-pointer"
                                        onChange={(e) => PrivewImges(e)}
                                    />
                                </div>
                            )}

                        </div>


                        {/* RIGHT SIDE BUTTONS */}
                        <div className="flex gap-3">

                            {Edit ? (
                                <>
                                    {/* Cancel */}
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>

                                    {/* Save */}
                                    <button
                                        onClick={SaveProfile}
                                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
                                    onClick={ProfileEdit}
                                >
                                    Edit
                                </button>
                            )}

                        </div>

                    </div>

                    {/* Form Section */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">

                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Name</label>

                            {Edit ? (
                                <input
                                    type="text"
                                    placeholder="Enter full name"

                                    onChange={(e) => setTEachername(e.target.value)}

                                    required
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={UserName?.name}
                                    readOnly
                                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
                                />
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            {Edit ? <>
                                <input
                                    type="text"
                                    onChange={(e) => setTEacherEmail(e.target.value)}
                                    placeholder='Email'
                                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 "
                                /></> :


                                <input
                                    type="text"
                                    value={UserName?.email}
                                    readOnly
                                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                                />
                            }
                        </div>

                        {/* About */}
                        <div className="md:col-span-2 flex flex-col">
                            <label className="text-sm font-medium text-gray-700">About</label>
                            {Edit ? <>

                                <textarea
                                    placeholder="Write about yourself..."
                                    rows={5}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                                />
                            </> :
                                <textarea
                                    placeholder="Write about yourself..."
                                    rows={5}
                                    value={About}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                                />
                            }
                        </div>

                        {/* Teacher ID */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Teacher ID</label>
                            <input
                                type="text"
                                value={UserName?.teacher_Id}
                                readOnly
                                className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                            />
                        </div>

                        {/* Role */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Role</label>
                            <input
                                type="text"
                                value={UserName?.role}
                                readOnly
                                className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                            />
                        </div>

                        {/* Experience */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Experience</label>
                            {Edit ? <>
                                <input
                                    type="number"
                                    placeholder="Years of experience"
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />

                            </> :


                                <input
                                    type="number"
                                    value={Experience}
                                    placeholder="Years of experience"
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            }
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Phone</label>
                            {Edit ? <>

                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </> :

                                <>

                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        value={Phone}
                                        className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </>
                            }
                        </div>

                        {/* Designation */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Designation</label>
                            {Edit ? <><input
                                type="text"
                                placeholder="Assistant Professor"
                                onChange={(e) => setDesignation(e.target.value)}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            /></> : <>
                                <input
                                    type="text"
                                    placeholder="Assistant Professor"
                                    value={Designation}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 

            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </>}
                        </div>

                        {/* Qualification */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Qualification</label>
                            {Edit ? <>

                                <input
                                    type="text"
                                    onChange={(e) => setQualification(e.target.value)}
                                    placeholder="M.Tech / PhD"
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </> :


                                <input
                                    type="text"
                                    placeholder="M.Tech / PhD"
                                    value={Designation}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            }
                        </div>

                    </div>

                </div>

                {true && <ProgressLoader />}

            </div>

            {Profileloader && <>
                Loding
            </>}
        </>
    )
}

export default TeachersProfile