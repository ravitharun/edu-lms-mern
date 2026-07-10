import React from 'react'
import { FaCheckCircle, FaFileAlt } from 'react-icons/fa'

function FinalMarksCard({ subjects }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <FaFileAlt className="text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-800">Final Marks</h3>
        </div>
        <p className="mt-1 text-sm text-slate-500">Final exam marks for each subject</p>
      </div>

      <div className="space-y-3 p-4">
        {subjects.map((subject) => (
          <div key={subject.code} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {subject.code}
            </p>
            <h4 className="mt-1 text-sm font-bold text-slate-800">{subject.name}</h4>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Final Exam</p>
                <p className="text-lg font-bold text-emerald-600">
                  {subject.finalExamMarks}/70
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">Status</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <FaCheckCircle size={14} />
                  Passed
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FinalMarksCard