function Dataloading({ path }) {
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-700">
          {path} Loading...
        </p>
      </div>
    </>
  );
}
export default Dataloading