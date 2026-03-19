import React from "react";

function DisplyTimetabel({ Addfunction, isclose }) {
  const fakejsonTT = [
    {
      id: 1,
      className: "CSE 3rd Year",
      section: "A",
      day: "Monday",
      slots: [
        { time: "9:00 - 10:00", subject: "DBMS", faculty: "Dr. Rao" },
        { time: "10:00 - 11:00", subject: "OS", faculty: "Mr. Kumar" },
        { time: "11:15 - 12:15", subject: "CN", faculty: "Ms. Priya" },
        { time: "1:00 - 2:00", subject: "AI", faculty: "Dr. Sharma" },
      ],
    },
    {
      id: 2,
      className: "CSE 3rd Year",
      section: "A",
      day: "Tuesday",
      slots: [
        { time: "9:00 - 10:00", subject: "ML", faculty: "Dr. Reddy" },
        { time: "10:00 - 11:00", subject: "DBMS", faculty: "Dr. Rao" },
        { time: "11:15 - 12:15", subject: "OS Lab", faculty: "Mr. Kumar" },
        { time: "1:00 - 2:00", subject: "CN", faculty: "Ms. Priya" },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Admin Timetable</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700" onClick={Addfunction}>
          {isclose ? "Close" : " Add"} Timetable
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {fakejsonTT.map((dayData) => (
          <div
            key={dayData.id}
            className="bg-white rounded-2xl shadow-md p-5 border"
          >
            {/* Top */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">{dayData.day}</h2>
                <p className="text-sm text-gray-500">
                  {dayData.className} - {dayData.section}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-yellow-400 rounded-md hover:bg-yellow-500">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>

            {/* Slots */}
            <div className="space-y-3">
              {dayData.slots.map((slot, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{slot.subject}</p>
                    <p className="text-sm text-gray-500">{slot.faculty}</p>
                  </div>
                  <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplyTimetabel;