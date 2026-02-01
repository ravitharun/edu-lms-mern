import React from "react";

function LMSLoader() {
  return (
    <div className="flex items-center justify-center w-full h-screen relative bg-white overflow-hidden">
      {/* Soft pulsing circles */}
      <div className="absolute w-48 h-48 rounded-full bg-blue-400 opacity-20 animate-pulse-slow"></div>
      <div className="absolute w-36 h-36 rounded-full bg-indigo-400 opacity-25 animate-pulse-slower"></div>
      <div className="absolute w-24 h-24 rounded-full bg-purple-400 opacity-30 animate-pulse-slowest"></div>

      {/* Center text */}
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-800 animate-bounce-slow">
          Loading LMS...
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Please wait while we prepare your dashboard
        </p>
      </div>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(0.9); opacity: 0.2; }
          50% { transform: scale(1); opacity: 0.35; }
        }
        .animate-pulse-slow { animation: pulse-slow 2s infinite; }

        @keyframes pulse-slower {
          0%, 100% { transform: scale(0.9); opacity: 0.25; }
          50% { transform: scale(1); opacity: 0.4; }
        }
        .animate-pulse-slower { animation: pulse-slower 2.5s infinite; }

        @keyframes pulse-slowest {
          0%, 100% { transform: scale(0.9); opacity: 0.3; }
          50% { transform: scale(1); opacity: 0.45; }
        }
        .animate-pulse-slowest { animation: pulse-slowest 3s infinite; }
      `}</style>
    </div>
  );
}

export default LMSLoader;
