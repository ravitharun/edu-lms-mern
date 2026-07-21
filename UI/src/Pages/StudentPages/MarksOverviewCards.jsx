import React from 'react'
import {
  FaBookOpen,
  FaGraduationCap,
  FaPercentage,
  FaStar,
  FaClipboardList,
  FaFlask,
  FaFileAlt,
  FaLayerGroup,
} from 'react-icons/fa'

function MarksOverviewCards({
  student,
  selectedSemester,
  averageInternal,
  averageAssignment,
  averageLab,
  averageFinal,
}) {
  console.log(student,'student');
  
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Student Name</span>
            <FaGraduationCap className="text-indigo-600" size={18} />

          </div>
          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">{student?.name||"StudentName"}</h2>
          <p className="mt-1 text-sm text-slate-500">{student?.regNo}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Department</span>
            <FaBookOpen className="text-cyan-600" size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-800 sm:text-lg">{student?.department}</h2>
          <p className="mt-1 text-sm text-slate-500">{student?.course}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Percentage</span>
            <FaPercentage className="text-emerald-600" size={18} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {selectedSemester?.overallPercentage}%
          </h2>
          <p className="mt-1 text-sm text-slate-500">{selectedSemester?.semester}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">CGPA</span>
            <FaStar className="text-amber-500" size={18} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{selectedSemester?.cgpa}</h2>
          <p className="mt-1 text-sm text-slate-500">Academic score</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Avg Internal</span>
            <FaClipboardList className="text-indigo-600" size={18} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{averageInternal}/20</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Avg Assignment</span>
            <FaFileAlt className="text-orange-500" size={18} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{averageAssignment}/10</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Avg Lab</span>
            <FaFlask className="text-cyan-600" size={18} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{averageLab}/10</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Avg Final Exam</span>
            <FaLayerGroup className="text-emerald-600" size={18} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{averageFinal}/70</p>
        </div>
      </div>
    </>
  )
}

export default MarksOverviewCards