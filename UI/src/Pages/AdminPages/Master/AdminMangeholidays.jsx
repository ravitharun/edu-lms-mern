import React, { useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import toast, { Toaster } from 'react-hot-toast'
import { UserName } from '../../../Apis/Islogin'
import { IoMdInformationCircle } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai"; // info icon
import * as XLSX from "xlsx";
import axios from 'axios'
import DownloadReports from './DownloadReports'
import { FaCloudDownloadAlt } from "react-icons/fa";
import FetechHoliday from './FetechHoliday'
function AdminMangeholidays() {
    const [date, setdata] = useState([])
    const [File, setfile] = useState(null)
    const [cancelFileUpload, setcancelFileUpload] = useState(false)
    const handelFileUpload = (e) => {
        toast.success("hey")
        const file = e.target.files[0]

        console.log(file, "file")
        const typeAccept = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"]
        if (!typeAccept.includes(file.type)) {
            return toast.error("only Accept CSV or Excel  Fromat")
        }
        else {

            setfile(file)
            setcancelFileUpload(true)

        }
    }
    const upload = (e) => {
        e.preventDefault()
        if (!File) { return toast.error("File is required") }

        const reader = new FileReader();
        reader.onload = async (evt) => {
            const bstr = evt.target.result;
            const workbook = XLSX.read(bstr, { type: "binary" });
            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];


            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
            console.log(

                jsonData)
            // const CheckHeader = [
            //     "Sr. No.",
            //     "USN",
            //     "College Name",
            //     "Fulll Name (as per Aadhar card )",
            //     "Email ID (Primary)"
            // ];

            // const uploadedHeaders = jsonData[0] || [];

            // const allHeadersExist = CheckHeader.every(header =>
            //     uploadedHeaders.includes(header)
            // );

            // if (!allHeadersExist) {
            //     return toast.error("Some required headings are missing. Please check the file.");
            // }
            // console.log("Headers are correct!");
            try {
                const response = await axios.post("http://localhost:5001/api/Manageholiday/AddHolidays", { data: jsonData })
                console.log(response, "response holidya")
                if (response.status == 201) {
                    return toast.success("Data Saved.")

                }

            } catch (error) {
                console.log(error, "err")
                if (error.status == 409) {
                    return toast.error(
                        "All holidays already exist in database")
                }
            }

        };


        reader.readAsBinaryString(File);

    }


    const data = [
        { text: "Holiday Name", start: new Date("2026-03-25").toLocaleDateString(), type: "Govt Holiday/College Holiadys" },

    ];


    const handelCancelUpload = () => {
        console.log("first")
        setcancelFileUpload(false);
        setfile(null)
    }

    return (
        <>
            <div className="min-h-screen flex bg-gray-50">
                <MasterAdminNavbar path="Add Holiday" />
                <Toaster />

                <div className="flex-1 flex flex-col min-w-0">
                    <MasterLogoNav path=" Add Holidays" />

                    <main className="flex-1 mt-[72px] px-4 md:px-6 lg:px-8 pb-10 overflow-y-auto">

                        <div className="max-w-6xl mx-auto space-y-8">

                            {/* Header */}
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Upload Bulk Holidays
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Upload holiday dates via CSV or Excel <strong className='text-red-500'>YYYY-MM-DD</strong> to update the calendar for everyone.
                                </p>
                            </div>
                            <form >
                                {UserName?.role == "Admin" || UserName?.role == "teacher" ?
                                    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                                        <label
                                            htmlFor="holiday-upload"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9" />
                                            </svg>
                                            <span className="text-gray-600 font-medium">Drag & Drop or Click to Upload</span>
                                            <span className="text-gray-400 text-sm mt-1">Supported: CSV, Excel</span>
                                            <input id="holiday-upload" type="file" className="hidden" accept=".csv,.xlsx" onChange={(e) => handelFileUpload(e)} required />
                                        </label>

                                        <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-3">

                                            {/* Note Section */}
                                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                                <AiOutlineInfoCircle className="text-red-500 mt-0.5" size={20} />
                                                <p>
                                                    <span className="font-medium text-gray-900">Note:</span> Include all required fields in your upload (e.g., date in{" "}
                                                    <strong className="text-gray-900">YYYY-MM-DD</strong> format).
                                                </p>
                                            </div>

                                            {/* Download Section */}
                                            <div className="flex items-start gap-3">
                                                <FaCloudDownloadAlt className="text-blue-500 mt-1" size={20} />

                                                <div className="text-sm text-gray-600 leading-relaxed">
                                                    <p>
                                                        <span className="font-semibold text-gray-900">
                                                            Default Templates
                                                        </span>{" "}
                                                        include all required fields. Fill in your data and upload it using the button below.
                                                    </p>
                                                    <div className="mt-2">
                                                        <DownloadReports
                                                            data={data}
                                                            show_type="linktype"
                                                            buttonName="Default Templates"
                                                            fileName="Default Templates Bulk Holiday"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {cancelFileUpload && <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200" onClick={handelCancelUpload}>Cancel Upload</button>}
                                        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"

                                            onClick={upload}
                                        >
                                            Upload
                                        </button>
                                    </div> : ""

                                }
                            </form>
                            <FetechHoliday></FetechHoliday>
                        </div>
                    </main>
                </div>
            </div>
        </>

    )
}

export default AdminMangeholidays