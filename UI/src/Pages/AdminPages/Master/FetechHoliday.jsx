import React from "react";

function FetechHoliday() {
  const holidays = [
    { date: "2026-01-01", name: "New Year" },
    { date: "2026-01-14", name: "Makar Sankranti" },
    { date: "2026-03-25", name: "Ugadi" },
    { date: "2026-08-15", name: "Independence Day" },
    { date: "2026-10-02", name: "Gandhi Jayanti" }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Holiday List</h2>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 border">S.No</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Holiday Name</th>
          </tr>
        </thead>

        <tbody>
          {holidays.map((item, index) => (
            <tr key={index} className="text-center hover:bg-gray-100">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{item.date}</td>
              <td className="p-3 border">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetechHoliday;