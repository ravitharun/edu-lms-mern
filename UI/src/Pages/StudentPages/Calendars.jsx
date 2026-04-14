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
import { useEffectEvent } from "react";
import { Getdata } from "./GetdataAcademic";
import { FiMoreHorizontal } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function Calendars({ examData, role, onAddEvent, userData = UserName }) {
  const [data, setData] = useState([]);
  const [validdata, validData] = useState([]);
  const [getEventtype, setEventtype] = useState("");
  const [Displaydate, setdate] = useState(null);
  const calendarRef = useRef(null);
  const containerRef = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
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

  // get all events
  useEffect(() => {
    const FetchtheSchedukeData = async () => {
      try {
        const response = await Getdata()
        setData(response.data.message)
        validData(response.data.message)
      } catch (error) {
        console.log(error, "Error")


      }
    }
    FetchtheSchedukeData()
  }, [])



  useEffect(() => {
    if (calendarRef.current || !containerRef.current) return;

    const calendar = new Calendar({
      id: containerRef.current.id,
      calendarSize: "large",
      theme: "basic",
      eventBulletMode: "multiple",
      eventsData: data,
      onSelectedDateChange: (date, validdata) => {
        const filterbydata = data.filter((evnt) => new Date(evnt.EventstartDate).toISOString().slice(0, 10) == new Date(date).toISOString().slice(0, 10))
      
      }
    });

    calendarRef.current = calendar;
  }, []);

  // filter
  useEffect(() => {
    if (!getEventtype) {
      setFilteredData(data); // show all
      return;
    }

    const filtered = data.filter(
      (evt) => evt.Eventtype === getEventtype
    );


    setFilteredData(filtered);
    setData(filtered)
  }, [getEventtype]);

  const clearFilter = () => {
    setEventtype("");
    setData([]);
    setdate(null);
  };
  const handelEditEvent = (id) => {
    toast.success(`handelEditEvent ${id}`)
  }
  const handeldeleteEvent = (id) => {
    toast.error(`handeldeleteEvent ${id}`)
  }
  return (
    <div className="w-full p-6 bg-gray-50">
      {examData && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          Exam data loaded: {Object.keys(examData).length} items
        </div>
      )}
      <Toaster />
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

          {(userData?.role === "Admin" || userData?.role === "Teacher") && onAddEvent && (
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
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${getEventtype === "Exam" ? "bg-red-50 border-red-200" : "border-transparent"
                  }`}
              >
                <FaBook className="text-red-500" />
                <span>Exams</span>
              </div>

              <div
                onClick={() => setEventtype("Workshop")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${getEventtype === "Workshop" ? "bg-green-50 border-green-200" : "border-transparent"
                  }`}
              >
                <FaChalkboardTeacher className="text-green-500" />
                <span>Workshops</span>
              </div>

              <div
                onClick={() => setEventtype("Holiday")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${getEventtype === "Holiday" ? "bg-yellow-50 border-yellow-200" : "border-transparent"
                  }`}
              >
                <GiPartyPopper className="text-yellow-500" />
                <span>Holidays</span>
              </div>

              <div
                onClick={() => setEventtype("Assignment")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${getEventtype === "Assignment" ? "bg-blue-50 border-blue-200" : "border-transparent"
                  }`}
              >
                <MdAssignment className="text-blue-500" />
                <span>Assignments</span>
              </div>
              <div
                onClick={() => setEventtype("Other")}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${getEventtype === "Other" ? "bg-blue-50 border-blue-200" : "border-transparent"
                  }`}
              >
                <FiMoreHorizontal className="text-red-500" />
                <span>Other</span>
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

                  {(userData?.role === "Admin" || userData?.role === "Teacher") && (
                    <p className="text-sm text-gray-500 mt-4">
                      Click <span className="font-medium text-blue-600">Add Event</span> to create events
                    </p>
                  )}
                </div>
              ) : (
                <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">
                  <h4 className="font-semibold text-lg text-gray-800 mb-4 border-b pb-2">
                    {getEventtype ? `Events (${data.length})` : "Events"}
                  </h4>

                  {data=={}?"No data":data.map((item, idx) => (
                    <div key={idx} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex gap-2 mb-2">
                        <span
                          className={`text-xs  px-2 py-1 rounded-full font-bold ${item.Eventtype == "Exam" ? "bg-red-500 text-white" : item.Eventtype == "Workshops" ? "bg-blue-500 text-white" : item.Eventtype == "Holidays" ? "bg-green-500 text-black" : item.Eventtype == "Assignments" ? "bg-gray-500 text-white" : "bg-amber-500 text-black "}`}
                        // style={{ backgroundColor: item?.color||'Background:"red' }}
                        >
                          {item.Eventtype}
                        </span>
                      </div>

                      <h5 className="font-semibold text-gray-800 mb-1">{item.EventName}</h5>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.Descprition}</p>

                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span className="font-medium">{new Date(item.EventstartDate).toLocaleDateString("en-IN")}</span>
                          <span>{new Date(item.EventstartDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                          <span className="font-medium">{new Date(item.EventendDate).toLocaleDateString("en-IN")}</span>
                          <span>{new Date(item.EventendDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>
                      {(userData?.role === "Admin" || userData?.role === "Teacher") && (
                        <div className="flex gap-3 m-5">
                          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition"
                            onClick={() => handelEditEvent(item._id)}
                          >
                            Edit
                          </button>

                          <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition" onClick={() => handeldeleteEvent(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
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
