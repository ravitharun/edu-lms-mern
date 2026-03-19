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
  const today = new Date().toLocaleString("en-US", { weekday: "long" });

  // const fakejsonTT = [
  //   {
  //     id: 1,
  //     className: "CSE 3rd Year",
  //     section: "A",
  //     day: "Monday",
  //     slots: [
  //       { time: "9:00 - 10:00", subject: "DBMS", faculty: "Dr. Rao" },
  //       { time: "10:00 - 11:00", subject: "OS", faculty: "Mr. Kumar" },
  //       { time: "11:15 - 12:15", subject: "CN", faculty: "Ms. Priya" },
  //       { time: "1:00 - 2:00", subject: "AI", faculty: "Dr. Sharma" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     className: "CSE 3rd Year",
  //     section: "A",
  //     day: "Tuesday",
  //     slots: [
  //       { time: "9:00 - 10:00", subject: "ML", faculty: "Dr. Reddy" },
  //       { time: "10:00 - 11:00", subject: "DBMS", faculty: "Dr. Rao" },
  //       { time: "11:15 - 12:15", subject: "OS Lab", faculty: "Mr. Kumar" },
  //       { time: "1:00 - 2:00", subject: "CN", faculty: "Ms. Priya" },
  //     ],
  //   },
  // ];
  const events = [
    {
      title: "DBMS - Dr. Rao",
      // start: new Date(2026, 2, 16, 9, 0),
      start: new Date(2026, 2, 19, 18, 30),
      end: new Date(2026, 2, 19, 22, 30)
      // start: new Date(2026, 3, 19, 18, 30),
      // end: new Date(2026, 3, 19, 20, 30)
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
    const title = prompt("Enter Subject");
    console.log({
      title,
      start,
      end,
    },)
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