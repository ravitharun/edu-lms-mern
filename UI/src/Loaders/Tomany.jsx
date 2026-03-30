
import React, { useEffect, useState } from 'react'

function Tomany({ message }) {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 animate-[fadeIn_0.3s_ease-out]">

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">
                        ⚠️
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Too Many Requests
                        </h2>
                        <p className="text-sm text-gray-500">
                            Request limit exceeded
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t my-4"></div>

                {/* Message */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {message || "You have exceeded the allowed number of requests. Please wait before trying again. This helps maintain system performance for all students and faculty."}
                </p>

                {/* Countdown Section */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Retry available in</span>
                        <span className="font-medium text-gray-700">{timeLeft}s</span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-500 transition-all duration-1000"
                            style={{ width: `${(timeLeft / 60) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>

                    <button
                        disabled={timeLeft > 0}
                        onClick={() => window.location.reload()}
                        className={`px-4 py-2 text-sm rounded-lg text-white transition
          ${timeLeft > 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"}`}
                    >
                        Retry
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Tomany