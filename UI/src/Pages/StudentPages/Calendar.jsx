// import React, { useEffect, useState } from "react";
// import Calendar from "color-calendar";

// import { 
//   FaCalendarAlt, 
//   FaBook, 
//   FaChalkboardTeacher 
// } from "react-icons/fa";
// import { MdAssignment } from "react-icons/md";
// import { GiPartyPopper } from "react-icons/gi";

// function AcademiCalendar({ role = "student" }) {
//   const [data, setData] = useState([]);

//   const events = [
//     {
//       start: "2026-09-15T09:00:00",
//       end: "2026-09-15T17:00:00",
//       name: "Blockchain Workshop",
//       color: "#22c55e",
//       desc: "Introduction to Blockchain Technology"
//     },
//     {
//       start: "2026-09-20T10:00:00",
//       end: "2026-09-20T14:00:00",
//       name: "Mid Semester Exam",
//       color: "#ef4444",
//       desc: "CSE Mid Semester Examination"
//     },
//     {
//       start: "2026-09-25T23:59:00",
//       end: "2026-09-25T23:59:59",
//       name: "Assignment Deadline",
//       color: "#3b82f6",
//       desc: "Submit React LMS Assignment"
//     },
//     {
//       start: "2026-09-28T00:00:00",
//       end: "2026-09-28T23:59:59",
//       name: "College Holiday",
//       color: "#f59e0b",
//       desc: "Festival Holiday"
//     }
//   ];

//   useEffect(() => {
//     const calendar = new Calendar({
//       id: "#color-calendar",
//       calendarSize: "large",
//       theme: "basic",
//       eventBulletMode: "multiple",
//       eventsData: events,
//       onSelectedDateChange: (date, events) => {
//         setData(events);
//       }
//     });
//   }, []);

//   return (
//     <div className="w-full p-6 bg-gray-50">
//       <div className="bg-white rounded-2xl shadow-lg border p-6 max-w-6xl mx-auto">
        
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-blue-500 rounded-xl">
//               <FaCalendarAlt className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Academic Calendar</h2>
//               <p className="text-sm text-gray-500">Stay organized with upcoming events</p>
//             </div>
//           </div>

//           {(role === "admin" || role === "teacher") && (
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-colors">
//               ➕ Add Event
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
//           {/* Event Legend - Simple */}
//           <div className="lg:col-span-1 bg-gray-50 rounded-xl p-5 border">
//             <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
//               📊 Event Types
//             </h3>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
//                 <FaBook className="w-5 h-5 text-red-500" />
//                 <span className="font-medium text-gray-800">Exam</span>
//               </div>
//               <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
//                 <MdAssignment className="w-5 h-5 text-blue-500" />
//                 <span className="font-medium text-gray-800">Assignment</span>
//               </div>
//               <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
//                 <FaChalkboardTeacher className="w-5 h-5 text-green-500" />
//                 <span className="font-medium text-gray-800">Workshop</span>
//               </div>
//               <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
//                 <GiPartyPopper className="w-5 h-5 text-yellow-500" />
//                 <span className="font-medium text-gray-800">Holiday</span>
//               </div>
//             </div>
//           </div>

//           {/* Calendar + Event Card */}
//           <div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
            
//             {/* Calendar */}
//             <div className="flex-1 bg-white border rounded-xl p-4 lg:p-6 min-h-[400px]">
//               <div id="color-calendar" className="w-full h-[350px] lg:h-[450px]"></div>
//             </div>

//             {/* Dynamic Event Card */}
//             <div className={`lg:w-80 flex-shrink-0 ${data.length === 0 ? 'h-64 lg:h-80' : 'h-auto lg:min-h-[350px] max-h-[450px]'}`}>
//               {data.length === 0 ? (
//                 <div className="bg-gray-50 border rounded-xl p-6 flex flex-col items-center justify-center h-full">
//                   <FaCalendarAlt className="w-12 h-12 text-gray-300 mb-4" />
//                   <h3 className="text-lg font-semibold text-gray-600 mb-2">No Event Selected</h3>
//                   <p className="text-sm text-gray-500 text-center">Click on any date to view events</p>
//                 </div>
//               ) : (
//                 <div className="bg-gradient-to-b from-white to-blue-50 border rounded-xl p-6 shadow-sm h-full flex flex-col">
//                   <div className="absolute -top-3 left-4">
//                     <span 
//                       className="px-3 py-1 rounded-full text-xs font-bold text-white shadow"
//                       style={{ backgroundColor: data[0]?.color }}
//                     >
//                       Event
//                     </span>
//                   </div>
                  
//                   <div className="flex-1 flex flex-col mt-4 space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
//                       {data[0]?.name}
//                     </h3>
                    
//                     <p className="text-sm text-gray-600 line-clamp-2">
//                       {data[0]?.desc}
//                     </p>
                    
//                     {/* Start Date & Time */}
//                     <div className="space-y-1">
//                       <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Start</label>
//                       <div className="flex items-center gap-2 text-sm">
//                         <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//                         📅 {new Date(data[0]?.start).toLocaleDateString('en-IN')}
//                         <span>•</span>
//                         ⏰ {new Date(data[0]?.start).toLocaleTimeString('en-IN', { 
//                           hour: '2-digit', 
//                           minute: '2-digit' 
//                         })}
//                       </div>
//                     </div>

