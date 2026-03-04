import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Board({ path,className }) {
    return (
<div className={`flex items-center gap-2 text-sm ${className}`}>

  {path !== "Dashboard" && (
    <>
      <Link to="/AdminDashboard">
        <span className="font-medium text-gray-500 hover:text-blue-600 transition">
          Dashboard
        </span>
      </Link>

      <FaChevronRight className="text-xs text-gray-400" />
    </>
  )}

  <span className="font-semibold text-blue-600">
    {path}
  </span>

</div>
    )
}

export default Board