import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";

function RedirectPopup({ onComplete, type }) {
    const endTime = useRef(Date.now() + 3500);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="relative bg-white/90 backdrop-blur-md px-12 py-10 rounded-2xl shadow-2xl text-center w-[320px] animate-[zoomIn_.3s_ease]">

                {/* Heading */}
                <h2 className="text-lg font-semibold text-gray-700 tracking-wide">
                    Redirecting to the  -{type == 'Logout' ? type : "Home"} Page
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    Please wait while we take you there
                </p>

                {/* Countdown Circle */}
                <div className="relative flex items-center justify-center">

                    <Countdown
                        date={endTime.current}
                        renderer={({ seconds, completed }) => {
                            if (completed) {
                                onComplete();
                                return null;
                            }
                            return (
                                <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-blue-500 shadow-lg">

                                    {/* Number */}
                                    <span className="text-4xl font-bold text-blue-600">
                                        {seconds + 1}
                                    </span>

                                    {/* Pulse Effect */}
                                    <span className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-30"></span>

                                </div>
                            );
                        }}
                    />

                </div>

                {/* Bottom Text */}
                <p className="mt-6 text-xs text-gray-400">
                    Securing your session...
                </p>

            </div>
        </div>
    );
}

export default RedirectPopup;