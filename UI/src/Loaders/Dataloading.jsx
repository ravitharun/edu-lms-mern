function DataLoading({
  path = "Loading",
  description = "Please wait while we fetch the latest data...",
}) {
  return (
    <div className="flex min-h-[350px] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
        {/* Spinner */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-xl font-semibold text-slate-800">
          {path}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>

        {/* Animated dots */}
        <div className="mt-6 flex justify-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></span>
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></span>
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-600"></span>
        </div>
      </div>
    </div>
  );
}

export default DataLoading;