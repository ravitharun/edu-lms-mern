import React from 'react'

function NotFound({ message }) {
  return (
    <div className="flex items-center justify-center w-full h-[60vh] px-4">
      
      <div className="text-center max-w-sm w-full">
        
        {/* Icon */}
        <div className="text-5xl mb-4">📭</div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          No Data Found
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-5">
          {message || "There is no data available to display."}
        </p>

        {/* Optional Action */}
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Refresh
        </button>

      </div>

    </div>
  )
}

export default NotFound