import React from 'react'

import { CiCircleCheck } from "react-icons/ci";

import { FiXCircle } from 'react-icons/fi';
import DownloadMarks from './DownloadMarks';
import { UserName } from '../../Apis/Islogin';

function MarksTableSection({ subjects, semester }) {
  console.log('Final Exam', subjects)
  const getGradeColor = (grade) => {
    if (grade === 'O') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    if (grade === 'A+') return 'bg-blue-100 text-blue-700 border-blue-200'
    if (grade === 'A') return 'bg-violet-100 text-violet-700 border-violet-200'
    return 'bg-slate-100 text-slate-700 border-slate-200'
  }

  const getMarkColor = (marks) => {
    if (marks >= 90) return 'text-emerald-600'
    if (marks >= 75) return 'text-blue-600'
    return 'text-amber-600'
  }

  const result = subjects.filter((mrks) => mrks.totalMarks >= 45)
  console.log(result, 'result')

  return (

    <>

      {/* <h1>odvlm</h1> */}
      <div className="rounded-3xl border border-slate-200 bg-white">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Subject-wise Marks
            </h3>
            <p className="text-sm text-slate-500">
              Detailed split-up for {semester}
            </p>
          </div>

          <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {subjects.length} Subjects
          </div>
        </div>

        {/* ========================= Desktop Table ========================= */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subject
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Internal
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Assignment
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Lab
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Final
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Grade
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject, index) => (
                  <tr
                    key={subject.code}
                    className={`border-t border-slate-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {subject.code}
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {subject.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {subject.type}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-indigo-600">
                      {subject.internalMarks}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-orange-500">
                      {subject.assignmentMarks}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-cyan-600">
                      {subject.labMarks}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                      {subject.finalExamMarks}
                    </td>

                    <td
                      className={`px-5 py-4 text-sm font-bold ${getMarkColor(
                        subject.totalMarks
                      )}`}
                    >
                      {subject.totalMarks}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getGradeColor(
                          subject.grade
                        )}`}
                      >
                        {subject.grade}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {subject.totalMarks >= 45 ? (
                        <div className="flex items-center gap-2 font-medium text-green-600">
                          <CiCircleCheck size={18} />
                          <span>Passed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 font-medium text-red-600">
                          <FiXCircle size={18} />
                          <span>Failed</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================= Mobile Table ========================= */}
        <div className="lg:hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Subject
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                  Total
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                  Grade
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject, index) => (
                <tr
                  key={subject.code}
                  className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-sm text-slate-700">
                      {subject.name}
                    </p>
                    <p className="text-xs text-slate-500">{subject.code}</p>
                  </td>

                  <td
                    className={`px-4 py-3 text-center font-bold ${getMarkColor(
                      subject.totalMarks
                    )}`}
                  >
                    {subject.totalMarks}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full border px-2 py-1 text-xs font-bold ${getGradeColor(
                        subject.grade
                      )}`}
                    >
                      {subject.grade}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {subject.totalMarks >= 45 ? (
                      <div className="flex justify-center text-green-600">
                        <CiCircleCheck size={20} /> <span>Passed</span>
                      </div>
                    ) : (
                      <div className="flex justify-center text-red-600">
                        <FiXCircle size={20} />  <span>Failed</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        {/* Result Status */}
        {result.length === subjects.length ? (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
              <CiCircleCheck className="text-green-600" size={24} />
            </div>

            <div>
              <h4 className="font-semibold text-green-800">
                Congratulations!
              </h4>
              <p className="text-sm text-slate-600">
                You have passed all subjects successfully.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
              <FiXCircle className="text-red-600" size={22} />
            </div>

            <div>
              <h4 className="font-semibold text-red-800">
                Better Luck Next Time
              </h4>
              <p className="text-sm text-slate-600">
                You have failed in{" "}
                <span className="font-semibold text-red-600">
                  {subjects.length - result.length}
                </span>{" "}
                {subjects.length - result.length === 1 ? "subject" : "subjects"}.
              </p>
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="flex justify-start lg:justify-end">
          <DownloadMarks
            filename={`${UserName.name || "Name"}-${UserName.Student_ID || "ID"}`}
            data={subjects}
          />
        </div>
      </div>


    </>

  )
}

export default MarksTableSection