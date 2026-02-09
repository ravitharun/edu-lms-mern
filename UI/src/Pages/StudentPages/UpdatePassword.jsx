import React from 'react'
import App from '../../App'
import { UserName } from '../../Apis/Islogin'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function UpdatePassword() {
  const [loading, setloadin] = useState(false)
    const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token,'token from ui')

  console.log(token); // abc123
  const handelUpdatepassowrd = async (e) => {

    e.preventDefault()
    try {
      // console.log('first')
      setloadin(true)
      const response = await axios.post("http://localhost:5001/api/password/passowrdUpdate", { email: UserName?.email })
      console.log(response.data.message)
      if (response.data.message == "emailSent.") {
        toast.success(`Email sent to the ${UserName?.email}`)
      }
      if(response.status==401){
        console.log(401)
      }
      setloadin(false)
    } catch (error) {
      // toast.error(
      if(error.message=='Network Error'){
        toast.error('Network Error')
        setloadin(false)
      }
    }

  }
  return (
    <>

      <App></App>
      <Toaster />
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
            // onClick={Handeldata}
            onClick={handelUpdatepassowrd}
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white font-medium
  transition-all duration-300 w-full
  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? (
              <span className="flex items-center gap-2 text-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin "></span>
                Sending An Email...
              </span>
            ) : (
              'update Password'
            )}
          </button>
        </form>

      </div>
    </>
  )
}

export default UpdatePassword