import React from 'react'
import App from '../../App'
import { UserName } from '../../Apis/Islogin'

function UpdatePassword() {
  return (
    <>

      <App></App>
      <div>

        <form className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5 mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
            Update Password
          </h2>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={UserName.email}
              disabled
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
            />
            <p className="text-xs text-gray-400">
              Email cannot be changed
            </p>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium
               hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            Update Password
          </button>
        </form>

      </div>
    </>
  )
}

export default UpdatePassword