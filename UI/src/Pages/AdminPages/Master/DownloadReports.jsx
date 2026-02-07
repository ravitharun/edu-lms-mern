import React from 'react'
import { CSVLink } from 'react-csv'

function DownloadReports({data,fileName,buttonName}) {
    return (
        <>

            <CSVLink
                data={data}
                filename={`${fileName}.csv`}
                className="flex items-center justify-center gap-1
             w-50
             px-2 py-1
             text-xs font-medium
             bg-red-500 text-white
             rounded
             hover:bg-red-600
             transition"
            >
                Download{buttonName}report
            </CSVLink>


        </>)
}

export default DownloadReports