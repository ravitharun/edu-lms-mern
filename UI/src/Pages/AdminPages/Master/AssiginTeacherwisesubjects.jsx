import React, { useEffect, useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import { fetchAllSubjects, fetchAllTeacherName } from './APIS/GetAll-subjects'
import toast, { Toaster } from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'

function AssiginTeacherwisesubjects() {
    const [GetSubjects, Setsubjects] = useState([])
    const [ChooseSubjects, setChooseSubjects] = useState('')

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response_sudjects = await fetchAllSubjects()
                console.log(response_sudjects.data.message)
                Setsubjects(response_sudjects.data.message)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getSubjects()
        const getTeachersName = async () => {
            try {
                const response_sudjects = await fetchAllTeacherName()
                console.log(response_sudjects.data.message)
                Setsubjects(response_sudjects.data.message)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getTeachersName()
    }, [])
    const assignSubjects = () => {
        if (ChooseSubjects == "") {
            console.log("Please verify the subject and course details before assigning it to the teacher")
            return toast.error("Please verify the subject and course details before assigning it to the teacher.")
        }
        console.log(ChooseSubjects)
    }
    return (
        <>
            <Toaster />
            <div className="min-h-screen flex bg-gray-50">
                {/* Sidebar */}
                <MasterAdminNavbar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">
                    {/* Navbar */}
                    <MasterLogoNav path="Assign Teacher" />

                    {/* Scrollable Content */}
                    <main className="flex-1 pt-16 md:ml- pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
                        <div className="max-w-7xl mx-auto mt-10 flex items-center justify-between">

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Assign Teachers to Subjects
                                </h2>

                                <hr className="mt-3 h-1 w-24 border-0 rounded-full bg-blue-500" />
                                <div className="flex flex-col gap-1 w-full max-w-md">
                                    <label
                                        htmlFor="choose_Subject"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Select Subject
                                    </label>

                                    <select
                                        id="choose_Subject"
                                        name="Subject"
                                        onChange={(e) => setChooseSubjects(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            -- Choose Subject --
                                        </option>

                                        {GetSubjects.map((sub, idx) => (
                                            <option value={sub.subject} key={idx}>
                                                {sub.subject} ({sub.courseId})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                        
                                <button
                                    onClick={assignSubjects}
                                    className="mt-4 inline-flex items-center gap-2 rounded-md
             bg-blue-600 px-5 py-2 text-sm font-semibold text-white
             hover:bg-blue-700 active:scale-95 transition"
                                >
                                    <FaPlus className="text-sm" />
                                    Assign Subject
                                </button>

                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AssiginTeacherwisesubjects