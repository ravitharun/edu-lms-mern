import React, { useEffect, useState } from 'react';
import MasterAdminNavbar from './MasterAdminNavbar';
import MasterLogoNav from './MasterLogoNav';
import { AddnewSubjuect, fetchAllSubjects, HandelDeleteCourse } from './APIS/GetAll-subjects';
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Loaders from '../../../Loaders/Loaders';
import Dataloading from '../../../Loaders/Dataloading';
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";

function AssiginSubject() {
    const [getAllData, setallData] = useState([]);
    const [Search, setsearch] = useState('');
    const [loder, setloader] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [poupForm, setpoupForm] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [year, setYear] = useState("");
    const [dept, setDept] = useState("");
    const [fillterdeletd, seflltes] = useState([])
    useEffect(() => {
        const get = async () => {
            try {
                setloader(true);
                const rsdata = await fetchAllSubjects();
                setallData(rsdata.data?.message);
                setOriginalData(rsdata.data?.message);
                setloader(false);
            } catch (err) {
                console.log(err.message);
            }
        };
        get();
    }, []);

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setsearch(search);

        if (!search) {
            setallData(originalData);
            return;
        }

        const filtered = originalData.filter(
            (subj) =>
                subj.subject?.toLowerCase().includes(search) ||
                subj.courseId?.toLowerCase().includes(search) ||
                subj.department?.toLowerCase().includes(search) ||
                subj.year?.toString().includes(search)
        );

        setallData(filtered);
    };

    const HandelClear = () => {
        setsearch('');
        setallData(originalData);
    };
    const addNewSubjects = async () => {
        const data = {
            subjectName,
            subjectCode,
            year,
            dept
        }
        try {
            const check = await AddnewSubjuect(data)
            console.log(check.status, "rs")
            if (check.status == 201) {
                toast.success(check.data.message)
                setSubjectName("")
                setSubjectCode("")
                setDept("")
                setYear("")
            }
        }
        catch (err) {
            console.log("err from the a.jsx", err)
        }
    }


    const handelDeleteCourse = async (id) => {
        Swal.fire({
            title: "Do you want to Delete these  Course?",
            showDenyButton: true,
            showCancelButton: false,
            // confirmButtonText: "Save",
            confirmButtonText: "Yes, Delete it",
            // cancelButtonText: "No",
            icon: "info"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                try {
                    const response = await HandelDeleteCourse(id)
                    if (response.data.message === "Course Deleted.") {
                        const setdata = getAllData.filter(item => item._id !== id);
                        setallData(setdata);
                        return toast.success('Course Deleted.')
                    }

                }
                catch (err) {
                    toast.error(err.message)
                }
            } else if (result.isDenied) {

                Swal.fire("Course is not  Deleted", "", "info");
            }
        })


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
                    <MasterLogoNav path="Manage Subjects" />

                    {/* Scrollable Content */}
                    <main className="flex-1 pt-16 md:ml- pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
                        <div className="max-w-7xl mx-auto mt-10 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Manage Subjects
                                <hr className="mt-3 h-1 w-24 border-0 rounded-full bg-blue-500" />
                            </h2>

                            {/* Add / Close Button */}
                            <button
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md shadow-sm transition"
                                onClick={() => setpoupForm((prev) => !prev)}
                            >
                                <FaPlus className="text-xs" />
                                {!poupForm ? 'Add' : 'Close'}
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mt-10 mb-10 flex justify-center">
                            <div className="flex items-center gap-2 w-full max-w-md bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
                                <FaSearch className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search subjects..."
                                    onChange={handleSearch}
                                    value={Search}
                                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                                />
                                {Search && (
                                    <button
                                        className="text-gray-400 hover:text-red-500 transition"
                                        onClick={HandelClear}
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Floating Popup */}
                        {poupForm && (
                            <div className="fixed inset-0 flex items-start justify-end p-4 z-50">
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black opacity-30"></div>

                                {/* Popup Form */}
                                <div className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-lg w-80 z-50">
                                    <h2 className="text-lg font-semibold mb-3">Popup Form</h2>

                                    <label className="block mb-1">CourseId</label>
                                    <input
                                        type="text"
                                        placeholder="Course ID"
                                        value={subjectCode}
                                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                                        onChange={(e) => setSubjectCode(e.target.value)}
                                    />

                                    <label className="block mb-1">Department</label>
                                    <input
                                        type="text"
                                        placeholder="Department"
                                        value={dept}
                                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                                        onChange={(e) => setDept(e.target.value)}

                                    />

                                    <label className="block mb-1">Subject Name</label>
                                    <input
                                        type="text"
                                        placeholder="Subject Name"
                                        value={subjectName}
                                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                                        onChange={(e) => setSubjectName(e.target.value)}

                                    />

                                    <label className="block mb-1">Year</label>
                                    <input
                                        type="number"
                                        placeholder="Year"
                                        value={year}
                                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                                        onChange={(e) => setYear(e.target.value)}

                                    />
                                    <div className="flex gap-3 justify-end mt-4">
                                        {/* Close Button */}
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200"
                                            onClick={() => setpoupForm((prev) => !prev)}
                                        >
                                            Close
                                        </button>

                                        {/* Submit Button */}
                                        <button
                                            className={`px-4 py-2 bg-blue-500 text-white rounded transition-all duration-200
      ${!subjectCode || !subjectName || !year || !dept ? "opacity-50 cursor-not-allowed hidden" : "hover:bg-blue-600 cursor-pointer block"}`}
                                            onClick={addNewSubjects}
                                        >
                                            Submit
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* Table */}
                        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                            <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                                        <th className="px-6 py-4 text-left">Course ID</th>
                                        <th className="px-6 py-4 text-left">Department</th>
                                        <th className="px-6 py-4 text-center">Subject</th>
                                        <th className="px-6 py-4 text-center">Year</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <h2>{getAllData.length}length</h2>
                                {loder ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan={4} className="py-16">
                                                <div className="flex items-center justify-center">
                                                    <Dataloading />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : getAllData.length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="py-16 text-center text-gray-500 font-medium"
                                            >
                                                No data
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody className="divide-y divide-gray-200 text-sm">
                                        {getAllData.map((data, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4 text-left">{data.courseId}</td>
                                                <td className="px-6 py-4 text-left">{data.department}</td>
                                                <td className="px-6 py-4 text-center">{data.subject}</td>
                                                <td className="px-6 py-4 text-center">{data.year}</td>
                                                <td className="px-6 py-4 text-center">

                                                    <div className="flex gap-2">
                                                        <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
                                                            Edit
                                                        </button>
                                                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={() => handelDeleteCourse(data._id)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AssiginSubject;
