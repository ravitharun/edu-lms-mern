import React, { useEffect, useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { TfiExport } from "react-icons/tfi";
import App from "../../App";
import { FetchClassByTecherId, GetStudentname } from "./TechersApiCall/FectchClassApi";
import toast, { Toaster } from "react-hot-toast";
import Dataloading from "../../Loaders/Dataloading";
import NotFound from "../../Loaders/NotFound";
import Tomany from "../../Loaders/Tomany";
import { MaintanceMode } from "../../Apis/Islogin";
import Undermanitance from "../../Loaders/Undermanitance";
import AttandanceBulk from "./AttandanceBulk";
import { FaCalendarAlt, FaClock, FaBook } from "react-icons/fa";

function MarkAttendance() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [HandelAttandance, setHandelAttandance] = useState(false);
  const [Class, setClassList] = useState([])
  const [Studnets, setstudents] = useState([])
  const [loader, setloader] = useState(false)
  const [getByclass, setByclass] = useState("")
  const [handel, sethandel] = useState(false)
  const [ShowBulk, setShowBulk] = useState(false)
  const [Hidebutton, sethidesubmitbutton] = useState(false)
  useEffect(() => {
    const Fetch_Assignment = async () => {
      try {
        const reonse = await FetchClassByTecherId()
        setClassList(reonse.data.message)
        // let Classdf = reonse.data.message[0]
        // setdefault(Classdf.classId + "-" + Classdf.department + "-" + Classdf.year)

      } catch (error) {
        console.log(error.message)
      }
    }
    Fetch_Assignment()
  }, [])
  // CSE3-CSE-3



  useEffect(() => {
    const FetchStudents = async () => {
      try {
        setloader(true)
        sethandel(false)
        console.log(Class[0].classId + "-" + Class[0].department + "-" + Class[0].year, "new")
        const response = await GetStudentname(Class[0].classId + "-" + Class[0].department + "-" + Class[0].year, getByclass)
        console.log(response.status, 'response')
        if (response.status == 429) {
          sethandel(true)
          return toast.error("Too many requests")
        }
        sethandel(false)
        setstudents(response.data.message, 'response')
        setloader(false)

      } catch (error) {
        console.log(error.message, 'err')
        // toast.error(error.message)

      }
    }
    FetchStudents()
  }, [Class, getByclass])



  // Sample data for students
  const students = [
    { roll: "01", name: "Alice Johnson", ischeck: true },
    { roll: "02", name: "Bob Smith,", ischeck: false },
    { roll: "03", name: "Charlie Brown", ischeck: true },
    { roll: "04", name: "David Lee", ischeck: false },
    { roll: "05", name: "Eva Green", ischeck: true },
  ];



  // handel Attandce count
  let [Varcount, setcountvar] = useState()
  let [Absent, setAbsent] = useState()
  useEffect(() => {
    const useHandelCount = () => {
      let counttrue = students.filter((st) => st.ischeck == true)
      setcountvar(counttrue.length)
    }
    useHandelCount()
  }, [])



  // handelSubmit
  const HandelSubmit = () => {
    const data =
      console.log("handelSubmit")
  }
  const handelBulkAttendanceUpload = () => {
    if (!getByclass) {
      return toast.error("choose the Section.")
    }
    setShowBulk(true)
    sethidesubmitbutton(true)
  }
  return (
    <>
      {/* <Tomany/> */}
      <App></App>
      <Toaster></Toaster>

      {handel && <Tomany />}
      <div className="md:ml-64 p-6 min-h-screen bg-gray-100 space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Mark Attendance </h1>
          <div className="flex items-center gap-4">
            <FaBell
              className="text-xl text-gray-600 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow cursor-pointer">
              <FaUser className="text-gray-600" />
              <span className="text-gray-800 font-medium text-sm">Mr. Tharun</span>
            </div>
          </div>
        </div>

        {/* ================= SECTION DROPDOWN ================= */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow p-4">
          <label
            htmlFor="section"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Choose a Section
          </label>
          <select
            id="section"
            onChange={(e) => setByclass(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition"
          >
            <option value="" disabled selected>
              -- Select Section --
            </option>
            {Class.map((cls, idx) => (
              <option
                key={idx}
                value={`${cls.classId}-${cls.department}-${cls.year}`}
                className="text-gray-700"
              >
                {cls.classId} - {cls.department} - {cls.year}
              </option>
            ))}
          </select>
        </div>
        {/* Subject's By the Day */}
      {getByclass && (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl space-y-6">

      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Attendance Details
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
            <FaCalendarAlt /> Date
          </label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Class */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
            <FaCalendarAlt /> Class Section
          </label>
          <input
            type="text"
            value={getByclass}
            disabled
            className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Start Time */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
            <FaClock /> Start Time
          </label>
          <input
            type="time"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
            <FaClock /> End Time
          </label>
          <input
            type="time"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

      </div>

      {/* Topic */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
          <FaBook /> Topic Explained Today
        </label>
        <textarea
          rows="3"
          placeholder="Enter topic..."
          className="border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        ></textarea>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md">
          Save Details
        </button>
      </div>

    </div>
  </div>
)}
        {/* ================= ATTENDANCE TABLE ================= */}
        <div>
          <input type="checkbox" onClick={() => setHandelAttandance((prev) => !prev)} />
          <label htmlFor=""> Mark All Present</label>
        </div>


        <div className="bg-white shadow-md rounded-xl overflow-x-auto">
          <table className="w-full text-sm border-collapse">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Student Name</th>
                <th className="p-3 text-center">Present</th>
                <th className="p-3 text-center">Absent</th>
              </tr>
            </thead>

            <tbody>
              {loader ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    <Dataloading path="Student Attendance Data loading.." />
                  </td>
                </tr>
              ) : Studnets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">
                    <div className="flex justify-center items-center">
                      <NotFound message="No students data available" />
                    </div>
                  </td>
                </tr>
              ) : (
                Studnets.map((student, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{student.Student_ID}</td>
                    <td className="p-3">{student.name}</td>

                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-500"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-500"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="flex flex-wrap justify-between gap-4 p-4 text-sm text-gray-700">
            <div>Total students - {students.length}</div>
            <div>Total Present - {Varcount}</div>
            <div>Total Absent - {students.length - Varcount}</div>
          </div>
        </div>
        <button onClick={handelBulkAttendanceUpload}>Add Bulk Attendance Upload</button>
        {/* ================= ACTION BUTTON ================= */}
        {!Hidebutton && <div className="flex justify-end mt-4">
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={HandelSubmit}>
            <TfiExport />
            Submit Attendance
          </button>
        </div>
        }
        {ShowBulk &&

          <AttandanceBulk ClassID={getByclass}></AttandanceBulk>
        }
      </div>
    </>

  );
}

export default MarkAttendance;
