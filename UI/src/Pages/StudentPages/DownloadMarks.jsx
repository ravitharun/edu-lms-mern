import React from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FiDownload } from 'react-icons/fi';



function DownloadMarks({ filename, data }) {

    const DownloadPdf = () => {

        const keys = Object.keys(data[0]);
        const rows = data.map(subject => Object.values(subject));
        const pdf = new jsPDF()
        autoTable(pdf, {
            head: [keys],
            body: rows
        });
        pdf.save(`${filename}.pdf`);
    }

    return (
        <>

            <button
                onClick={DownloadPdf}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95"
            >
                <FiDownload size={18} />
                Download Marksheet
            </button>
        </>
    )
}

export default DownloadMarks