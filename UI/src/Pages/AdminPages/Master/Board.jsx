import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Board({ path }) {
    return (
        <>
            <div className="flex items-center text-sm text-gray-600 gap-2">
                <Link to="/AdminDashboard">
                    <span className="font-medium text-gray-500">{path == "Dashboard" ? "" : "Dashboard"}</span>
                </Link>
                {path && (
                    <>
                        {path == "Dashboard" ? "" : <FaChevronRight className="text-xs text-gray-400" />}
                        {path == 'Dashboard' ? "" :


                            <>

                                <span className="font-semibold text-blue-600">{path}</span>
                            </>

                        }
                    </>
                )}
            </div>

        </>
    )
}

export default Board