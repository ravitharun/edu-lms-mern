
import React from "react";

function BackgroungImgLoader() {
  return (
    <div className="flex items-center justify-center w-full h-screen relative overflow-hidden">
      {/* Animated Gradient Circles */}
      <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-40 animate-ping"></div>
      <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 opacity-50 animate-ping animation-delay-200"></div>
      <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 via-blue-500 to-purple-500 opacity-60 animate-ping animation-delay-400"></div>

      {/* Loading text in the center */}
      <div className="relative flex items-center justify-center">
        <h1 className="text-3xl font-bold text-black animate-bounce-slow">
          Just a moment...
        </h1>

      </div>

      {/* Custom Tailwind Animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s infinite;
        }
        @keyframes animation-delay-200 { 0%, 100% { transform: scale(0); } 50% { transform: scale(1); } }
        @keyframes animation-delay-400 { 0%, 100% { transform: scale(0); } 50% { transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default BackgroungImgLoader;




