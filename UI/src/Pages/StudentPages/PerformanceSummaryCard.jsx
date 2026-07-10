import React from 'react'

function PerformanceSummaryCard({ highestTotal, averageTotal }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-bold text-slate-800">Performance Summary</h3>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">Highest Total</span>
            <span className="text-sm font-bold text-emerald-600">{highestTotal}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 w-[94%] rounded-full bg-emerald-500"></div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">Average Total</span>
            <span className="text-sm font-bold text-blue-600">{averageTotal}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 w-[89%] rounded-full bg-blue-500"></div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">Pass Rate</span>
            <span className="text-sm font-bold text-violet-600">100%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 w-full rounded-full bg-violet-500"></div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">Normal + Internal Split</span>
            <span className="text-sm font-bold text-slate-700">70 : 30</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-[70%] rounded-full bg-emerald-500"></div>
            <div className="h-2 w-[30%] rounded-full bg-indigo-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceSummaryCard