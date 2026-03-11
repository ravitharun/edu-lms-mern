import React, { useState } from 'react'
import App from '../../App'
import toast, { Toaster } from 'react-hot-toast'
import AdminHeader from '../../Components/AdminHeader'
import { FaPlus } from 'react-icons/fa'
import ProgressLoader from '../../Loaders/Progressloader'
import { UserName, UserProfileInfo } from '../../Apis/Islogin'
import axios from 'axios'
import GetUserProfile from './TechersApiCall/GetUserProfile'
import { useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'
import ProfileLoading from '../../Loaders/ProfileLoading'

function TeachersProfile() {
    const [Edit, setEdit] = useState(false)
    const [Techername, setTEachername] = useState(UserProfileInfo?.Name)
    const [TecherEmail, setTEacherEmail] = useState(UserProfileInfo?.Email)
    const [profile, setTeacherProfile] = useState('')
    const [TecherId, setTeacherId] = useState(UserName.teacher_Id)
    const [TecheRole, setTeacherrole] = useState(UserName?.role)
    const [About, setAbout] = useState(UserProfileInfo?.About)
    const [Experience, setExperience] = useState(UserProfileInfo?.Experience)
    const [Phone, setPhone] = useState(UserProfileInfo?.PhoneNumber)
    const [Designation, setDesignation] = useState(UserProfileInfo?.Designation)
    const [Qualification, setQualification] = useState(UserProfileInfo?.Qualification)
    const [PrivewUrlImg, setPrivewUrlImg] = useState(UserProfileInfo?.ProfileUrl)
    const [isFill, setisfill] = useState([])

    const [Profileloader, SetLoader] = useState(false)


    useEffect(() => {
        const response = async () => {
            try {
                const response_profile = await GetUserProfile()

                if (response_profile.data.message == null) {
                    setisfill(null)
                    setEdit(true)
                    return
                }

                if (response_profile.data.message === "Token expired"
                ) {
                    toast.error("Token expired")
                    return window.location.href = "/login"
                }
                secureLocalStorage.setItem("userProfileInfo", response_profile.data.message)
                setisfill(response_profile.data.message)
            } catch (error) {
                if (error?.message === "Request failed with status code 401") {
                    toast.error("Token Expry")
                    return window.location.href = "/login"

                }
                console.log(error, 'error from the GetUserProfile.')
            }
        }
        response()
    }, [])
    // vallidation toast-check
    useEffect(() => {
        const validateInformation = () => {
            const get_Info = secureLocalStorage.getItem("userProfileInfo")
            if (get_Info == null) {
                return console.log(UserName, 'UserName we will disply')
            }
            if (!get_Info.About || !get_Info.Designation || !get_Info.Email || !get_Info.Experience || !get_Info.ID || !get_Info.Name || !get_Info.PhoneNumber || !get_Info.ProfileUrl || !get_Info.Qualification || !get_Info.Role) {
                setEdit(true)
                return toast.custom((t) => (
                    <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-lg px-5 py-3 rounded-lg">

                        <div className="text-yellow-500 text-lg">⚠️</div>

                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">
                                Profile Incomplete
                            </span>
                            <span className="text-sm text-gray-500">
                                Please complete your profile before continuing.
                            </span>
                        </div>

                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="ml-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                    </div>
                ));
            }

        }
        validateInformation()
    }, [])



    const ProfileEdit = () => {
        toast.success("Editing the Profie")
        setEdit(true)
    }

    const PrivewImges = (e) => {

        let fileUrl = e.target.files[0]
        const checkType = ['image/jpeg', "image/png"]
        setTeacherProfile(fileUrl)

        if (!checkType.includes(fileUrl.type)) {
            return toast.error(`only Accept these Format :${checkType}`)
        }
        if (e) {
            const url = URL.createObjectURL(fileUrl);

            setPrivewUrlImg(url);
        }



    }


    console.log(UserProfileInfo, 'UserProfileInfo Check ')
    // Save the Profile
    const SaveProfile = async () => {




        if (!Techername || !TecheRole || !PrivewUrlImg || !TecherId || !TecherEmail || !About || !Phone || !Experience || !Designation || !Qualification) {
            console.log({ Techername, TecheRole, PrivewUrlImg, TecherId, TecherEmail, About, Phone, Experience, Designation, Qualification }, "check the Data.")
            return alert("issue")
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
        formData.append("ProfileUrl", PrivewUrlImg);
        try {
            SetLoader(true)
            const response_update_Profile = await axios.post("http://localhost:5001/api/Profile/CreateProfile", formData);

            if (response_update_Profile.data.message === "Profile Updated.") {
                SetLoader(false)
                toast.custom((t) => (
                    <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-lg px-5 py-3 rounded-lg">

                        <div className="text-yellow-500 text-lg">✅</div>

                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">
                                Profile Updated.
                            </span>

                        </div>

                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="ml-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                    </div>
                ));

                setEdit(false)
                return
            }

        }
        catch (error) {
            SetLoader(false)

            if (error.message === 'Request failed with status code 500') {
                return toast.error("Server Error.")
            }
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
                                src={Edit ? PrivewUrlImg : UserProfileInfo?.ProfileUrl}
                                alt={Edit ? "Image" : UserProfileInfo?.Name}
                                className="w-16 h-16 rounded-full object-cover border"
                            />

                            {/* User Info */}
                            {!Edit && (
                                <div className="flex-1" title={`Hey ${UserProfileInfo?.Name?.toUpperCase()}`}>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {UserProfileInfo?.Name}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium text-gray-700">Role:</span> {UserProfileInfo?.Role}
                                    </p>
                                </div>
                            )}

                            {/* Upload Image */}
                            {Edit && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-red-400">Add Your Profile</span>
                                    {Profileloader && "LOADING THE PAGE."}

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
                                    {Profileloader ?

                                        "Saving the profile." : <button
                                            onClick={SaveProfile}
                                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                        >
                                            Save Changes
                                        </button>}
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
                                    value={Techername}
                                    required
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={UserProfileInfo?.Name}
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
                                    type="email"
                                    onChange={(e) => setTEacherEmail(e.target.value)}
                                    placeholder='Email'
                                    value={TecherEmail}

                                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 "
                                /></> :


                                <input
                                    type="text"
                                    value={UserProfileInfo?.Email}
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
                                    value={About}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                                />
                            </> :
                                <textarea
                                    placeholder="Write about yourself..."
                                    rows={5}
                                    value={UserProfileInfo?.About}
                                    readOnly
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
                                value={UserProfileInfo?.ID}
                                readOnly
                                className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                            />
                        </div>

                        {/* Role */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Role</label>
                            <input
                                type="text"
                                value={UserProfileInfo?.Role}
                                readOnly
                                className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                            />
                        </div>

                        {/* Experience */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Experience</label>
                            {Edit ? (
                                <input
                                    type="number"
                                    placeholder="Years of experience"
                                    value={Experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            ) : (
                                <input
                                    type="number"
                                    value={UserProfileInfo?.Experience || ""}
                                    placeholder="Years of experience"
                                    disabled
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
      bg-gray-100 border-gray-200"
                                />
                            )}
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Phone</label>
                            {Edit ? <>
                                <div>  {UserProfileInfo?.PhoneNumber == null ? <span className='text-red-500'>Missiing Mobile Number</span> : ""}</div>
                            </> : ""}
                            {Edit ? <>

                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}

                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </> :

                                <>

                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        value={UserProfileInfo?.PhoneNumber}
                                        readOnly
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
                                value={Designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            /></> : <>
                                <input
                                    type="text"
                                    placeholder="Assistant Professor"
                                    value={UserProfileInfo?.Designation}
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
                                    value={Qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                    placeholder="M.Tech / PhD"
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </> :


                                <input
                                    type="text"
                                    placeholder="M.Tech / PhD"
                                    value={UserProfileInfo?.Designation}
                                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            }
                        </div>

                    </div>

                </div>



            </div>

            {Profileloader && <>
                <ProfileLoading checkResponse={Profileloader}></ProfileLoading>
            </>}



        </>
    )
}

export default TeachersProfile