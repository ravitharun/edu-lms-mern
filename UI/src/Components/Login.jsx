import { Link, useNavigate } from "react-router-dom";
import { reverseOrder, ToastPostion } from "../ReactToast/Toast";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { handelLogin } from "../Apis/Signup";
import toast, { Toaster } from 'react-hot-toast';
import { UserRole } from "../Apis/Islogin";
import RedirectPopup from "./RedirectPopup";

export default function Login() {
  const [StudentEmail, setStudentEmail] = useState("")
  const [StudentPassword, setStudentPassword] = useState("")
  const [role, setrole] = useState("")
  const [ischeck, setcheck] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const redirect = useNavigate("")
  const [loading, setloading] = useState(false)
  const [redirectloadin, setredirectloading] = useState(false)
  // handel login api data
  const handelloginapi = async (e) => {

    try {
      if (!StudentEmail || !StudentPassword || !role) {
        toast.error("Fill the required field's to login.")

      }
      if (!ischeck) {
        return toast.error("U Not agree to the Terms & Conditions. ")
      }
      const Userdata = {
        StudentEmail,
        role,
        StudentPassword
      }
      setloading(true)
      setredirectloading(true)
      const get_user_valid = await handelLogin(Userdata, e)
      console.log(get_user_valid.data,"get_user_valid")
      setloading(false)
      setredirectloading(false)
      if (get_user_valid.data.message == "The password is incorrect"
      ) {
        return toast.error(get_user_valid.response.data.message)
      }
      if (get_user_valid.data.user.role == "Teacher") {
        setredirectloading(true)
        toast.success(`Login successfully - Hey ! ${get_user_valid.data.user.name}- ${get_user_valid.data.user.role}`)
        setTimeout(() => {
          return window.location.href = "/admin-dashboard"
        }, 3500);
      }
      else if (get_user_valid.data.user.role == 'Admin') {
        toast.success(`Login successfully - Hey ! ${get_user_valid.data.user.name}- ${get_user_valid.data.user.role}`)
        setredirectloading(true)
        setTimeout(() => {

          return window.location.href = "/AdminDashboard"
        }, 3500)

      }
      else {
        toast.success(`Login successfully - Hey ! ${get_user_valid.data.user.name}- ${get_user_valid.data.user.role}`)
        setredirectloading(true)
        setTimeout(() => {

          return window.location.href = "/"
        }, 3500);

      }
    }
    catch (error) {
      console.log("Err", error)
    }
  }



  return (
    <>
      <Toaster></Toaster>
      <div className="flex min-h-screen items-center justify-center px-4">

        <div className="w-full max-w-sm rounded-xl bg-gray-800 p-6 shadow-lg">

          {/* Heading */}
          <h2 className="mb-1 text-center text-xl font-bold text-white">
            Login Your LMS Account
          </h2>
          <p className="mb-4 text-center text-xs text-gray-400">
            Login as a Student or Teacher
          </p>

          <form className="space-y-4">

            {/* Role */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">
                Select Role
              </label>
              <div className="flex gap-3">
                <label className="flex w-full items-center gap-2 rounded-md border border-gray-600 p-2 text-xs text-gray-200">
                  <input type="radio" name="role" className="accent-indigo-500" onClick={() => setrole("student")} />
                  Student
                </label>
                <label className="flex w-full items-center gap-2 rounded-md border border-gray-600 p-2 text-xs text-gray-200">
                  <input type="radio" name="role" className="accent-indigo-500" onClick={() => setrole("teacher")} />
                  Teacher
                </label>
                <label className="flex items-center gap-2 w-full border border-gray-600 rounded-md p-2 text-xs text-gray-200">
                  <input
                    type="radio"
                    name="role"
                    className="accent-indigo-500"
                    onChange={() => setrole("Admin")}
                  />
                  Admin
                </label>
              </div>
            </div>


            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-md bg-gray-700 px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </div>




            {/* Password */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-300">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full rounded-md bg-gray-700 px-3 py-1.5 pr-10 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setStudentPassword(e.target.value)}
                required
              />

              <span
                className="absolute right-3 top-7 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>




            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 h-3.5 w-3.5 accent-indigo-500" required onClick={() => setcheck((prev) => !prev)
              } />
              <span className="text-xs text-gray-300">
                {ischeck ? "I" : "Not"} agree to the <span className="text-indigo-400">Terms & Conditions</span>
              </span>
            </div>

            {/* Login */}
            <p className="text-center text-xs text-gray-400">
              Don't have an account?{" "}
              <Link to="/siginup" className="text-indigo-400 hover:underline">
                Create New account
              </Link>
            </p>

            {/* Submit */}

            <button
              onClick={handelloginapi}
              disabled={loading}
              className={`px-6 py-2 rounded-md text-white font-medium
  transition-all duration-300 w-full
  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* OR */}
          <div className="my-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-600" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-600" />
          </div>

          <p className="text-center text-xs text-gray-400">
            Sign In with Google (coming soon)
          </p>
        </div>
      </div>
      {redirectloadin && (
        <RedirectPopup
          onComplete={handelloginapi}
          type='Login '
        />
      )}
    </>
  )
}