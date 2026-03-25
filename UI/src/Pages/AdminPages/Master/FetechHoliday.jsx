import React, { useEffect, useState } from "react";
import { FetchHolidays } from "./APIS/Holidays";

function FetechHoliday() {
  const [data, setdata] = useState([])
  const [length, setlength] = useState(0);
  const [page, setpage] = useState(1)
  useEffect(() => {
    const getHolidays = async () => {
      try {

        const response = await FetchHolidays(page)
        console.log(response, "response.data")
        setdata(response.data.data)
        setlength(response.data.totalPages)
      } catch (error) {
        console.log(error)
      }

    }
    getHolidays()
  }, [page])

  const holidays = [
    { date: "2026-01-01", name: "New Year" },
    { date: "2026-01-14", name: "Makar Sankranti" },
    { date: "2026-03-25", name: "Ugadi" },
    { date: "2026-08-15", name: "Independence Day" },
    { date: "2026-10-02", name: "Gandhi Jayanti" }
  ];

  return (
    <>

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
            {data?.map((item, index) => (
              <tr key={index} className="text-center hover:bg-gray-100">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{item.text}</td>
                <td className="p-3 border">{item.start}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        {[...Array(length)].map((_, i) => (
          <button
            key={i}
            onClick={() => setpage(i + 1)}
            className={`px-3 py-1 rounded-md border 
        ${page === i + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default FetechHoliday;