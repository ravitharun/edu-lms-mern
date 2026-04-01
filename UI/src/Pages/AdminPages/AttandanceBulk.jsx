import React from 'react'
import DownloadReports from './Master/DownloadReports'
import toast from 'react-hot-toast'

function AttandanceBulk({ ClassID }) {

    const data = [
        { ClassID: ClassID },
        {
            "Roll No": "",
            "Name": "",
            "Present": "",
            "Absent": "",
        }
    ]

 
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 space-y-6">

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Bulk Attendance Upload
                </h2>

                {/* Note */}
                <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm p-4 rounded-lg">
                    <p>
                        <span className="font-semibold">Note:</span> Enter <b>P</b> for Present and <b>Ab</b> for Absent in the sheet.
                    </p>
                </div>

                {/* Download Template */}
                <div className="flex justify-center">
                    <DownloadReports
                        data={data}
                        fileName={`Attendance_Template_${ClassID}`}
                        buttonName="Attendance Template"
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
                    />
                </div>

                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition">
                    <input
                        type="file"
                        className="hidden"
                        id="fileUpload"
                    />
                    <label
                        htmlFor="fileUpload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                        <span className="text-gray-600 text-sm">
                            Drag & drop your file here or
                        </span>
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                            Browse File
                        </span>
                    </label>
                </div>

                {/* Class Info */}
                <div className="text-center text-gray-500 text-sm">
                    Class ID: <span className="font-medium text-gray-700">{ClassID}</span>
                </div>

            </div>
        </div>
    )
}

export default AttandanceBulk