import React from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineArrowLeft,
    HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { userRoutingDashboard } from "../Apis/Islogin";

const PageNotFound = () => {
    return (
        <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
            <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <HiOutlineMagnifyingGlass className="text-2xl" />
                    </div>

                    <div className="mt-6 text-center">
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600">
                            ERROR 404
                        </span>

                        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                            Page not found
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                            The page you are looking for does not exist, was moved, or is not
                            available for your role in the LMS.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            onClick={() => window.location.href="/"}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                        >
                            <HiOutlineArrowLeft className="text-lg" />
                            Go Back
                        </button>

                        <Link
                            to={userRoutingDashboard}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                        >
                            <HiOutlineHome className="text-lg" />
                            Dashboard
                        </Link>
                    </div>

                    <div className="mt-6 border-t border-slate-200 pt-4 text-center">
                        <p className="text-xs text-slate-500 sm:text-sm">
                            Try returning to the dashboard, courses, assignments, or announcements page.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;