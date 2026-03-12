import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PoupLogin({ check }) {

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (check) {
            console.log("Working")
            setShow(true)
        } else {
            console.log("user")
            setShow(false)
        }
    }, [check])

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                    <div className="bg-white p-6 rounded-xl shadow-xl text-center w-[350px]">

                        <h2 className="text-lg font-semibold mb-2">
                            Login Required
                        </h2>

                        <p className="text-sm text-gray-500 mb-4">
                            Please login to continue
                        </p>

                        <Link to="/login">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                                Go to Login
                            </button>
                        </Link>

                    </div>

                </div>
            )}
        </>
    )
}

export default PoupLogin