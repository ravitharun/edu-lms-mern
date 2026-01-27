import React from 'react'
import { Link } from 'react-router-dom'
import { MdArrowLeft } from "react-icons/md";

function BackButton({page}) {
    console.log(page,'page')
    let pagered=page=="my-course"?"/my-course":"/"
    return (
        <>

            <Link to={pagered}>
                <div className="flex justify-start mt-6">
                    <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md 
                     hover:bg-blue-500 hover:shadow-lg transition-all duration-300">
                        <MdArrowLeft className="text-lg" />
                       {page}
                    </button>
                </div>

            </Link>

        </>
    )
}

export default BackButton