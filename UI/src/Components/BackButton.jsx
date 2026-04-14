import React from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FiHome } from "react-icons/fi";

function BackButton({ page, currentPage }) {

    const pagered = page === "my-course" ? "/my-course" : "/";

    return (
        <div className="w-full mt-6">
            <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-5 py-3 shadow-sm">

                {/* Back Button (Hide on Dashboard) */}
                {page !== "dashboard" && (
                    <>
                        <Link to={pagered}>
                            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                                <MdArrowBack className="text-lg" />
                                Back
                            </button>
                        </Link>

                        <span className="text-gray-300">/</span>
                    </>
                )}

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm">

                    <FiHome className="text-gray-400" />

                    <Link to="/" className="text-gray-500 hover:text-blue-600">
                       {page
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")}
                    </Link>


                    {currentPage ?
                        <>
                            <span className="text-gray-400">›</span>
                            <span className="text-gray-800 font-semibold">{currentPage}</span>
                        </>
                        : "no"}

                </div>

            </div>
        </div>
    );
}

export default BackButton;