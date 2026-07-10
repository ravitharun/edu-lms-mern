import React from 'react'
import { FaFlask } from 'react-icons/fa'

function LabMarksCard({ subjects }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-4">
                <div className="flex items-center gap-2">
                    <FaFlask className="text-cyan-600" />
                    <h3 className="text-lg font-bold text-slate-800">Lab Marks</h3>
                </div>
                <p className="mt-1 text-sm text-slate-500">Lab performance marks</p>
            </div>

            <div className="space-y-3 p-4">
                {subjects.map((subject) => (
                    <div key={subject.code} className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {subject.code}
                        </p>
                        <h4 className="mt-1 text-sm font-bold text-slate-800">{subject.name}</h4>

                        <div className="mt-3">
                            <p className="text-xs text-slate-500">Lab Marks</p>
                            <p className="text-lg font-bold text-cyan-600">
                                {subject.labMarks}/10
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LabMarksCard