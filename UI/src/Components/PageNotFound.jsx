import React from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineArrowLeft,
    HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { userRoutingDashboard } from "../Apis/Islogin";

const PageNotFound = () => {
    return (
        <>


            <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

                    {/* BackgrounD 404 */}
                    <h1 className="absolute right-6 top-4 select-none text-[180px] font-black text-slate-100 hidden md:block">
                        404
                    </h1>

                    <div className="relative grid lg:grid-cols-2">
                        {/* Left Parta */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">

                            <span className="mb-6 w-fit rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-600">
                                Error 404
                            </span>

                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <HiOutlineExclamationTriangle size={32} />
                            </div>

                            <h2 className="text-4xl font-bold text-slate-900">
                                Page Not Found
                            </h2>

                            <p className="mt-4 text-slate-600 leading-7">
                                Sorry, the page you are trying to access doesn't exist or may
                                have been moved. Please check the URL or return to your dashboard.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    <HiOutlineArrowLeft size={20} />
                                    Go Back
                                </button>

                                <Link
                                    to={userRoutingDashboard}
                                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                                >
                                    <HiOutlineHome size={20} />
                                    Dashboard
                                </Link>
                            </div>
                        </div>

                        {/* Right Part*/}
                        <div className="hidden lg:flex items-center justify-center bg-slate-50 border-l border-slate-200">

                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
                                    <HiOutlineExclamationTriangle
                                        size={56}
                                        className="text-blue-600"
                                    />
                                </div>

                                <h3 className="text-6xl font-extrabold text-slate-900">
                                    404
                                </h3>

                                <p className="mt-3 text-slate-500">
                                    This page isn't available.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default PageNotFound;