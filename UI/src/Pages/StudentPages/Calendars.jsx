
import React, { useEffect, useState } from "react";
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

function Calendars({examData}) {

  const [data, setData] = useState([]);
  const [getEvent, setEventtype] = useState("")
  const [eventForm, seteventForm] = useState(false)
  const [Displaydate, setdate] = useState()
  const events = [
    {
      start: "2026-09-15T09:00:00",
      end: "2026-09-15T17:00:00",
      name: "Blockchain Workshop",
      color: "#22c55e",
      desc: "Introduction to Blockchain Technology",
      type: "Exam"
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
      type: "Exam"
    },
    {
      start: "2026-09-28T00:00:00",
      end: "2026-09-28T23:59:59",
      name: "College Holiday",
      color: "#f59e0b",
      desc: "Festival Holiday",
      type: "Exam"
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
        console.log(events, 'events')
        if (events.length == 0) {
          console.log("No eevents")

          setdate(date)
          setData(events);
          return setEventtype([])

        }
        setData(events);

      }
    });
  }, []);


  useEffect(() => {
    const filterbyEvent = () => {
      const filterbyeventsType = events.filter((evt) => evt.type == getEvent)
      setData(filterbyeventsType)
      console.log(filterbyeventsType, ":", `based on the ${getEvent}`)
      console.log(getEvent, 'getEvents')
      if (getEvent === "all") {
        setData([])
        return setEventtype("")
      }
    }
    filterbyEvent()
  }, [getEvent])

  console.log(data, "data")
  const datatype = ["Exam", "Holiday", "Workshop"]
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg border p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <FaCalendarAlt className="text-white text-lg" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">Academic Calendar </h2>
              <p className="text-sm text-gray-500">Stay organized with upcoming events</p>
            </div>
          </div>

          {(UserName.role === "admin" || UserName.role === "teacher") && (
            <button
              onClick={() => seteventForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium"
            >
              {eventForm ? "Close" : "Add Event"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Event Types */}
          <div className="bg-gray-50 rounded-xl p-5 border">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <MdEvent /> Event Types
            </h3>

            <div className="space-y-3 text-sm">

              <div onClick={() => setEventtype("Exam")}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <FaBook className="text-red-500" />
                <span>Exams</span>
              </div>

              <div onClick={() => setEventtype("Workshop")}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <FaChalkboardTeacher className="text-green-500" />
                <span>Workshops</span>
              </div>

              <div onClick={() => setEventtype("Holiday")}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <GiPartyPopper className="text-yellow-500" />
                <span>Holidays</span>
              </div>

              <div onClick={() => setEventtype("Other")}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <MdAssignment className="text-blue-500" />
                <span>Other</span>
              </div>

              {getEvent && (
                <div onClick={() => setEventtype("all")}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
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
              <div id="color-calendar" className="w-full h-[420px]"></div>
            </div>
            {/* Event Cards */}
            <div className="lg:w-80 bg-gray-50 border rounded-xl p-4">

              {data.length === 0 ? (

                <div className="flex flex-col items-center justify-center h-[350px] text-center bg-gray-50 rounded-xl border border-gray-200">

                  {/* Icon */}
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <FaCalendarAlt className="text-blue-500 text-3xl" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-700">
                    {datatype.includes(getEvent) ? `No ${getEvent} Selected` : "No Schedule Available"}
                  </h3>

                  {/* Selected Date */}
                  <p className="text-sm text-gray-500 mt-1">
                    On Selected Date
                  </p>
                  <span className="text-md font-medium text-gray-800 bg-white px-3 py-1 rounded-md shadow-sm mt-1">
                    {new Date(Displaydate).toDateString()}
                  </span>

                  {/* Helper Text */}
                  {(UserName.Role === "Admin" || UserName.Role === "Teacher") && (
                    <p className="text-sm text-gray-500 mt-3">
                      Click a date on the calendar to view or manage <b>events</b>.
                    </p>
                  )}

                </div>

              ) : (

                <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">

                  {data.map((item, idx) => (

                    <div
                      key={idx}
                      className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >

                      {/* Tags */}
                      <div className="flex gap-2 mb-2">
                        <span
                          className="text-[10px] text-white px-2 py-1 rounded-full font-bold"
                          style={{ backgroundColor: item.color }}
                        >
                          {getEventType(item.color)}
                        </span>

                        <span className="text-[10px] bg-gray-600 text-white px-2 py-1 rounded-full">
                          Event
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {item.desc}
                      </p>

                      {/* Start */}
                      <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {new Date(item.start).toLocaleDateString("en-IN")}
                        •
                        {new Date(item.start).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>

                      {/* End */}
                      <div className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        {new Date(item.end).toLocaleDateString("en-IN")}
                        •
                        {new Date(item.end).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>

                      <button className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-1.5 rounded-lg">
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

