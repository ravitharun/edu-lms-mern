import React, { useState } from 'react'
import DownloadReports from '../Admin/DownloadReports.jsx'
import toast from 'react-hot-toast'
import { FiUploadCloud, FiFileText } from "react-icons/fi"
import * as XLSX from "xlsx";

function AttandanceBulk({ ClassID }) {
    const [file, setfile] = useState(null)

    const data = [
        { ClassID: ClassID },
        {
            "Roll No": "",
            "Name": "",
            "Present": "",
            "Absent": "",
            "Date": new Date().toLocaleDateString(),
            "Start Time": "",
            "End Time": ""
        }
    ]

    const handeluploadfile = (Getfile) => {
        const filesFormat = [
            "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        if (!filesFormat.includes(Getfile.type)) {
            return toast.error(`These file Uplaoded format is not allowed ${Getfile.type},
            Allowed  Format is ${filesFormat}`)
        }
        setfile(Getfile)
    }
    const submitBulkUpload = (e) => {
        e.preventDefault();

        if (!file) {
            return toast.error("File is required");
        }

        const reader = new FileReader();

        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;

                const workbook = XLSX.read(bstr, { type: "binary" });

                // Get first sheet
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert to JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
                const expectedHeaders = ["Roll No", "Name", "Present", "Absent","Date","Start Time","End Time"];
                const fileHeaders = Object.keys(jsonData[0]);
                const missingHeaders = expectedHeaders.filter(
                    (header) => !fileHeaders.includes(header)
                );

                if (missingHeaders.length > 0) {
                    return toast.error(
                        `Missing columns: ${missingHeaders.join(", ")}`
                    );
                }

                //  Validate data
                if (jsonData.length === 0) {
                    return toast.error("Empty file!");
                }

                const findNulldata = jsonData.filter(nullvalue => !nullvalue.Absent || !nullvalue.Present || !nullvalue.name || !nullvalue.RollNo)
                // if()

                toast.success("File processed successfully 🚀");

            } catch (error) {
                console.error(error);
                toast.error("Error processing file");
            }
        };

        reader.onerror = () => {
            toast.error("Failed to read file");
        };

        // 🔥 IMPORTANT LINE (you missed this)
        reader.readAsBinaryString(file);
    };
    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">

                <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 space-y-6">

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-800 text-center">
                        📊 Bulk Attendance Upload
                    </h2>

                    {/* Note */}
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm p-4 rounded-xl">
                        <p>
                            <span className="font-semibold">Note:</span> Use <b>P</b> (Present) and <b>Ab</b> (Absent) in sheet.
                        </p>
                    </div>

                    {/* Download Template */}
                    <div className="flex justify-center">
                        <DownloadReports
                            data={data}
                            fileName={`Attendance_Template_${ClassID}`}
                            buttonName="Download Template"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl shadow-md transition duration-300"
                        />
                    </div>

                    {/* Upload Section */}
                    <form
                        // onSubmit=
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition"
                    >

                        <input
                            type="file"
                            className="hidden"
                            id="fileUpload"
                            required
                            onChange={(e) => handeluploadfile(e.target.files[0])}
                        />

                        <label
                            htmlFor="fileUpload"
                            className="cursor-pointer flex flex-col items-center space-y-3"
                        >
                            <FiUploadCloud className="text-4xl text-blue-500" />

                            <span className="text-gray-600 text-sm">
                                Drag & drop or click to upload
                            </span>

                            <span className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                                Browse File
                            </span>
                        </label>

                        {/* File Name */}
                        {file && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700">
                                <FiFileText />
                                {file.name}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            onClick={
                                submitBulkUpload
                            }
                            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300"
                        >
                            🚀 Upload Attendance
                        </button>

                    </form>

                    {/* Class Info */}
                    <div className="text-center text-gray-500 text-sm">
                        Class ID: <span className="font-medium text-gray-700">{ClassID}</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AttandanceBulk