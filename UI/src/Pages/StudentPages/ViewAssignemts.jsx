import React, { useState } from "react";
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

function ViewAssignemts() {
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [comment, setComment] = useState("");
    const [loading, setloading] = useState(true)
    const assignments =
        [
            {
                assignmentId: "ASG-0706",
                title: "Check 2",
                subjectCode: "CSE301",
                section: "CSE 3",
                dueDate: "07 Jul 2026",
                totalMarks: 20,
                status: "Pending",
                attachmentUrl:
                    "https://res.cloudinary.com/dqckm1xhq/image/upload/v1783312061/em4tqdlm...",
            },
            {
                assignmentId: "ASG-0707",
                title: "Unit 1 Record",
                subjectCode: "CSE302",
                section: "CSE 3",
                dueDate: "09 Jul 2026",
                totalMarks: 25,
                status: "Submitted",
                attachmentUrl:
                    "https://res.cloudinary.com/dqckm1xhq/image/upload/v1783312061/em4tqdlm...",
            },
            {
                assignmentId: "ASG-0708",
                title: "Mini Project Abstract",
                subjectCode: "CSE303",
                section: "CSE 3",
                dueDate: "12 Jul 2026",
                totalMarks: 30,
                status: "Pending",
                attachmentUrl:
                    "https://res.cloudinary.com/dqckm1xhq/image/upload/v1783312061/em4tqdlm...",
            },
        ];

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
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

    const handleSubmit = () => {
        if (!selectedFile) return alert("Please select a file first");
        alert(`Assignment submitted: ${selectedFile.name}`);
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
                                        Student Assignments
                                    </p>
                                    <h1 className="text-2xl font-bold sm:text-3xl">My Assignments</h1>
                                    <p className="mt-1 text-sm text-blue-100">
                                        View, download and submit assignments in one place
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-white/15 px-4 py-3">
                                        <p className="text-xs text-blue-100">Total</p>
                                        <p className="text-lg font-bold">{assignments.length}</p>
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
                                                Marks
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {(!assignments || assignments.length === 0) && (
                                            <div className="flex min-h-[60vh] items-center justify-center">
                                                <NotFound message="No Assignments available" />
                                            </div>
                                        )}
                                        {assignments.map((item) => (
                                            <tr key={item.assignmentId} className="hover:bg-sky-50/40">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                                                            <FileText size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500">
                                                                {item.assignmentId}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                        <BookOpen size={16} className="text-indigo-500" />
                                                        {item.subjectCode}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                                        <CalendarDays size={16} className="text-rose-500" />
                                                        {item.dueDate}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                                                    {item.totalMarks}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Submitted"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-amber-100 text-amber-700"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <a
                                                            href={item.attachmentUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                                        >
                                                            <Download size={16} />
                                                            View
                                                        </a>

                                                        <button
                                                            onClick={() => openUploadPanel(item)}
                                                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                                        >
                                                            <Upload size={16} />
                                                            Upload
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
                                                    {selectedAssignment.title} • {selectedAssignment.subjectCode}
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
                                                            {selectedFile.name}
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
                                                Comment
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

export default ViewAssignemts;