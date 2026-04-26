import React from "react";

function AddingSoon({ pathname }) {
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-md rounded-[28px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-8 text-center relative overflow-hidden">
    
    {/* Decorative glow */}
    <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />

    {/* Badge */}
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 mb-4">
      <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
      New feature in progress
    </div>

    {/* Title */}
    <h2 className="text-2xl font-bold tracking-tight text-slate-800">
      Feature Coming Soon 🚧
    </h2>

    {/* Path */}
    <p className="mt-2 text-sm text-slate-500 break-all">
      {pathname}
    </p>

    {/* Description */}
    <p className="mt-4 text-sm leading-6 text-slate-600 max-w-sm mx-auto">
      We’re building something useful here. This section will be available soon with a smoother experience.
    </p>

    {/* Loader */}
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-4 border-slate-200" />
        <div className="absolute h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin motion-reduce:animate-none" />
        <div className="absolute h-8 w-8 rounded-full bg-blue-50 shadow-inner" />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">
        Loading...
      </p>
    </div>
  </div>
</div>
    // </div>
  );
}
export default AddingSoon;
