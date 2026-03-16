// import React, { useEffect, useState } from "react";
// import Calendar from "color-calendar";
// import "../../../src/App.css"  

// import {
//   FaCalendarAlt,
//   FaBook,
//   FaChalkboardTeacher
// } from "react-icons/fa";
// import { MdAssignment, MdClear, MdEvent } from "react-icons/md";
// import { GiPartyPopper } from "react-icons/gi";
// import { UserName } from "../../Apis/Islogin";

// function Calendars({ examData, role, onAddEvent, userData = UserName }) {
//   const [ShowExamData, setexamData] = useState({});
//   const [data, setData] = useState([]);
//   const [getEventtype, setEventtype] = useState("");
//   const [Displaydate, setdate] = useState(null);

//   // Updated events data with correct types
//   const events = [
//     {
//       start: "2026-09-15T09:00:00",
//       end: "2026-09-15T17:00:00",
//       name: "Blockchain Workshop",
//       color: "#22c55e",
//       desc: "Introduction to Blockchain Technology",
//       type: "Workshop"
//     },
//     {
//       start: "2026-09-20T10:00:00",
//       end: "2026-09-20T14:00:00",
//       name: "Mid Semester Exam",
//       color: "#ef4444",
//       desc: "CSE Mid Semester Examination",
//       type: "Exam"
//     },
//     {
//       start: "2026-09-25T23:59:00",
//       end: "2026-09-25T23:59:59",
//       name: "Assignment Deadline",
//       color: "#3b82f6",
//       desc: "Submit React LMS Assignment",
//       type: "Assignment"
//     },
//     {
//       start: "2026-09-28T00:00:00",
//       end: "2026-09-28T23:59:59",
//       name: "College Holiday",
//       color: "#f59e0b",
//       desc: "Festival Holiday",
//       type: "Holiday"
//     }
//   ];

//   // Detect event type from color
//   const getEventType = (color) => {
//     if (color?.includes("#ef")) return "Exam";
//     if (color?.includes("#3b")) return "Assignment";
//     if (color?.includes("#22")) return "Workshop";
//     if (color?.includes("#f5")) return "Holiday";
//     return "Other";
//   };

//   // Initialize calendar
//   useEffect(() => {
//     const calendar = new Calendar({
//       id: "#color-calendar",
//       calendarSize: "small",

//       theme: "basic",
//       eventBulletMode: "multiple",
//       eventsData: events,
//       onSelectedDateChange: (date, events) => {
//         console.log(events, 'events');
//         setdate(date);
//         if (events.length === 0) {
//           setData([]);
//           return;
//         }
//         setData(events);
//       }
//     });
//     return () => {
//       // Cleanup if needed
//     };
//   }, []); // Empty deps - only init once

//   // Filter events by type
//   useEffect(() => {
//     if (getEventtype === "" || getEventtype === "all") {
//       setData([]);
//       return;
//     }
//     const filteredEvents = events.filter((evt) => evt.type === getEventtype);
//     setData(filteredEvents);
//   }, [getEventtype]);

//   // Handle examData prop changes
//   useEffect(() => {
//     if (examData) {
//       setexamData(examData);
//     }
//   }, [examData]);

//   const datatype = ["Exam", "Workshop", "Holiday", "Assignment"];

//   return (
//     <>
//       {examData && <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">Exam data present</div>}

//       <div className="w-full p-6 bg-gray-50">
//         <div className="bg-white rounded-2xl shadow-lg border p-6 max-w-7xl mx-auto">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
//             {role !== "teacher" && (
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-blue-500 rounded-xl">
//                   <FaCalendarAlt className="text-white text-lg" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">Academic Calendar</h2>
//                   <p className="text-sm text-gray-500">Stay organized with upcoming events</p>
//                 </div>
//               </div>
//             )}

//             {(userData?.role === "admin" || userData?.role === "teacher") && onAddEvent && (
//               <button
//                 onClick={onAddEvent}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-colors"
//               >
//                 Add Event
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
//             {/* Event Types Filter */}
//             <div className="bg-gray-50 rounded-xl p-5 border">
//               <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
//                 <MdEvent className="text-blue-500" />
//                 Event Types
//               </h3>

