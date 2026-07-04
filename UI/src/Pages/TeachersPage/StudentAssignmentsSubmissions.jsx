import {
    HiOutlineDocumentText,
    HiOutlineEye,
    HiOutlineMagnifyingGlass,
    HiOutlineFunnel,
} from "react-icons/hi2";

export default function StudentAssignmentsSubmissions({ Marks }) {
    const submissions = [
        {
            id: "SUB-001",
            student: "Ravi Kumar",
            assignment: "React Hooks Assignment",
            submitted: "04 Jul 2026",
            score: "--",
            status: "Pending",
        },
        {
            id: "SUB-002",
            student: "Rahul Sharma",
            assignment: "Node.js Project",
            submitted: "03 Jul 2026",
            score: "94/100",
            status: "Approved",
        },
        {
            id: "SUB-003",
            student: "Priya Reddy",
            assignment: "DBMS Assignment",
            submitted: "02 Jul 2026",
            score: "42/100",
            status: "Rejected",
        },
    ];

    const badge = (status) => {
        switch (status) {
            case "Approved":
                return "bg-emerald-100 text-emerald-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-amber-100 text-amber-700";
        }
    };
    return (
        <>


            <div className="min-h-screen bg-slate-50 p-6">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Assignment Submissions
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Review student submissions and provide feedback.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">

                        <div className="relative">
                            <HiOutlineMagnifyingGlass className="absolute left-3 top-3 text-gray-400 text-lg" />

                            <input
                                placeholder="Search student..."
                                className="w-72 rounded-xl border bg-white py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>

                        <button className="flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 hover:bg-gray-100">
                            <HiOutlineFunnel />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Stats */}

                <div className="mb-8 grid gap-5 md:grid-cols-4">

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-gray-500">Total</p>
                        <h2 className="mt-2 text-3xl font-bold">124</h2>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-gray-500">Pending</p>
                        <h2 className="mt-2 text-3xl font-bold text-amber-500">18</h2>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-gray-500">Approved</p>
                        <h2 className="mt-2 text-3xl font-bold text-emerald-600">92</h2>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-gray-500">Rejected</p>
                        <h2 className="mt-2 text-3xl font-bold text-red-500">14</h2>
                    </div>

                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-slate-100">

                                <tr className="text-left text-sm text-gray-600">

                                    <th className="px-6 py-4">Student</th>

                                    <th className="px-6 py-4">Assignment</th>

                                    <th className="px-6 py-4">Submitted</th>

                                    <th className="px-6 py-4">Score</th>

                                    <th className="px-6 py-4">Status</th>

                                    <th className="px-6 py-4 text-center">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {submissions.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t hover:bg-slate-50 transition"
                                    >
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                                    {item.student.charAt(0)}
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold">
                                                        {item.student}
                                                    </h3>

                                                    <p className="text-xs text-gray-500">
                                                        {item.id}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-2">
                                                <HiOutlineDocumentText className="text-lg text-blue-600" />
                                                {item.assignment}
                                            </div>

                                        </td>

                                        <td className="px-6 py-5">
                                            {item.submitted}
                                        </td>

                                        <td className="px-6 py-5 font-semibold">
                                            {item.score}
                                        </td>

                                        <td className="px-6 py-5">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col items-center gap-3">

                                                {/* Review Button */}
                                                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md">
                                                    <HiOutlineEye className="text-lg" />
                                                    Review
                                                </button>

                                                {/* Marks Dropdown */}
                                                {true && (
                                                    <select
                                                        className="w-32 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                    >
                                                        <option value="">Select Marks</option>

                                                        {[...Array(Marks + 1).keys()].map((num) => (
                                                            <option key={num} value={num}>
                                                                {num} Marks
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}



                                                <br />
                                                {/* status Dropdown */}
                                                {true && (
                                                    <select
                                                        className="w-32 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                    >
                                                        <option value="">Select status</option>

                                                        {["pending", "completed", "Rejected"].map((num) => (
                                                            <option key={num} value={num}>
                                                                {num} Marks
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>

    );
}