//                     {/* End Date & Time */}
//                     <div className="space-y-1">
//                       <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">End</label>
//                       <div className="flex items-center gap-2 text-sm">
//                         <span className="w-2 h-2 bg-red-400 rounded-full"></span>
//                         📅 {new Date(data[0]?.end).toLocaleDateString('en-IN')}
//                         <span>•</span>
//                         ⏰ {new Date(data[0]?.end).toLocaleTimeString('en-IN', { 
//                           hour: '2-digit', 
//                           minute: '2-digit' 
//                         })}
//                       </div>
//                     </div>
                    
//                     <button className="mt-auto w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AcademiCalendar;
import React, { useEffect, useState } from "react";
import Calendar from "color-calendar";

import { 
  FaCalendarAlt, 
  FaBook, 
  FaChalkboardTeacher 
} from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";

function AcademiCalendar({ role = "student" }) {
  const [data, setData] = useState([]);

  const events = [
    {
      start: "2026-09-15T09:00:00",
      end: "2026-09-15T17:00:00",
      name: "Blockchain Workshop",
      color: "#22c55e",
      desc: "Introduction to Blockchain Technology"
    },
    {
      start: "2026-09-20T10:00:00",
      end: "2026-09-20T14:00:00",
      name: "Mid Semester Exam",
      color: "#ef4444",
      desc: "CSE Mid Semester Examination"
    },
    {
      start: "2026-09-25T23:59:00",
      end: "2026-09-25T23:59:59",
      name: "Assignment Deadline",
      color: "#3b82f6",
      desc: "Submit React LMS Assignment"
    },
    {
      start: "2026-09-28T00:00:00",
      end: "2026-09-28T23:59:59",
      name: "College Holiday",
      color: "#f59e0b",
      desc: "Festival Holiday"
    }
  ];

  // Detect event type from color
  const getEventType = (color) => {
    if (color?.includes("#ef")) return "Exam";
    if (color?.includes("#3b")) return "Assignment";
    if (color?.includes("#22")) return "Workshop";
    if (color?.includes("#f5")) return "Holiday";
    return "Event";
  };

  useEffect(() => {
    const calendar = new Calendar({
      id: "#color-calendar",
      calendarSize: "large",
      theme: "basic",
      eventBulletMode: "multiple",
      eventsData: events,
      onSelectedDateChange: (date, events) => {
        setData(events);
      }
    });
  }, []);

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg border p-6 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <FaCalendarAlt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Academic Calendar</h2>
              <p className="text-sm text-gray-500">Stay organized with upcoming events</p>
            </div>
          </div>

          {(role === "admin" || role === "teacher") && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-colors">
              ➕ Add Event
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Event Legend */}
          <div className="lg:col-span-1 bg-gray-50 rounded-xl p-5 border">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              📊 Event Types
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <FaBook className="w-5 h-5 text-red-500" />
                <span className="font-medium text-gray-800">Exam</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <MdAssignment className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-800">Assignment</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <FaChalkboardTeacher className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-800">Workshop</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <GiPartyPopper className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-gray-800">Holiday</span>
              </div>
            </div>
          </div>

          {/* Calendar + Event Card */}
          <div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
            
            {/* Calendar */}
            <div className="flex-1 bg-white border rounded-xl p-4 lg:p-6 min-h-[400px]">
              <div id="color-calendar" className="w-full h-[350px] lg:h-[450px]"></div>
            </div>

            {/* Dynamic Event Card */}
            <div className={`lg:w-80 flex-shrink-0 ${data.length === 0 ? 'h-64 lg:h-80' : 'h-auto lg:min-h-[380px] max-h-[480px]'}`}>
              {data.length === 0 ? (
                <div className="bg-gray-50 border rounded-xl p-6 flex flex-col items-center justify-center h-full">
                  <FaCalendarAlt className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Event Selected</h3>
                  <p className="text-sm text-gray-500 text-center">Click on any date to view events</p>
                </div>
              ) : (
                <div className="bg-gradient-to-b from-white to-blue-50 border rounded-xl p-6 shadow-sm h-full flex flex-col relative pt-10">
                  
                  {/* TWO TOP LABELS */}
                  <div className="absolute top-3 left-3 right-3 flex flex-col sm:flex-row gap-2">
                    {/* Event Type Label */}
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow flex-shrink-0 bg-opacity-90"
                      style={{ backgroundColor: data[0]?.color }}>
                      {getEventType(data[0]?.color)}
                    </span>
                    
                    {/* Event Badge */}
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow bg-gray-600 flex-grow text-center flex-shrink">
                      Event
                    </span>
                  </div>
                  
                  <div className="flex-1 flex flex-col mt-2 space-y-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {data[0]?.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {data[0]?.desc}
                    </p>
                    
                    {/* Start Date & Time */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Start</label>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        📅 {new Date(data[0]?.start).toLocaleDateString('en-IN')}
                        <span>•</span>
                        ⏰ {new Date(data[0]?.start).toLocaleTimeString('en-IN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>

                    {/* End Date & Time */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">End</label>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        📅 {new Date(data[0]?.end).toLocaleDateString('en-IN')}
                        <span>•</span>
                        ⏰ {new Date(data[0]?.end).toLocaleTimeString('en-IN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    
                    <button className="mt-auto w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademiCalendar;

