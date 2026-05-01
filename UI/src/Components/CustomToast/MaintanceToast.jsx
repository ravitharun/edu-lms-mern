import React, { useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTools, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

function MaintenanceToast({ text, setshowalert, type = "success" }) {
  // auto close
  useEffect(() => {
    const timer = setTimeout(() => {
      setshowalert(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, [setshowalert]);

  // TYPE CONFIG
  const config = {
    success: {
      icon: <FaCheckCircle />,
      bg: "bg-green-50",
      text: "text-green-700",
      iconColor: "text-green-500",
      border: "border-green-200",
    },
    error: {
      icon: <FaTimesCircle />,
      bg: "bg-red-50",
      text: "text-red-700",
      iconColor: "text-red-500",
      border: "border-red-200",
    },
    warning: {
      icon: <FaExclamationTriangle />,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      iconColor: "text-yellow-500",
      border: "border-yellow-200",
    },
    default: {
      icon: <FaTools />,
      bg: "bg-gray-50",
      text: "text-gray-800",
      iconColor: "text-orange-500",
      border: "border-gray-200",
    },
  };

  const current = config[type] || config.default;

  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 
        animate-dropFromTop 
        ${current.bg} ${current.border}
        shadow-xl 
        rounded-xl 
        px-5 py-3 
        flex items-center gap-3 
        min-w-[300px] 
        z-50
      `}
    >
      {/* Icon */}
      <div className={`text-xl ${current.iconColor}`}>
        {current.icon}
      </div>

      {/* Message */}
      <span className={`text-sm font-medium flex-1 ${current.text}`}>
        {text}
      </span>

      {/* Close */}
      <button
        onClick={() => setshowalert(false)}
        className="text-gray-500 hover:text-red-500 transition text-xl"
        type="button"
      >
        <IoMdCloseCircle />
      </button>
    </div>
  );
}

export default MaintenanceToast;