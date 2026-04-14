import React from "react";

const ProfileLoading = ({ checkResponse }) => {
  return (
    <>

      {checkResponse







        ?
        < div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">

          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl px-10 py-8 flex flex-col items-center gap-4">

            {/* Spinner */}
            <div className="w-12 h-12 border-[5px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            {/* Text */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Updating Profile
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Please wait while we save your changes...
              </p>
            </div>

          </div>

        </ div> : ""
      }
    </>

  );
};

export default ProfileLoading;
