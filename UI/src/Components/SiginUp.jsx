import { Link } from "react-router-dom";

export default function Siginup() {
    return (
        <>
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
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-300">
                                Select Role
                            </label>
                            <div className="flex gap-3">
                                <label className="flex w-full items-center gap-2 rounded-md border border-gray-600 p-2 text-xs text-gray-200">
                                    <input type="radio" name="role" className="accent-indigo-500" defaultChecked/>
                                    Student
                                </label>
                                <label className="flex w-full items-center gap-2 rounded-md border border-gray-600 p-2 text-xs text-gray-200">
                                    <input type="radio" name="role" className="accent-indigo-500" />
                                    Teacher
                                </label>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-md bg-gray-700 px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-md bg-gray-700 px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1 h-3.5 w-3.5 accent-indigo-500" />
                            <span className="text-xs text-gray-300">
                                I agree to the <span className="text-indigo-400">Terms & Conditions</span>
                            </span>
                        </div>

                        {/* Login */}
                        <p className="text-center text-xs text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-400 hover:underline">
                                Login
                            </Link>
                        </p>

                        {/* Submit */}
                        <button className="w-full rounded-md bg-indigo-600 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">
                            Sign Up
                        </button>
                    </form>

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