//               <div className="space-y-3 text-sm">
//                 <div 
//                   onClick={() => setEventtype("Exam")}
//                   className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
//                     getEventtype === "Exam" ? "bg-red-50 border border-red-200" : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <FaBook className="text-red-500" />
//                   <span>Exams</span>
//                 </div>

//                 <div 
//                   onClick={() => setEventtype("Workshop")}
//                   className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
//                     getEventtype === "Workshop" ? "bg-green-50 border border-green-200" : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <FaChalkboardTeacher className="text-green-500" />
//                   <span>Workshops</span>
//                 </div>

//                 <div 
//                   onClick={() => setEventtype("Holiday")}
//                   className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
//                     getEventtype === "Holiday" ? "bg-yellow-50 border border-yellow-200" : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <GiPartyPopper className="text-yellow-500" />
//                   <span>Holidays</span>
//                 </div>

//                 <div 
//                   onClick={() => setEventtype("Assignment")}
//                   className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
//                     getEventtype === "Assignment" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <MdAssignment className="text-blue-500" />
//                   <span>Assignments</span>
//                 </div>

//                 {getEventtype && (
//                   <div 
//                     onClick={() => setEventtype("")}
//                     className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200 bg-gray-50"
//                   >
//                     <MdClear className="text-red-500" />
//                     <span>Clear Filter</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Calendar + Events */}
//             <div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
              
//               {/* Calendar */}
//               <div className="flex-1 bg-white border rounded-xl p-4">
//                 <div id="color-calendar" className="w-full h-[420px]"></div>
//               </div>

//               {/* Events List */}
//               <div className="lg:w-80 bg-gray-50 border rounded-xl p-4">
//                 {data.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-[350px] text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
//                     <div className="bg-blue-50 p-6 rounded-2xl mb-6 shadow-sm">
//                       <FaCalendarAlt className="text-blue-500 text-4xl mx-auto" />
//                     </div>
                    
//                     <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                       {datatype.includes(getEventtype) 
//                         ? `No ${getEventtype}s on this date` 
//                         : "No events scheduled"
//                       }
//                     </h3>
                    
//                     <p className="text-sm text-gray-500 mb-3">On Selected Date</p>
                    
//                     <div className="text-lg font-semibold text-gray-800 bg-blue-50 px-4 py-2 rounded-xl shadow-sm mb-4">
//                       {Displaydate ? new Date(Displaydate).toDateString() : "Click a date"}
//                     </div>

//                     {(userData?.role === "admin" || userData?.role === "teacher") && (
//                       <p className="text-sm text-gray-500 max-w-xs">
//                         Click <span className="font-semibold text-blue-600">Add Event</span> button or 
//                         select a date to manage events.
//                       </p>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
//                     {data.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
//                       >
//                         {/* Event Tags */}
//                         <div className="flex flex-wrap gap-2 mb-3">
//                           <span
//                             className="text-xs text-white px-3 py-1 rounded-full font-semibold shadow-sm"
//                             style={{ backgroundColor: item.color }}
//                           >
//                             {getEventType(item.color)}
//                           </span>
//                           <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
//                             Event
//                           </span>
//                         </div>

//                         {/* Event Title */}
//                         <h4 className="font-bold text-gray-900 text-base mb-2 leading-tight">
//                           {item.name}
//                         </h4>

//                         {/* Description */}
//                         <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
//                           {item.desc}
//                         </p>

//                         {/* Time Range */}
//                         <div className="space-y-1 mb-4">
//                           <div className="flex items-center gap-2 text-xs text-gray-600">
//                             <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//                             <span>Start:</span>
//                             <span className="font-medium">
//                               {new Date(item.start).toLocaleDateString("en-IN")}
//                             </span>
//                             <span>•</span>
//                             <span className="font-mono text-xs">
//                               {new Date(item.start).toLocaleTimeString("en-IN", {
//                                 hour: "2-digit",
//                                 minute: "2-digit"
//                               })}
//                             </span>
//                           </div>
                          
