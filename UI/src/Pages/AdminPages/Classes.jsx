import React, { useState } from "react";
import App from "../../App";
import { FaCalendarAlt, FaClipboardCheck, FaPlus, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";

function Classes() {
    const[Action,SetActon]=useState("")
    const[handelAction,SethandelActon]=useState(false)
    console.log(Action,'Action')
    const handelActionType=(type)=>{
        console.log(type)
    }
  return (
    <>
      <App />
      <div className="text-2xl font-semibold text-gray-800 mb-4">Classes </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <QuickAction icon={<FaPlus />} label="Add Assignment" color="bg-blue-100 text-blue-500" />
        <QuickAction icon={<FaUpload />} label="Upload Material" color="bg-green-100 text-green-500" />
        <QuickAction icon={<FaClipboardCheck />} label="Mark Attendance" color="bg-yellow-100 text-yellow-500" />
        <QuickAction icon={<FaCalendarAlt />} label="Add Event" color="bg-purple-100 text-purple-500" />
      </div>
      {/* {} */}
    </>
  );
}

// QuickAction Component
const QuickAction = ({ icon, label, color }) => (
  <div
    className={`bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-gray-50`}
    onClick={()=>handelActionType(label)}
  >
    <div className={`text-2xl ${color}`}>{icon}</div>
    <p className="text-sm font-medium text-gray-700">{label}</p>
  </div>
);

export default Classes;
