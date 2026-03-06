import React, { useState } from 'react'
import App from '../../App'
import toast, { Toaster } from 'react-hot-toast'
import AdminHeader from '../../Components/AdminHeader'
import { FaPlus } from 'react-icons/fa'
import ProgressLoader from '../../Loaders/Progressloader'
import { UserName } from '../../Apis/Islogin'

function TeachersProfile() {
    const [Edit, setEdit] = useState(false)
    const [Techername, setTEachername] = useState("")
    const [TecherEmail, setTEacherEmail] = useState("")
    const [TecherProfile, setTeacherProfile] = useState(null)
    const [TecherId, setTeacherId] = useState(UserName?.teacher_Id)
    const [TecheRole, setTeacherrole] = useState(UserName?.role)
    const ProfileEdit = () => {
        toast.success("Editing the Profie")
        setEdit(true)
    }
    const SaveProfile = () => {

        if (!Techername || !TecheRole || !TecherProfile || !TecherId || !TecherEmail) {
            return toast.error('Fill the reuired')
        }
        const data = {
            Techername,
            TecheRole,
            TecherId,
            TecherEmail,
            TecherProfile,
        }
        console.log(data)
        toast.success("saving the Profile....😊😊😊")
    }
    return (
        <>
            <App />
            <Toaster />

            <div className="md:ml-64 min-h-screen bg-gray-50 p-4 md:p-8">

                <AdminHeader pathname={"Teachers Profile"} />
                <div className="max-w-3xl mx-auto bg-white border rounded-lg p-6 mt-15">

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 border-b pb-6">
                        {Edit ?
                            <>
                                <p>Add Your Profile</p>
                                <img
                                    src=""
                                    alt="
                            
                            "
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </>

                            :
                            <img
                                src={UserName?.profilePreview}
                                alt={UserName?.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        }

                        {
                            
                            Edit?"":
                            <div className="flex-1" title={`Hey ${UserName?.name.toUpperCase()}`}>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {UserName?.name}
                            </h2>


                            <p className="text-sm text-gray-500 mt-1" title='Role'>
                                <span className="font-medium text-gray-700">Role:</span> {UserName?.role}
                            </p>
                        </div>}
                        {/* SaveProfile */}
                        {Edit ?
                            <>

                                <div className="flex gap-3 mt-6">

                                    {/* Cancel */}
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    {/* Save */}
                                    <button
                                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
                                        onClick={SaveProfile}
                                    >
                                        Save Changes
                                    </button>

                                </div>
                            </>


                            :

                            <button className="text-sm px-4 py-2 border rounded-md hover:bg-gray-100" onClick={ProfileEdit}>
                                Edit
                            </button>

                        }



                    </div>

                    {/* Form Section */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">

                        <div>
                            <label className="text-sm text-gray-600">Name</label>
                            {Edit ? <>
                                <input
                                    type="text"

                                    className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                            </> :
                                <input
                                    type="text"
                                    value={UserName?.name}
                                    className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                            }

                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                type="text"
                                value={UserName?.email}
                                className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Teacher ID</label>
                            <input
                                type="text"
                                value={UserName?.teacher_Id}
                                readOnly
                                className="w-full mt-1 border rounded-md p-2 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Role</label>
                            <input
                                type="text"
                                value={UserName?.role}
                                readOnly
                                className="w-full mt-1 border rounded-md p-2 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                    </div>

                </div>

                {true && <ProgressLoader />}

            </div>
        </>
    )
}

export default TeachersProfile