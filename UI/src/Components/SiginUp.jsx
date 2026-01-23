import { use, useState } from "react";
import { Link } from "react-router-dom";
import { handelapiSigup } from "../Apis/Signup";
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Siginup() {
    const [StudentName, setStudentName] = useState("")
    const [StudentEmail, setStudentEmail] = useState("")
    const [StudentPassword, setStudentPassword] = useState("")
    const [StudentConifrmPassword, setStudentConifrmPassword] = useState("")
    const [role, setrole] = useState("")
    const [ischeck, setcheck] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // 
    const Handeldata = async (e) => {
        e.preventDefault()
        // check agree to the Terms & Conditions yes or not


        // check the input data is empty or not
        if (!StudentEmail || !StudentName || !StudentPassword || !StudentConifrmPassword || !role) {
            console.log({
                StudentEmail,
                StudentName,
                StudentPassword,
                StudentConifrmPassword,
                role,
                ischeck
            })
            return toast.error("Fill the required feilds")
        }
        if (!ischeck) {
            return toast.error("Not agree to the Terms & Conditions .")
        }
        if (StudentConifrmPassword != StudentPassword) {
            return toast.error("ConifrmPassword And Passowrd   is Not matching ")

        }
        // make the data of json format 
        const data = {
            StudentEmail,
            StudentName,
            StudentPassword,
            StudentConifrmPassword,
            role,
            ischeck
        }
        await handelapiSigup(data, e)
    }
    return (
        <>
            <div><Toaster></Toaster></div>
            {/* Create new account */}
            <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">

                <div className="w-full max-w-sm rounded-xl bg-gray-800 p-6 shadow-lg">

                    {/* Heading */}
                    <h2 className="mb-1 text-center text-xl font-bold text-white">
                        Create Your LMS Account
                    </h2>
                    <p className="mb-4 text-center text-xs text-gray-400">
                        Register as a Student or Teacher
                    </p>

                    <form className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block text-xs font-medium text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-md bg-gray-700 px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => setStudentName(e.target.value)}
                            />
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
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-300">
                                Select Role
                            </label>
                            <div className="flex gap-3">
                                <label className="flex w-full items-center gap-2 rounded-md border border-gray-600 p-2 text-xs text-gray-200">
                                    <input type="radio" name="role" className="accent-indigo-500"
                                        onClick={(e) => setrole("student")} />
                                    Student
                                </label>
                                <label className="flex w-full items-center gap-2 rounded-md border border-gray-600 p-2 text-xs text-gray-200">
                                    <input type="radio" name="role" className="accent-indigo-500" onChange={(e) => setrole("Teacher")} />
                                    Teacher
                                </label>
                            </div>
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
                            />

                            <span
                                className="absolute right-3 top-7 cursor-pointer text-gray-400"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-300">
                                Confirm Password
                            </label>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="mt-1 w-full rounded-md bg-gray-700 px-3 py-1.5 pr-10 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => setStudentConifrmPassword(e.target.value)}
                            />

                            <span
                                className="absolute right-3 top-7 cursor-pointer text-gray-400"
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2 hover:cursor-pointer">
                            <input type="checkbox" className="mt-1 h-3.5 w-3.5 accent-indigo-500" required onClick={() => setcheck((prev) => !prev)
                            } />
                            <span className="text-xs text-gray-300">
                                {ischeck ? "I" : "Not"}    agree to the <span className="text-indigo-400">Terms & Conditions</span>
                            </span>
                        </div>

                        {/* Login */}
                        <p className="text-center text-xs text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-400 hover:underline">
                                Login
                            </Link>
                        </p>


                    </form>
                    <br />
                    {/* Submit */}

                    <button className="w-full rounded-md bg-indigo-600 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500" onClick={Handeldata}>
                        Sign Up
                    </button>
                    {/* OR */}
                    <div className="my-4 flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-600" />
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gray-600" />
                    </div>

                    <p className="text-center text-xs text-gray-400">
                        Sign up with Google (coming soon)
                    </p>
                </div>
            </div>




        </>
    );
}
