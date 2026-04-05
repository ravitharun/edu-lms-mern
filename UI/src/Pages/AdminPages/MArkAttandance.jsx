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
import UpdateAttandance from "./UpdateAttandance";
import AdminHeader from "../../Components/AdminHeader";
import ProgressLoader from "../../Loaders/Progressloader";

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
            {true && <ProgressLoader />}

      {handel && <Tomany />}

     <div className="md:ml-64 p-6 bg-gray-100 min-h-screen space-y-6">

  {/* ================= TOGGLE ================= */}
  <div className="flex justify-center">
    <div className="flex gap-2 bg-white p-2 rounded-xl shadow">
      {["Mark", "Update"].map((item) => (
        <button
          key={item}
          onClick={() => setype(item)}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
            type === item
              ? "bg-blue-600 text-white shadow"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>

  {/* ================= MARK SECTION ================= */}
  {type === "Mark" ? (
    <div className="space-y-6">

      {/* HEADER */}
      {/* <div className="flex justify-between items-center"> */}
  <AdminHeader pathname="Attendance" ></AdminHeader>
   

      {/* DROPDOWN */}
      <div className="bg-white rounded-xl shadow p-4 max-w-md">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Choose a Section
        </label>
        <select
          onChange={(e) => setByclass(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Section --</option>
          {Class.map((cls, idx) => (
            <option
              key={idx}
              value={`${cls.classId}-${cls.department}-${cls.year}`}
            >
              {cls.classId} - {cls.department} - {cls.year}
            </option>
          ))}
        </select>
      </div>

      {/* FORM */}
      {getByclass && (
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow p-6 w-full max-w-5xl space-y-6">

            <h2 className="text-xl font-semibold text-center">
              Attendance Details
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              <input type="date" className="input" />
              <input value={getByclass} disabled className="input bg-gray-100" />
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

      {/* MARK ALL */}
      <div className="flex gap-6 bg-white p-4 rounded-lg shadow w-fit items-center">
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            onChange={() => setHandelAttandance(prev => !prev)}
          />
          <span className="text-sm font-medium">Mark All Present</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            onChange={() => setHandelAbsentAttandance(prev => !prev)}
          />
          <span className="text-sm font-medium">Mark All Absent</span>
        </label>

      </div>

      {/* TABLE */}
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
                <td colSpan="3" className="text-center py-6">
                  <Dataloading path="Loading..." />
                </td>
              </tr>
            ) : Studnets.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-10">
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
                      className={`cursor-pointer font-semibold ${
                        attendance[student.Student_ID] === "P"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {attendance[student.Student_ID] || "AB"}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="flex justify-between p-4 text-sm">
          <span>Total: {students.length}</span>
          <span className="text-green-600">Present: {Present}</span>
          <span className="text-red-500">Absent: {Absent}</span>
        </div>
      </div>

      {/* ACTION */}
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
  ) : (
    <UpdateAttandance />
  )}
</div>

    </>

  );
}

export default MarkAttendance;
