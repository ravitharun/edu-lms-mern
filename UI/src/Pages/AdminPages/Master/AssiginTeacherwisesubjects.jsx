import React, { useEffect, useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import { AssignTeacher, fetchAllSubjects, fetchAllTeacherName, GetAllSubjectsAssignedTeacher, HandelUnassignApi } from './APIS/GetAll-subjects'
import toast, { Toaster } from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'
import Swal from "sweetalert2";
import { fun } from '../../../Components/UserisLogin'
import { Header_Token_expry } from '../../../Apis/Islogin'
import axios from 'axios'
import Dataloading from '../../../Loaders/Dataloading'

function AssiginTeacherwisesubjects() {
    const [GetSubjects, Setsubjects] = useState([])
    const [subjectsName, SetsubjectsName] = useState([])
    const [ChooseSubjects, setChooseSubjects] = useState('')
    const [ChooseTecherName, setChooseTecherName] = useState('')
    const [fetchAssignedSubjects, setfetchAssignedSubjects] = useState([])
    const [loader, setLoader] = useState(false)
    const [Assigned, setAssigned] = useState(false)
    useEffect(() => {
        fun()
    }, [])
    useEffect(() => {
        const fetch = async () => {
            try {
                setLoader(true)
                const data = await GetAllSubjectsAssignedTeacher()
                console.log(data, 'data')
                const filterByAssign_False = data.filter((itm) => itm.subjects[0]
                    .Assign == true)
                console.log(filterByAssign_False, 'false')
                setfetchAssignedSubjects(data)
                setLoader(0)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetch()
    }, [])



    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response_sudjects = await fetchAllSubjects()

                Setsubjects(response_sudjects.data?.message)
                // console.log(response_sudjects.status==401,'response ')
            }
            catch (err) {
                console.log(err.status, "getSubjects")
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

            return toast.error("Please verify the subject and course details before assigning it to the teacher.")
        }
        const data_choose = {
            ChooseSubjects,
            ChooseTecherName,
            classid: `${ChooseSubjects.split("-")[1]}${ChooseSubjects.split("-")[2]}`
        }


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
                    const data = await AssignTeacher(data_choose);

                    console.log(data)
                    return Swal.fire({
                        title: "Assigned!",
                        text: "Teacher assigned successfully",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });


                } catch (err) {
                    console.log(err.message, 'from thw assignTecher.jsx')
                }
            }
        });



    }


    const HandelUnassign = (id, teacherID) => {

        Swal.fire({
            title: "Do you want to Unassign the Teacher?",
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Unassign",
            // denyButtonText:  `
        }).then(async (result) => {
            console.log(result, 'resultresultresult')
            if (result.isConfirmed) {
                const response = await HandelUnassignApi(id, teacherID)
                if (response.data.message == "The teacher has been successfully unassigned from this subject.") {
                    return Swal.fire({
                        title: "Teacher Unassigned Successfully!",
                        html: `
        <p style="font-size:14px; margin-bottom:5px;">
            The teacher has been removed from this subject.
        </p>
        <b style="color:#16a34a; font-size:15px;">
            ${response.data.message}
        </b>
    `,
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#2563eb",
                        background: "#f9fafb",
                        timer: 3000,
                        showConfirmButton: true
                    });
                }


            }
            else (result.isDenied)
            {
                Swal.fire({
                    title: "Changes Not Saved",
                    html: `
        <p style="font-size:14px; margin-bottom:5px;">
            You have unsaved changes.
        </p>
        <span style="color:#2563eb; font-weight:500;">
            Please save your changes before leaving this page.
        </span>
    `,
                    icon: "info",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2563eb",
                    background: "#f9fafb"
                });
            }
        });
    }
    const Headings = ["s.no", "Calss ID", "Year", "Subjects", "Course ID", "Teacher", "Department", "  Teacher ID", "Action"]
