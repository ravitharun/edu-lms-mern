import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { FetchMaintanceMode } from "../Pages/Admin/APIS/maintanceModeApi";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { userRoutingDashboard } from "../Apis/Islogin";

function Undermanitance() {
    const [time, settime] = useState(null);
const navigate=useNavigate("")
    const releaseDate = time ? new Date(time) : null;

    // Fetch maintenance date
    useEffect(() => {
        const response = async () => {
            try {
                const res = await FetchMaintanceMode();
                const data = res?.data?.date?.[0];

                settime(data?.maintenanceUntil);
            } catch (error) {
                toast.error(error.message);
            }
        };

        response();
    }, []);




    if (new Date() >= releaseDate) {

        return <Outlet />;
    }






    // 🔹 Loading state
    if (!releaseDate) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }





    // 🔹 MAINTENANCE UI
    return (
        <Countdown
            date={releaseDate}
            renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                    return navigate(userRoutingDashboard)
                }
                return (
                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
                        <div className="bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center border border-white/20">

                            {/* Title */}
                            <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                                System Maintenance -{completed ? "some" : "novlu"}
                            </h1>

                            {/* Subtitle */}
                            <p className="text-gray-300 text-sm sm:text-base mb-8">
                                We're upgrading your LMS experience. Hang tight!
                            </p>

                            {/* ⏳ Countdown */}
                            <div className="flex justify-center gap-4 mb-8">
                                {[{ label: "Days", val: days },
                                { label: "Hours", val: hours },
                                { label: "Minutes", val: minutes },
                                { label: "Seconds", val: seconds }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 w-20">
                                        <p className="text-2xl font-bold text-white">{item.val}</p>
                                        <p className="text-xs text-gray-400">{item.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Date */}
                            <p className="text-gray-400 text-xs mb-6">
                                Launching on <br />
                                <span className="text-gray-200 font-medium">
                                    {releaseDate.toDateString()} <br />
                                    {releaseDate.toTimeString()}
                                </span>
                            </p>

                            {/* Loader */}
                            <div className="flex justify-center mb-6">
                                <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>

                            {/* Footer */}
                            <p className="text-xs text-gray-500 mb-6">
                                We’ll be back shortly. Thanks for your patience
                            </p>

                            {/* Reload */}
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
    );
}

export default Undermanitance;