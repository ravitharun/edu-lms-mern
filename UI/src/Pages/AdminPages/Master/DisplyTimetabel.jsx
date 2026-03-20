import React from "react";
import { FaClock, FaPlus } from "react-icons/fa";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

function DisplyTimetabel({ Addfunction, isclose, role = "student" }) {



  const events = [
    {
      title: "New Check - Dr. Rao",

      start: new Date("2026-03-19T22:51"),
      end: new Date("2026-03-19T23:51")

    },
    {
      title: "New Check - Dr. Rao",

      start: new Date("2026-03-19T12:51"),
      end: new Date("2026-03-19T13:51")

    },
    {
      title: "OS - Dr. Rao",

      start: new Date(2026, 2, 21, 18, 30),
      end: new Date(2026, 2, 21, 22, 30)

    },
    {
      title: "DBMS - Dr. Rao",
      start: new Date(2026, 4, 19, 13, 30),
      end: new Date(2026, 4, 19, 14, 30)

    },

  ];
  const locales = {
    'en-US': enUS,
  }
  console.log(locales, "locales")
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
  console.log(localizer, "localizer")
  const handleSelectEvent = () => {
    console.log("handleSelectEvent")
  }
  const handleSelectSlot = () => {
    console.log("shandleSelectSlot")
  }
  const handleSelect = ({ start, end }) => {

    return Addfunction(start, end)
  };
  return (
    <>

      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          // onSelectSlot={() => Addfunction(start, end)}
          onSelectSlot={handleSelect}
          selectable
        />
      </div>
    </>
  );
}

export default DisplyTimetabel;