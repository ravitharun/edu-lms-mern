import React, { useEffect, useState } from "react";
import { FetchHolidays } from "./APIS/Holidays";
import ProgressLoader from "../../../Loaders/Progressloader";
import Dataloading from "../../../Loaders/Dataloading";

function FetechHoliday() {
  const [data, setdata] = useState([])
  const [length, setlength] = useState(0);
  const [page, setpage] = useState(1)
  const [Loader, setLoader] = useState(false)
  useEffect(() => {
    const getHolidays = async () => {
      try {
        setLoader(true)
        setLoader(true)
        const response = await FetchHolidays(page)
        console.log(response.data.data, "Orginal")
        console.log(response.data.data.data, "response.data")
        console.log(response?.data.data.totalPages, "totalPages")
        setdata(response.data.data.data)
        setLoader(false)
        // // // console.log(first)
        setlength(response?.data.data.totalPages)
      } catch (error) {
        console.log(error)
      }

    }
    getHolidays()
  }, [page])



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
            {Loader ? (
              <tr>
                <td colSpan="3" className="p-6 text-center">
                  <div className="flex justify-center items-center">
                    <Dataloading path="Fetching the Holiday List" />
                  </div>
                </td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr key={index} className="text-center hover:bg-gray-100">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{item?.text}</td>
                  <td className="p-3 border">{item?.start}</td>
                </tr>
              ))
            )}
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