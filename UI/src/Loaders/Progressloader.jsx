import React from "react";

function ProgressLoader({path}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-600">
      {/* Big Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

      {/* Text */}
      <span className="text-base font-medium">
        Updating In progress… <b
  className="
    bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500
    bg-[length:200%_200%]
    bg-clip-text text-transparent
    animate-gradientMove
    drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]
  "
>
  {path}
</b>
      </span>
    </div>

  );
}

export default ProgressLoader;
