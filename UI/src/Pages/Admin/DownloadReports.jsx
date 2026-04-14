import React from "react";
import { CSVLink } from "react-csv";

function DownloadReports({ data, fileName, buttonName, show_type }) {
    

    // Optional: Check if data is an object
    if (typeof data === "object") {
    }

    return (
        <>

            <br />
            <CSVLink
                data={data}
                filename={`${fileName}.csv`}
                className={show_type == "linktype" ? `text-indigo-950 font-bold hover:text-blue-700` : `
                flex items-center justify-center gap-1
                w-[150px] px-3 py-1.5
                text-xs font-medium rounded-md
                transition-all duration-200
                ${buttonName === "Leave"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }
                `}
            >
                {`Download ${buttonName === "Default Templates" ? buttonName : "Report"}`}
            </CSVLink>
        </>
    );
}

export default DownloadReports; 