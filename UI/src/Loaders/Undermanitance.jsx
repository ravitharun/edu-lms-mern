import React, { useEffect, useState } from "react";
import Countdown from 'react-countdown';

function Undermanitance({ children, Ui }) {
    const releaseDate = new Date("Tue Apr 25 2026 21:07:23 GMT+0530");

    const [isLive, setIsLive] = useState(false);
    const [inter, setinter] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            if (new Date() >= releaseDate) {
                console.log("hey")
                setIsLive(true);

            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // ✅ AFTER RELEASE → SHOW FULL APP
    if (isLive) {
        return <>{children}</>;
    }

    return (
        <>
            {Ui === "both" && (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">


                    {/* ✅ Countdown INSIDE */}
                    <Countdown
                        date={new Date(releaseDate)}
                        renderer={({ days, hours, minutes, seconds, completed }) => {
                            if (completed) {
                                return (
                                    <p className="text-green-600 font-semibold mt-4">
                                        🚀 LMS is Live Now
                                    </p>
                                );
                            }

                            return (
                                <div className="flex gap-3 mt-4">

                                    {[{ label: "D", val: days },
                                    { label: "H", val: hours },
                                    { label: "M", val: minutes },
                                    { label: "S", val: seconds }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white shadow-md rounded-lg px-3 py-2 text-center w-14">
                                            <p className="text-lg font-bold text-gray-800">{item.val}</p>
                                            <p className="text-[10px] text-gray-500">{item.label}</p>
                                        </div>
                                    ))}

                                </div>
                            );
                        }}
                    />
                </div>
            )}
            <Countdown
                date={new Date(releaseDate)}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                        return (
                            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-3xl font-semibold">
                                🚀 LMS is Live Now
                            </div>
                        );
                    }

                    return (
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">

                            <div className="bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center border border-white/20">

                                {/* Top Glow */}
                                <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full mb-6 animate-pulse"></div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                                    🚧 System Maintenance
                                </h1>

                                {/* Subtitle */}
                                <p className="text-gray-300 text-sm sm:text-base mb-8">
                                    We're upgrading your LMS experience. Hang tight!
                                </p>

                                {/* ⏳ Countdown UI */}
                                <div className="flex justify-center gap-4 mb-8">

                                    {/* Hours */}
                                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 w-20">
                                        <p className="text-2xl font-bold text-white">{days}</p>
                                        <p className="text-xs text-gray-400">Days</p>
                                    </div>
                                    {/* Hours */}
                                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 w-20">
                                        <p className="text-2xl font-bold text-white">{hours}</p>
                                        <p className="text-xs text-gray-400">Hours</p>
                                    </div>

                                    {/* Minutes */}
                                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 w-20">
                                        <p className="text-2xl font-bold text-white">{minutes}</p>
                                        <p className="text-xs text-gray-400">Minutes</p>
                                    </div>

                                    {/* Seconds */}
                                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 w-20 animate-pulse">
                                        <p className="text-2xl font-bold text-white">{seconds}</p>
                                        <p className="text-xs text-gray-400">Seconds</p>
                                    </div>

                                </div>

                                {/* Date */}
                                <p className="text-gray-400 text-xs mb-6">
                                    Launching on <br />
                                    <span className="text-gray-200 font-medium">
                                        {new Date(releaseDate).toDateString()} <br />
                                        {new Date(releaseDate).toTimeString()}
                                    </span>
                                </p>

                                {/* Loader */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>

                                {/* Footer */}
                                <p className="text-xs text-gray-500 mb-6">
                                    We’ll be back shortly. Thanks for your patience 🙏
                                </p>

                                {/* Button */}
                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition duration-300"
                                >
                                    Reload Page
                                </button>

                            </div>
                        </div>
                    );
                }}
            />


        </>
    );
}

export default Undermanitance;