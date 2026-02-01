import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handelapiSigup } from "../Apis/Signup";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";

export default function Signup() {
    const [StudentName, setStudentName] = useState("");
    const [StudentEmail, setStudentEmail] = useState("");
    const [StudentPassword, setStudentPassword] = useState("");
    const [StudentConifrmPassword, setStudentConifrmPassword] = useState("");
    const [role, setrole] = useState("");
    const [ischeck, setcheck] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);

    const navigate = useNavigate();

    const Handeldata = async (e) => {
        e.preventDefault();

        if (!StudentEmail || !StudentName || !StudentPassword || !StudentConifrmPassword || !role) {
            return toast.error("Fill the required fields");
        }
        if (!ischeck) return toast.error("Agree to Terms & Conditions");
        if (StudentPassword !== StudentConifrmPassword) return toast.error("Passwords do not match");

        const data = { StudentEmail, StudentName, StudentPassword, StudentConifrmPassword, role, ischeck };
        const res = await handelapiSigup(data, e);
        if (res?.status === 201) {
            toast.success("Account Created");
            navigate("/login");
        }
    };

    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        if (file) setProfilePreview(URL.createObjectURL(file));
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center px-4 py-8 ">
                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-xl bg-gray-900">

                    {/* IMAGE SECTION */}
                    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
                        <div className="text-center text-white space-y-2">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                                alt="LMS"
                                className="w-32 sm:w-40 mx-auto drop-shadow-lg"
                            />
                            <h2 className="text-lg sm:text-xl font-bold">Welcome to LMS</h2>
                            <p className="text-xs sm:text-sm opacity-90">Learn • Teach • Grow together</p>
                        </div>
                    </div>

                    {/* FORM SECTION */}
                    <div className="p-4 sm:p-6 flex flex-col justify-center">
                        <h2 className="text-xl font-bold text-white text-center mb-2">Create Your LMS Account</h2>
                        <p className="text-xs text-gray-400 text-center mb-4">Register as Student or Teacher</p>

                        <form className="space-y-3">

                            {/* Full Name & Email in Row */}
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                {/* Full Name */}
                                <div className="flex flex-col w-full">
                                    <label htmlFor="fullname" className="text-xs text-gray-300 mb-1">Full Name</label>
                                    <input
                                        id="fullname"
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setStudentName(e.target.value)}
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col w-full mt-2 sm:mt-0">
                                    <label htmlFor="email" className="text-xs text-gray-300 mb-1">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setStudentEmail(e.target.value)}
                                    />
                                </div>
                            </div>


                            {/* Role Selection */}
                            <div className="flex flex-col gap-2 w-full">
                                {/* Role Label */}
                                <span className="text-xs text-gray-300">Role</span>

                                {/* Radio Buttons */}
                                <div className="flex gap-2 w-full">
                                    <label className="flex items-center gap-2 w-full border border-gray-600 rounded-md p-2 text-xs text-gray-200">
                                        <input
                                            type="radio"
                                            name="role"
                                            className="accent-indigo-500"
                                            onChange={() => setrole("student")}
                                        />
                                        Student
                                    </label>
                                    <label className="flex items-center gap-2 w-full border border-gray-600 rounded-md p-2 text-xs text-gray-200">
                                        <input
                                            type="radio"
                                            name="role"
                                            className="accent-indigo-500"
                                            onChange={() => setrole("Teacher")}
                                        />
                                        Teacher
                                    </label>
                                </div>
                            </div>


                            {/* Password & Confirm Password in Row */}
                            <div className="flex flex-col sm:flex-row sm:gap-3">
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full rounded-md bg-gray-700 px-3 py-2 pr-10 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        onChange={(e) => setStudentPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="relative w-full mt-2 sm:mt-0">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className="w-full rounded-md bg-gray-700 px-3 py-2 pr-10 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        onChange={(e) => setStudentConifrmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Profile Image Upload */}
                            <div className="flex items-center gap-3 mt-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-600">
                                    {profilePreview ? (
                                        <img src={profilePreview} alt="profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <FaUserCircle className="text-gray-500 text-2xl sm:text-3xl" />
                                    )}
                                </div>
                                <label className="cursor-pointer">
                                    <span className="px-3 py-1 text-xs sm:text-sm rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition">
                                        Upload
                                    </span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
                                </label>
                            </div>

                            {/* Terms */}
                            <div className="flex items-center gap-2 text-xs text-gray-300 mt-2">
                                <input type="checkbox" className="accent-indigo-500" onChange={() => setcheck(!ischeck)} />
                                <span>I agree to the <span className="text-indigo-400">Terms & Conditions</span></span>
                            </div>

                            {/* Google Sign Up Button */}


                            {/* Normal Sign Up */}
                            <button
                                type="button"
                                onClick={Handeldata}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold transition"
                            >
                                Sign Up
                            </button>
                            {/* Or separator */}
                            <div className="flex items-center my-2">
                                <hr className="flex-grow border-gray-600" />
                                <span className="mx-2 text-gray-400 text-xs">or</span>
                                <hr className="flex-grow border-gray-600" />
                            </div>
                            <div className="flex justify-center mt-2">
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-full bg-white hover:bg-gray-100 text-gray-800 py-2 rounded-md shadow-md font-medium transition"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                        alt="Google"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Sign up with Google
                                </button>
                            </div>


                            {/* Login */}
                            <p className="text-center text-xs text-gray-400 mt-1">
                                Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
