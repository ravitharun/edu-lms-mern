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
  const [AbsentAttandance, setHandelAbsentAttandance] = useState(false);
  const [Class, setClassList] = useState([])
  const [Studnets, setstudents] = useState([])
  const [loader, setloader] = useState(false)
  const [getByclass, setByclass] = useState("")
  const [handel, sethandel] = useState(false)
  const [ShowBulk, setShowBulk] = useState(false)
  const [Hidebutton, sethidesubmitbutton] = useState(false)
  const [studentidx, setid] = useState(0)
  const [toggleStatus, settoggleStatus] = useState(false)
  console.log("HandelAttandance : ", HandelAttandance)
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
  const [students, setstudentsAttandance] = useState([{
    id: "",
    name: "",
    Status: ""

  }]);
  const newstudents = [{
    name: "tharun",
    Student_ID: "1"
  }, {
    name: "tharun",
    Student_ID: "2"
  }, {
    name: "tharun",
    Student_ID: "3"
  }, {
    name: "tharun",
    Student_ID: "4"
  }
  ]
  // handel Attandce count
  let [Present, setcountvar] = useState(0)
  let [Absent, setAbsent] = useState(0)
  let [AttendanceList, setAttendanceList] = useState([])
  // MARK-ATTANDANCE
  // const markAttandance = (studentID, studentName, isPresent) => {

  //   if (isPresent) {
  //     setcountvar(prev => prev + 1)
  //   } else {
  //     setAbsent(prev => prev - 1)
  //   }

  //   setAttendanceList(prev => [
  //     ...prev,
  //     { studentID, studentName, isPresent }
  //   ])
  // }

  useEffect(() => {
    const useHandelCount = () => {
      let counttrue = students.filter((st) => st.ischeck == true)
      setcountvar(counttrue.length)
    }
    useHandelCount()
  }, [])
  const [attendance, setAttendance] = useState([])
  const [type, setype] = useState('Mark')
  const handleToggle = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === "P" ? "AB" : "P",
    }));
  };
  console.log(typeof(attendance), 'attendance')
  useEffect(() => {
    // const filterbyPresent = attendance.filter((present) => console.log(present[id]))
    // console.log(filterbyPresent,'filterbyPresent')

  }, [attendance])


  // handelSubmit final
  const HandelSubmit = () => {
    const data =
      console.log("handelSubmit")
  }

  // bulk Upload
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
      <div className="md:ml-64 p-6 bg-gray-100 min-h-screen space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Mark Attendance</h1>

          <div className="flex items-center gap-4">
            <FaBell
              className="text-xl text-gray-600 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow">
              <FaUser className="text-gray-600" />
              <span className="text-gray-800 text-sm font-medium">Mr. Tharun</span>
            </div>
          </div>
        </div>

        {/* ================= SECTION + TABS ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Dropdown */}
          <div className="w-full md:w-80 bg-white rounded-xl shadow p-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Choose a Section
            </label>
            <select
              onChange={(e) => setByclass(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Section --</option>
              {Class.map((cls, idx) => (
                <option key={idx} value={`${cls.classId}-${cls.department}-${cls.year}`}>
                  {cls.classId} - {cls.department} - {cls.year}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="flex gap-3 bg-white p-2 rounded-xl shadow">

              {["Mark", "Update"].map((item) => (
                <button
                  key={item}
                  onClick={() => setype(item)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition ${type === item
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {item}
                </button>
              ))}

            </div>
          </div>
        </div>

        {/* ================= ATTENDANCE FORM ================= */}
        {getByclass && (
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow p-6 w-full max-w-5xl space-y-6">

              <h2 className="text-xl font-semibold text-center text-gray-800">
                Attendance Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <input type="date" className="input" />

                <input
                  type="text"
                  value={getByclass}
                  disabled
                  className="input bg-gray-100"
                />

                <input type="time" className="input" />
                <input type="time" className="input" />
              </div>

              <textarea
                placeholder="Enter topic..."
                className="input resize-none"
              />

            </div>
          </div>
        )}

        {/* ================= MARK ALL ================= */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow w-fit">
          <input
            type="checkbox"
            onChange={() => {
              setHandelAttandance(prev => !prev)


              setcountvar(students.length)

            }}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">
            Mark All Present
          </span>

          <input
            type="checkbox"
            onChange={() => {
              setHandelAbsentAttandance(prev => !prev)
              setAbsent(HandelAttandance ? students.length : 10)

            }}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">
            Mark All Absent
          </span>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Student Name</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {loader ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    <Dataloading path="Loading..." />
                  </td>
                </tr>
              ) : Studnets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">
                    <NotFound message="No students data available" />
                  </td>
                </tr>
              ) : (
                newstudents.map((student, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{student.Student_ID}</td>
                    <td className="p-3">{student.name}</td>
                    <td className="text-center">
                      <div
                        onClick={() => handleToggle(student.Student_ID)}
                        className="cursor-pointer"
                      >
                        {attendance[student.Student_ID] || "AB"}
                      </div>
                    </td>

                    {/* <td className="text-center">
                        <input
                          type="checkbox"
                          checked={AbsentAttandance}
                          onChange={() =>
                            markAttandance(student.Student_ID, student.name, false)
                          }
                        />
                      </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="flex justify-between p-4 text-sm">
            <span>Total: {students.length}</span>
            <span className="text-green-600">Present: {Present}</span>
            <span className="text-red-500">Absent: {Absent}</span>
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div className="flex justify-between items-center">

          <button
            onClick={handelBulkAttendanceUpload}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Bulk Upload
          </button>

          {!Hidebutton && (
            <button
              onClick={HandelSubmit}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <TfiExport />
              Submit
            </button>
          )}
        </div>

        {ShowBulk && <AttandanceBulk ClassID={getByclass} />}

      </div>
    </>

  );
}

export default MarkAttendance;