Assigned[0]?.subjects?.map((item) => {
   console.log(item.classId,'tm')
})
    return (
        <>
            <Toaster />
            <div className="min-h-screen flex bg-gray-50 overflow-x-hidden">
                {/* Sidebar */}
                <MasterAdminNavbar path="Assign Teachers" Active={false} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">
                    {/* Navbar */}
                    <MasterLogoNav path="Assign Teacher" />

                    <main className="flex-1 pt-16 pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto overflow-x-hidden">
                        <div className="max-w-7xl mx-auto mt-10">

                            {/* RESPONSIVE ROW */}
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 w-full">

                                {/* LEFT SIDE */}
                                <div className="flex flex-col mt-10">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Assigned Teachers List
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        This table displays teachers who are currently assigned to subjects.
                                        If you click the <span className="font-medium text-red-500">Unassign</span> button for a teacher,
                                        the assignment will be removed and the teacher will appear in the
                                        <span className="font-medium text-gray-700"> Unassigned Teachers </span> table below.
                                        From there, you can assign the teacher again whenever required.
                                    </p>

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
                                                <option key={idx} value={`${sub.subject} -${sub.department}-${sub.year}-${sub.courseId}`}>
                                                    {sub.subject} -{sub.department}-{sub.year}-{sub.courseId}
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
                                                <option key={idx} value={`${sub.name}@${sub.teacher_Id}@${sub.profilePreview}`}>
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

                                            {Headings.map((itm, idx) => (
                                                <th key={idx} className='px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>{itm}</th>
                                            ))}

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {loader ? (
                                            <tr>
                                                <td colSpan="9" className="h-64">
                                                    <div className="flex items-center justify-center h-full">
                                                        <Dataloading path="Assigning teacher to subject…
"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : fetchAssignedSubjects.length > 0 ? (
                                            fetchAssignedSubjects.map((data, idx) => (
                                                <tr className="hover:bg-gray-50" key={idx}>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{idx + 1}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.classId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.year}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.classId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.subjects[0].subjectId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.subjects[0].name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.department}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.subjects[0].teacherId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{data.teacher_Id}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button className="text-red-600 hover:text-red-800 hover:cursor-pointer  text-sm font-medium" onClick={() => HandelUnassign(data._id, data.subjects[0].teacherId)}>
                                                            Unassign
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9" className="px-4 py-6 text-center text-sm text-gray-500">
                                                    No assignments found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>

                            </div>
                            <div className="flex flex-col mt-10">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Unassigned Teachers List
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    This table shows teachers who are currently not assigned to any subjects.
                                    These teachers were previously unassigned from the table above.
                                    You can click the <span className="font-medium text-green-600">Assign</span> button
                                    to assign them again to a subject.
                                </p>

                                <div className="mt-2 h-1 w-24 rounded-full bg-green-500" />
                            </div>
                            <div className="mt-8 overflow-x-auto">
                                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">

                                    {/* TABLE HEAD */}
                                    <thead className="bg-gray-100">
                                        <tr>

                                            {Headings.map((itm, idx) => (
                                                <th key={idx} className='px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>{itm}</th>
                                            ))}

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {loader ? (
                                            <tr>
                                                <td colSpan="9" className="h-64">
                                                    <div className="flex items-center justify-center h-full">
                                                        <Dataloading path="Assigning teacher to subject…
"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) :
                                            <>
                                                <tr className="hover:bg-gray-50" >
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned + 1}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.classId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.year}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.classId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.subjects?.subjectId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.subjects?.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.department}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.subjects?.teacherId}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-800">{Assigned?.teacher_Id}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button className="text-blue-600 hover:text-blue-800 hover:cursor-pointer  text-sm font-medium" onClick={() => HandelUnassign(data._id, data.subjects[0].teacherId)}>
                                                            Assign
                                                        </button>
                                                    </td>
                                                </tr>

                                            </>
                                        }
                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </main>
                </div >
            </div >

        </>
    )
}

export default AssiginTeacherwisesubjects