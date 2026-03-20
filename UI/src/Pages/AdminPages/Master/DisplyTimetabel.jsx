import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

function DisplyTimetabel({ Addfunction, role = "student", events = [], handelYear }) {
  console.log(events.length, "events from events")
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

  // ✅ Convert backend data → calendar format
  // if(events.length>=1){}
  const formattedEvents = useMemo(() => {
    return events.map((evt) => ({
      title: evt.AddSubject + " " + (evt.SemesterByyear), // required
      start: new Date(evt.StartTime),
      end: new Date(evt.EndTime),
      allDay: false,
    }));
  }, [events]);

  const handleSelectEvent = (event) => {
    console.log("Clicked Event:", event);
  };

  const handleSelectSlot = ({ start, end }) => {
    console.log(start, end);
    Addfunction(start, end);
  };

  return (
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

      {/* Calendar Container */}
      <div className="bg-white rounded-2xl shadow-lg p-4 border">

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">

            <p className="text-gray-500 mb-3">
              No events available
            </p>

            <button
              onClick={() => Addfunction()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              + Add Timetable
            </button>

          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={formattedEvents}   // ✅ always array
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            className="rounded-lg"
          />
        )}

      </div>
    </div>
  );
}

export default DisplyTimetabel;