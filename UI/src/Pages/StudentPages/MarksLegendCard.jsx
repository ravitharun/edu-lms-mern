import React from 'react'

function MarksLegendCard() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-800">Marks Legend</h3>

            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-white p-4">
                    <span className="text-sm text-slate-600">Internal Marks</span>
                    <span className="text-sm font-bold text-indigo-600">/20</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white p-4">
                    <span className="text-sm text-slate-600">Assignment Marks</span>
                    <span className="text-sm font-bold text-orange-500">/10</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white p-4">
                    <span className="text-sm text-slate-600">Lab Marks</span>
                    <span className="text-sm font-bold text-cyan-600">/10</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white p-4">
                    <span className="text-sm text-slate-600">Final Exam Marks</span>
                    <span className="text-sm font-bold text-emerald-600">/70</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white p-4">
                    <span className="text-sm text-slate-600">Total Marks</span>
                    <span className="text-sm font-bold text-slate-800">/100</span>
                </div>
            </div>
        </div>
    )
}

export default MarksLegendCard