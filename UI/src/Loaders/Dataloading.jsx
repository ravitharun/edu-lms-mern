// // import React from "react";

// // function Dataloading() {
// //   return (
// //     <div className="flex items-center justify-center min-h-[300px]
// // ">
// //       <div className="flex flex-col items-center gap-3">

// //         {/* Spinner */}
// //         <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

// //         {/* Text */}
// //         <p className="text-sm font-medium text-gray-700">
// //           Loading...
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dataloading;
// import React from "react";

// function Dataloading() {
//   return (
//     <div className="flex items-center justify-center h-full w-full">
//       <div className="flex flex-col items-center gap-3">

//         {/* Spinner */}
//         <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

//         {/* Text */}
//         <p className="text-sm font-medium text-gray-700">
//           Loading...
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Dataloading;
import React from "react";

function Dataloading({ path }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-700">
          {path}  Loading...
        </p>
      </div>
    </div>
  );
}

export default Dataloading;
