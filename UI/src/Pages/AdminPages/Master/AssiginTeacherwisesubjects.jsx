import React, { useEffect, useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import { AssignTeacher, fetchAllSubjects, fetchAllTeacherName } from './APIS/GetAll-subjects'
import toast, { Toaster } from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'
import Swal from "sweetalert2";

function AssiginTeacherwisesubjects() {
    const [GetSubjects, Setsubjects] = useState([])
    const [subjectsName, SetsubjectsName] = useState([])
    const [ChooseSubjects, setChooseSubjects] = useState('')
    const [ChooseTecherName, setChooseTecherName] = useState('')
    const FakeData = [{
        courseId: "cse101",
        subject: "java Programming",
        teacher_Id: "tech-122",
        assign_Teacher: "ravi tharun",
        action: true

    },
    {
        courseId: "cse101",
        subject: "java Programming",
        assign_Teacher: "ravi tharun", teacher_Id: "tech-102",
        action: true

    },
    {
        courseId: "cse101",
        subject: "java Programming",
        assign_Teacher: "ravi tharun", teacher_Id: "tech-142",
        action: true

    }]
    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response_sudjects = await fetchAllSubjects()

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

                SetsubjectsName(response_sudjects.data.message)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getTeachersName()
    }, [])



    const assignSubjects = async () => {
        if (!ChooseSubjects || !ChooseTecherName) {
            console.log("Please verify the subject and course details before assigning it to the teacher")
            return toast.error("Please verify the subject and course details before assigning it to the teacher.")
        }
        const data_choose = {
            ChooseSubjects,
            ChooseTecherName
        }

        // const reponse = await AssignTeacher(data_choose)
        Swal.fire({
            title: "Confirm Assign",
            text: `Assign ${data_choose.ChooseSubjects} to Prof. ${data_choose.ChooseTecherName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Assign",
            cancelButtonText: "No",
            buttonsStyling: false,
            customClass: {
                popup: "rounded-lg",
                confirmButton:
                    "bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium mr-2",
                cancelButton:
                    "bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await AssignTeacher(data_choose);

                    // ✅ SweetAlert success AFTER API
                    Swal.fire({
                        title: "Assigned!",
                        text: "Teacher assigned successfully",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } catch (err) {
                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to assign teacher";

                    // ❌ Error toast
                    toast.error(message);
                }
            }
        });



    }
    return (
        <>
            <Toaster />
            <div className="min-h-screen flex bg-gray-50 overflow-x-hidden">
                {/* Sidebar */}
                <MasterAdminNavbar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">
                    {/* Navbar */}
                    <MasterLogoNav path="Assign Teacher" />

                    <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto overflow-x-hidden">
                        <div className="max-w-7xl mx-auto mt-10">

                            {/* RESPONSIVE ROW */}
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 w-full">

                                {/* LEFT SIDE */}
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Assign Teachers to Subjects
                                    </h2>
                                    <div className="mt-2 h-1 w-24 rounded-full bg-blue-500" />
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="flex flex-col sm:flex-row flex-wrap items-end gap-4 w-full lg:w-auto">

                                    {/* SUBJECT */}
                                    <div className="flex flex-col gap-1 w-full sm:w-44">
                                        <label className="text-xs font-medium text-gray-600">
                                            Choose Subject
                                        </label>
                                        <select
                                            onChange={(e) => setChooseSubjects(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>-- Subject --</option>
                                            {GetSubjects.map((sub, idx) => (
                                                <option key={idx} value={sub.subject}>
                                                    {sub.subject}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* TEACHER */}
                                    <div className="flex flex-col gap-1 w-full sm:w-44">
                                        <label className="text-xs font-medium text-gray-600">
                                            Choose Teacher
                                        </label>
                                        <select
                                            onChange={(e) => setChooseTecherName(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>-- Teacher --</option>
                                            {subjectsName.map((sub, idx) => (
                                                <option key={idx} value={sub.name}>
                                                    {sub.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* BUTTON */}
                                    <button
                                        onClick={assignSubjects}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                         rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white
                         hover:bg-blue-700 active:scale-95 transition"
                                    >
                                        <FaPlus className="text-sm" />
                                        Assign
                                    </button>

                                </div>


                            </div>
                            <div className="mt-8 overflow-x-auto">
                                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">

                                    {/* TABLE HEAD */}
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Subject
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Course ID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Teacher
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Teacher ID
                                            </th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* TABLE BODY */}
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {FakeData.length > 0 ? (
                                            FakeData.map((data, idx) => (
                                                <tr className="hover:bg-gray-50" key={idx}>
                                                    <td className="px-4 py-3 text-sm text-gray-800">
                                                        {data.subject}
                                                    </td>

                                                    <td className="px-4 py-3 text-sm text-gray-800">
                                                        {data.courseId}
                                                    </td>

                                                    <td className="px-4 py-3 text-sm text-gray-800">
                                                        {data.assign_Teacher}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">
                                                        {data.teacher_Id}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">
                                                            Unassign
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="px-4 py-6 text-center text-sm text-gray-500"
                                                >
                                                    No assignments found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>


                        </div>
                    </main>
                </div>
            </div>

        </>
    )
}

export default AssiginTeacherwisesubjects