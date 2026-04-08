import React from 'react'

function HandelshowPoupLeave({ PoupData, click }) {

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    return (
<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">

  <div className="bg-white rounded-xl shadow-2xl w-[440px] border">

    {/* Header */}
    <div className="flex justify-between items-center px-5 py-3 border-b">
      <h2 className="text-lg font-semibold text-gray-700">Leave Details</h2>

      <button
        onClick={click}
        className="text-gray-500 hover:text-red-500 text-xl cursor-pointer"
      >
        ✕
      </button>
    </div>

    {/* Content */}
    <div className="p-5 grid grid-cols-2 gap-y-3 text-sm">

      <span className="text-gray-500">Employee</span>
      <span className="font-medium">{PoupData.EmpName}</span>

      <span className="text-gray-500">Employee ID</span>
      <span className="font-medium">{PoupData.EmpID}</span>

      <span className="text-gray-500">Leave Type</span>
      <span className="font-medium">{PoupData.leaveType}</span>

      <span className="text-gray-500">From Date</span>
      <span className="font-medium">{formatDate(PoupData.Fromdate)}</span>

      <span className="text-gray-500">To Date</span>
      <span className="font-medium">{formatDate(PoupData.Todate)}</span>

      <span className="text-gray-500">Total Days</span>
      <span className="font-medium">{PoupData.TotalDays}</span>

      <span className="text-gray-500">Reason</span>
      <span className="font-medium">{PoupData.ReasonLeave}</span>

      <span className="text-gray-500">Status</span>
      <span>
        <span className="px-2 py-1 text-xs rounded-md bg-yellow-100 text-yellow-700 font-medium">
          {PoupData.Application_status}
        </span>
      </span>

    </div>

  </div>

</div>
    )
}

export default HandelshowPoupLeave