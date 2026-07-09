import React, { useEffect, useState } from "react";
import {
    FileText,
    CalendarDays,
    Download,
    Upload,
    ClipboardCheck,
    BookOpen,
    X,
    CheckCircle2,
    FileUp,
} from "lucide-react";
import NotFound from "../../Loaders/NotFound";
import LMSLoader from "../../Loaders/BackgroungImgLoader";
import axios from "axios";

import { handleLogout, url, UserName } from "../../Apis/Islogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

const ViewAssignemts = React.memo(({ Section, Subject_info }) => {
    const naviagte = useNavigate()
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [comment, setComment] = useState("");
    const [loading, setloading] = useState(false)
    const [assignments, setassignments] = useState([])


    useEffect(() => {
        const FetchAssignemenst = async () => {
            console.log({
                section: Section.subjectId,
                CourseCode: Section.subjectId,
                studentid: UserName._id
            })


            try {
                setloading(true)
                const res = await axios.get(`${url}/api/UploadAssignments/Assignment/`, {
                    params: {
                        section: Section.subjectId,
                        CourseCode: Section.subjectId,
                        studentid: UserName._id,
                        role:UserName?.role
                    }
                })

                setassignments(res.data.data)
            } catch (error) {
                const err_status = error.response.status
                console.log(error.response, ' error.response')
                const err_message = error.response.data.message

                if (err_status == 401) {
                    return handleLogout(naviagte)
                }
                if (err_status == 500) {
                    toast.error(err_message)
                }




            }
            finally {
                setloading(false)

            }
        }
        FetchAssignemenst()

    }, [Section.subjectId])


    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
        const typeallowedFile = [
            "application/pdf",
            "application/word"]


        if (!typeallowedFile.includes(file.type)) {
            setSelectedFile(null)

            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

            if (selectedFile.size > MAX_FILE_SIZE) {
                toast.error("File size must not exceed 5 MB.");
                return;
            }
            return toast.error("type of file is not alowed")
        }
    };

    const openUploadPanel = (assignment) => {

        setSelectedAssignment(assignment);
        setSelectedFile(null);



        window.scrollTo({
            top: 5000,
            behavior: "smooth",
        });
        setComment("");
    };

    const closeUploadPanel = () => {
        setSelectedAssignment(null);
        setSelectedFile(null);
        setComment("");


    };


    const handleSubmit = async () => {


        if (!selectedFile) {
            return alert("Please select a file first");
        }

        const formdata = new FormData()
        formdata.append("assignmentFile", selectedFile)
        formdata.append("assignmentId", selectedAssignment.assignmentId)
        formdata.append("feedback", comment)
        formdata.append("subjectid", selectedAssignment.subjectId)
        formdata.append("StudentId", UserName._id)
        formdata.append("StudentsYearDepartment", UserName.StudentsYearDepartment)
        try {
            const response = await axios.post(`${url}/api/UploadAssignments/SubmitAssignments`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (response.status == 201) {
                return toast.success(response.data.message)
            }
        } catch (error) {
            if (error.response.status == 401) {
                return handleLogout(naviagte)
            }
            if (error.response.status == 404) {
                return toast.error(error.response.data.message)
            }
            if (error.response.status == 413) {
                return toast.error(error.response.data.message)
            }
            if (error.response.status == 409) {
                closeUploadPanel()
                return toast.error(error.response.data.message)
            }

        }

        closeUploadPanel();
    };

    return (
        <>
            {loading ?
                <div className="animate-pulse rounded-2xl border bg-white shadow">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b p-5 last:border-none"
                        >
                            <div className="h-5 w-12 rounded bg-slate-200"></div>
                            <div className="h-5 w-48 rounded bg-slate-200"></div>
                            <div className="h-5 w-32 rounded bg-slate-200"></div>
                            <div className="h-5 w-24 rounded bg-slate-200"></div>
                            <div className="h-10 w-24 rounded-lg bg-slate-200"></div>
                        </div>
                    ))}
                </div> :

                <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 sm:p-6">
                    <div className="mx-auto max-w-7xl">
                        <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-[0_12px_40px_rgba(59,130,246,0.08)]">
                            <div className="flex flex-col gap-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide">
                                        <ClipboardCheck size={14} />
                                        Assignments
                                    </p>
                                    <h1 className="text-2xl font-bold sm:text-3xl">{Subject_info?.subjectName || "subjectName"}</h1>
                                    <p className="mt-1 text-sm text-blue-100">
                                        View, download and submit assignments in one place
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-white/15 px-4 py-3">
                                        <p className="text-xs text-blue-100">Total</p>
                                        <p className="text-lg font-bold">{assignments?.length || 0}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/15 px-4 py-3">
                                        <p className="text-xs text-blue-100">Pending</p>
                                        <p className="text-lg font-bold">
                                            {assignments.filter((a) => a.status === "Pending").length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Assignment
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Subject
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Due Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Total Marks
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Obtained Marks
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Your Assignement Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                createdAt
                                            </th>
                                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Submitted
                                            </th>
                                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {!assignments || assignments.length === 0 ? (
                                            <tr>
                                                <td colSpan={9} className="py-16">
                                                    <div className="flex items-center justify-center">
                                                        <NotFound message="No Assignments available" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            assignments.map((item, id) => {
                                                const submission = item.SubmittedAssignments?.find((sub) => {
                                                    const studentId =
                                                        typeof sub.studentId === "object"
                                                            ? sub.studentId?._id
                                                            : sub.studentId;

                                                    return studentId?.toString() === UserName._id?.toString();
                                                });

                                                return (
                                                    <tr
                                                        key={item._id || item.assignmentId}
                                                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                                    >
                                                        {/* Assignment */}
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                                    <FileText size={20} />
                                                                </div>

                                                                <div>
                                                                    <h3 className="font-semibold text-slate-800">
                                                                        {item.title}
                                                                    </h3>

                                                                    <span className="text-xs text-slate-500">
                                                                        #{id + 1}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Subject */}
                                                        <td className="px-6 py-5">
                                                            <span className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
                                                                <BookOpen size={15} />
                                                                {item.CourseCode}
                                                            </span>
                                                        </td>

                                                        {/* Due Date */}
                                                        <td className="px-6 py-5">
                                                            <span className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
                                                                <CalendarDays size={15} />
                                                                {new Date(item.DueDate).toLocaleDateString()}
                                                            </span>
                                                        </td>

                                                        {/* Total Marks */}
                                                        <td className="px-6 py-5">
                                                            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                                                                {item.Marks} Marks
                                                            </span>
                                                        </td>

                                                        {/* Obtained Marks */}
                                                        <td className="px-6 py-5">
                                                            {submission ? (
                                                                <div className="flex flex-col gap-1">
                                                                    <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                                                                        {submission.obtainedMarks ?? "--"} / {item.Marks}
                                                                    </span>

                                                                    <span
                                                                        className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-medium ${submission.status === "Reviewed"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : "bg-yellow-100 text-yellow-700"
                                                                            }`}
                                                                    >
                                                                        {submission.status ?? "Pending Review"}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500">
                                                                    Not Submitted
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Created */}
                                                        <td className="px-6 py-5">
                                                            <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">

                                                                {submission.status}
                                                            </span>
                                                        </td>

                                                        {/* Submitted */}
                                                        <td className="px-6 py-5">
                                                            {new Date(item.createdAt).toLocaleDateString()}
                                                        </td>
                                                        {/* Submitted */}
                                                        <td className="px-6 py-5">
                                                            {submission ? (
                                                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                                    Submitted
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Actions */}
                                                        <td className="px-6 py-5">
                                                            <div className="flex flex-wrap items-center justify-center gap-2">
                                                                <a
                                                                    href={`https://docs.google.com/gview?url=${encodeURIComponent(
                                                                        item.Assignementurl
                                                                    )}&embedded=true`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                                                                >
                                                                    <FaEye size={15} />
                                                                    View
                                                                </a>

                                                                <a
                                                                    href={item.Assignementurl}
                                                                    download
                                                                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-green-300 hover:bg-green-50 hover:text-green-600"
                                                                >
                                                                    <Download size={15} />
                                                                    Download
                                                                </a>

                                                                {!submission ? (
                                                                    <button
                                                                        onClick={() => openUploadPanel(item)}
                                                                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                                    >
                                                                        <Upload size={15} />
                                                                        Upload
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleViewSubmission(submission)}
                                                                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                                                    >
                                                                        <FaEye size={15} />
                                                                        View Submission
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {selectedAssignment && (

                                <div className="border-t border-slate-200 bg-slate-50 p-6">
                                    <div className="mx-auto max-w-3xl rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
                                        <div className="mb-5 flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    Submit Assignment
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {selectedAssignment?.AssignementName || "AssignementName"} • {selectedAssignment?.subjectId}
                                                </p>
                                            </div>

                                            <button
                                                onClick={closeUploadPanel}
                                                className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>

                                        <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50">
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                                                <FileUp size={24} />
                                            </div>

                                            <h3 className="mt-4 text-base font-semibold text-slate-800">
                                                Drag and drop your file here
                                            </h3>
                                            <p className="mt-2 text-sm text-slate-500">
                                                or click to browse from your device
                                            </p>
                                            <p className="mt-2 text-xs text-slate-400">
                                                Supported: PDF, DOC, DOCX • Max 10MB
                                            </p>

                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>

                                        {selectedFile && (
                                            <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle2 size={18} className="text-emerald-600" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800">
                                                            {selectedFile?.name || "name"}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            Ready to submit
                                                        </p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setSelectedFile(null)}
                                                    className="text-sm font-medium text-red-500 hover:text-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}

                                        <div className="mt-5">
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                feedback
                                            </label>
                                            <textarea
                                                rows="4"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Add a note for your faculty (optional)"
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                                            />
                                        </div>

                                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                            <button
                                                onClick={closeUploadPanel}
                                                className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                Submit Assignment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>

    );
}
)

export default ViewAssignemts;