//                           <div className="flex items-center gap-2 text-xs text-gray-600">
//                             <span className="w-2 h-2 bg-red-400 rounded-full"></span>
//                             <span>End:</span>
//                             <span className="font-medium">
//                               {new Date(item.end).toLocaleDateString("en-IN")}
//                             </span>
//                             <span>•</span>
//                             <span className="font-mono text-xs">
//                               {new Date(item.end).toLocaleTimeString("en-IN", {
//                                 hour: "2-digit",
//                                 minute: "2-digit"
//                               })}
//                             </span>
//                           </div>
//                         </div>

//                         <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200">
//                           View Details →
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Calendars;
import React, { useEffect, useState, useRef, useCallback } from "react";
import Calendar from "color-calendar";
import "../../../src/App.css"

import {
  FaCalendarAlt,
  FaBook,
  FaChalkboardTeacher
} from "react-icons/fa";
import { MdAssignment, MdClear, MdEvent } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";
import { UserName } from "../../Apis/Islogin";

function Calendars({ examData, role, onAddEvent, userData = UserName }) {
  const [data, setData] = useState([]);
  const [getEventtype, setEventtype] = useState("");
  const [Displaydate, setdate] = useState(null);
  const calendarRef = useRef(null);
  const containerRef = useRef(null);

  const events = [
    {
      start: "2026-09-15T09:00:00",
      end: "2026-09-15T17:00:00",
      name: "Blockchain Workshop",
      color: "#22c55e",
      desc: "Introduction to Blockchain Technology",
      type: "Workshop"
    },
    {
      start: "2026-09-20T10:00:00",
      end: "2026-09-20T14:00:00",
      name: "Mid Semester Exam",
      color: "#ef4444",
      desc: "CSE Mid Semester Examination",
      type: "Exam"
    },
    {
      start: "2026-09-25T23:59:00",
      end: "2026-09-25T23:59:59",
      name: "Assignment Deadline",
      color: "#3b82f6",
      desc: "Submit React LMS Assignment",
      type: "Assignment"
    },
    {
      start: "2026-09-28T00:00:00",
      end: "2026-09-28T23:59:59",
      name: "College Holiday",
      color: "#f59e0b",
      desc: "Festival Holiday",
      type: "Holiday"
    }
  ];

  const getEventType = (color) => {
    if (color?.includes("#ef")) return "Exam";
    if (color?.includes("#3b")) return "Assignment";
    if (color?.includes("#22")) return "Workshop";
    if (color?.includes("#f5")) return "Holiday";
    return "Other";
  };

  // Simple CSS fix for calendar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #color-calendar * { box-sizing: border-box !important; }
      #color-calendar { font-family: inherit !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleDateChange = useCallback((date, selectedEvents) => {
    setdate(date);
    if (getEventtype) {
      const filtered = events.filter(evt => 
        evt.type === getEventtype && 
        new Date(evt.start).toDateString() === new Date(date).toDateString()
      );
      setData(filtered);
    } else {
      setData(selectedEvents || []);
    }
  }, [getEventtype, events]);

  useEffect(() => {
    if (calendarRef.current || !containerRef.current) return;

    const calendar = new Calendar({
      id: containerRef.current.id,
      calendarSize: "large",
      theme: "basic",
      eventBulletMode: "multiple",
      eventsData: events,
      onSelectedDateChange: handleDateChange
    });
    
    calendarRef.current = calendar;
  }, []);

  useEffect(() => {
    if (!getEventtype) {
      setData([]);
      return;
    }
    const filtered = events.filter(evt => evt.type === getEventtype);
    setData(filtered);
  }, [getEventtype]);

  const clearFilter = () => {
    setEventtype("");
    setData([]);
    setdate(null);
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      {examData && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          Exam data loaded: {Object.keys(examData).length} items
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          {role !== "teacher" && (
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-xl">
                <FaCalendarAlt className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Academic Calendar</h2>
                <p className="text-sm text-gray-500">Stay organized with upcoming events</p>
              </div>
            </div>
          )}

          {(userData?.role === "admin" || userData?.role === "teacher") && onAddEvent && (
            <button
              onClick={onAddEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-colors"
            >
              Add Event
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Event Filters */}
          <div className="bg-gray-50 rounded-xl p-5 border">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <MdEvent className="text-blue-500" />
              Event Types
            </h3>

            <div className="space-y-3 text-sm">
              <div 
                onClick={() => setEventtype("Exam")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${
                  getEventtype === "Exam" ? "bg-red-50 border-red-200" : "border-transparent"
                }`}
              >
                <FaBook className="text-red-500" />
                <span>Exams</span>
              </div>

              <div 
                onClick={() => setEventtype("Workshop")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${
                  getEventtype === "Workshop" ? "bg-green-50 border-green-200" : "border-transparent"
                }`}
              >
                <FaChalkboardTeacher className="text-green-500" />
                <span>Workshops</span>
              </div>

              <div 
                onClick={() => setEventtype("Holiday")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${
                  getEventtype === "Holiday" ? "bg-yellow-50 border-yellow-200" : "border-transparent"
                }`}
              >
                <GiPartyPopper className="text-yellow-500" />
                <span>Holidays</span>
              </div>

              <div 
                onClick={() => setEventtype("Assignment")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${
                  getEventtype === "Assignment" ? "bg-blue-50 border-blue-200" : "border-transparent"
                }`}
              >
                <MdAssignment className="text-blue-500" />
                <span>Assignments</span>
              </div>

              {getEventtype && (
                <div 
                  onClick={clearFilter}
                  className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border border-red-200 bg-red-50"
                >
                  <MdClear className="text-red-500" />
                  <span>Clear Filter</span>
                </div>
              )}
            </div>
          </div>

          {/* Calendar + Events */}
          <div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
            {/* Calendar */}
            <div className="flex-1 bg-white border rounded-xl p-4">
              <div ref={containerRef} id="color-calendar" className="w-full h-[420px]"></div>
            </div>

            {/* Events Panel */}
            <div className="lg:w-80 bg-gray-50 border rounded-xl p-4">
              {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[350px] text-center bg-gray-50 rounded-xl border border-gray-200 p-8">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <FaCalendarAlt className="text-blue-500 text-3xl" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {getEventtype ? `No ${getEventtype}s found` : "No events selected"}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-4">Click a date on calendar</p>
                  
                  <div className="bg-white px-4 py-2 rounded-md border shadow-sm">
                    <div className="font-medium text-gray-800">
                      {Displaydate ? new Date(Displaydate).toDateString() : "Select a date"}
                    </div>
                  </div>

                  {(userData?.role === "admin" || userData?.role === "teacher") && (
                    <p className="text-sm text-gray-500 mt-4">
                      Click <span className="font-medium text-blue-600">Add Event</span> to create events
                    </p>
                  )}
                </div>
              ) : (
                <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">
                  <h4 className="font-semibold text-lg text-gray-800 mb-4 border-b pb-2">
                    {getEventtype ? `${getEventtype}s (${data.length})` : `Events (${data.length})`}
                  </h4>
                  
                  {data.map((item, idx) => (
                    <div key={idx} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex gap-2 mb-2">
                        <span
                          className="text-xs text-white px-2 py-1 rounded-full font-bold"
                          style={{ backgroundColor: item.color }}
                        >
                          {getEventType(item.color)}
                        </span>
                        <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">Event</span>
                      </div>
                      
                      <h5 className="font-semibold text-gray-800 mb-1">{item.name}</h5>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.desc}</p>
                      
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span className="font-medium">{new Date(item.start).toLocaleDateString("en-IN")}</span>
                          <span>{new Date(item.start).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                          <span className="font-medium">{new Date(item.end).toLocaleDateString("en-IN")}</span>
                          <span>{new Date(item.end).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>
                      
                      <button className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-2 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendars;
