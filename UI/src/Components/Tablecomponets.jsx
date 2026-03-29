import React from "react";
import { FiInbox } from "react-icons/fi";

function Tablecomponets({  col,text }) {


  return (
    <tr>
      <td colSpan={col} className="text-center py-12">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FiInbox size={40} className="mb-2 text-gray-400" />
          <p className="text-lg font-medium">No Data Found</p>
          <p className="text-sm text-gray-400">
            {text}
          </p>
        </div>
      </td>
    </tr>
  );
}

export default Tablecomponets;