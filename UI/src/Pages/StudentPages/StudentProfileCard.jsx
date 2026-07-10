import React from 'react'

function StudentProfileCard({ student }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-bold text-slate-800">Student Profile</h3>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Register Number
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{student.regNo}</p>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Batch
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{student.batch}</p>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Current Semester
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{student.currentSemester}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentProfileCard