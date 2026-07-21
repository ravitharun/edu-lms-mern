import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { incremented } from '../../Store/Section'

function MarksHeader({ semesters, selectedSemester }) {
    let sectionDisp = useDispatch()
  
  return (
    <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-5 sm:p-7 lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
            <HiMiniAcademicCap size={28} />
          </div>

          <div className="text-white">
            <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
              Student Academic Marks
            </h1>
            <p className="mt-1 text-sm text-blue-50 sm:text-base">
              Final exam, internal, assignment and lab marks overview
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
            <FaCalendarAlt />
            Select Semester
          </label>

          <div className="relative">
            <select
              className="w-full appearance-none rounded-2xl border border-white/20 bg-white/15 px-4 py-3 pr-10 text-sm font-medium text-white outline-none backdrop-blur-sm transition focus:border-white/40 focus:bg-white/20 sm:min-w-[220px]"
              defaultValue={selectedSemester.semester}

              onChange={(e)=>sectionDisp(incremented(e.target.value))}
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem} className="text-slate-800">
                  {sem}
                </option>
              ))}
            </select>

            <MdOutlineKeyboardArrowDown
              size={22}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarksHeader