import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { UserName } from "../../Apis/Islogin";
import { number, string } from "prop-types";

function DisplyTimetabel({ Addfunction, role, events = [], handelYear }) {

  const locales = {
    "en-US": enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,

  });
  console.log(events,'eventsevents')
  const formattedEvents = useMemo(() => {
    return events.length==0? events?.map((evt) => ({
      title: evt.AddSubject + " " + (evt.SemesterByyear), // required
      start: new Date(evt.StartTime),
      end: new Date(evt.EndTime),
      allDay: false,
    })):[];
  }, [events]);
  const handleSelectEvent = (event) => {
    console.log("Clicked Event:", event);
    if (UserName.role == "Teacher" || UserName.role == "Admin") {
      return Addfunction(event);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    console.log(start, end);
    console.log(UserName?.role)
    if (UserName.role == "Teacher" || UserName.role == "Admin") {
      return Addfunction(start, end);
    }

  };
  const now = new Date()
  console.log(now)
  const holidays = [
    { text: "Holiday 1", start: "2026-03-25", type: "Govt Holiday" },
    { text: "Holiday 1", start: "2026-03-24", type: "college Holiday" },
    { text: "Holiday 2", start: "2026-03-29", type: "college Holiday" },
    { text: "Holiday 3", start: "2026-04-01", type: "Govt Holiday" },
  ];
  const holidaysDate = holidays.map((pe) => pe.start)
  //  ['2026-03-25', '2026-03-24', '2026-03-29', '2026-04-01']
  const todayHolidays = holidaysDate.filter(
    (checkdt) => new Date(checkdt).toLocaleDateString() === now.toLocaleDateString()
  );
  const typeholiday = holidays.map((Type) => Type)
  const Filter_typeholiday = typeholiday.filter((Type) => Type)
  console.log(Filter_typeholiday, "Filter_typeholiday")


  const isToday =
    new Date(todayHolidays[0]).toDateString() === now.toDateString();


  return (
    <>


      <div className="p-4 space-y-6">

        {/* Section Header */}
        {handelYear && (
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm rounded-xl px-6 py-4 text-center border w-full max-w-md">

              <h2 className="text-lg font-semibold text-blue-700">
                {handelYear}
              </h2>

              {events.length === 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  No timetable added for this section
                </p>
              )}
            </div>
          </div>
        )}
        {/* label */}
        <div className="flex flex-col gap-2 p-4">
          {/* Sunday */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span>Sunday</span>
          </div>

          {/* Normal/Festival holidays */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span>Normal/Festival holidays</span>
          </div>

          {/* College holidays */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded"></div>
            <span>College holidays</span>
          </div>
        </div>
        {/* Calendar Container */}
        <div className="bg-white rounded-2xl shadow-lg p-4 border">

          {events.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">

              <p className="text-gray-500 mb-3">
                No {UserName.role == "Teacher" || UserName.role == "Admin" ? "events" : "Time Table"} available
              </p>

              {UserName.role == "Teacher" || UserName.role == "Admin" ? <button
                onClick={() => Addfunction()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                + Add Timetable
              </button> :
                ""
              }

            </div>
          ) : (
            <>



              <span
                className={`inline-block px-3 py-1 rounded-lg font-semibold mb-10 text-white ${new Date().getDay() === 0 ? "bg-red-500" : isToday ? "bg-red-500" : "bg-cyan-500 "
                  }`}
              >
                Today Status : {new Date().getDay() === 0 ? "Holiday" : isToday ? "Holiday" : "Working Day"}

              </span>

              <Calendar
                localizer={localizer}
                events={formattedEvents}   // ✅ always array
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}

                dayPropGetter={(date) => {
                  // console.log(holidays, "holidays")
                  const isSunday = date.getDay() === 0;
                  const formatted = format(date, "yyyy-MM-dd");
                  const holidaytypes = ["Govt Holiday", "college holiday"]
                  if (holidaysDate?.includes(formatted)) {
                    return {
                      style: {
                        backgroundColor: holidaysDate ? "green" : "yellow"
                      }
                    }
                  }


                  return {
                    style: {
                      backgroundColor: isSunday
                        ? "#f87171"
                        : date.toDateString() === new Date().toDateString()
                          ? "#ABDADC"
                          : "",
                      borderRadius: "0.5rem",
                      color: isSunday ? "white" : "black", // text color for visibility
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    title: isSunday ? "Holiday" : "", // shows tooltip on hover
                  };


                }
                }

                eventPropGetter={(event) => {
                  // console.log(holidays,"holidaysss")
                  const now = new Date();
                  const isRunning =
                    new Date(event.start) <= now && new Date(event.end) >= now;

                  return {
                    style: {
                      backgroundColor: isRunning ? "#34d399" : "#d1d5db", // green / gray
                      color: "white",
                      borderRadius: "0.5rem",
                      border: "none",
                      padding: "2px 4px",
                      transition: "transform 0.6s ease, opacity 0.6s ease",
                      transform: isRunning ? "scale(3.05)" : "scale(1)",
                      opacity: isRunning ? 0.8 : 1,
                    },
                  };
                }}
                defaultView={UserName?.role == "students" ? Views.AGENDA : Views.MONTH}

              />
            </>

          )}

        </div>
      </div>
    </>

  );
}

export default DisplyTimetabel;