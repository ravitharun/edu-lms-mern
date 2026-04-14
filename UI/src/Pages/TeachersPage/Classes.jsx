import React, { useEffect, useState } from "react";
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaClipboardCheck, FaClock, FaPlus, FaTimes, FaUpload, FaUsers, FaChartBar, FaFileUpload, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import App from "../../App";
import MasterAdmin from "../Admin/MasterAdmin";
import toast from "react-hot-toast";
import { GetClassList } from "./TechersApiCall/FetchApicall";
import secureLocalStorage from "react-secure-storage";
import Tablecomponets from "../../Components/Tablecomponets";
import AdminHeader from "../../Components/AdminHeader";
import Tomany from "../../Loaders/Tomany";
import { MaintanceMode, UserName } from "../../Apis/Islogin";
import Undermanitance from "../../Loaders/Undermanitance";
import { socket } from "../../Socket";

function Classes() {
  const [Action, SetActon] = useState("");
  const [handelAction, SethandelActon] = useState(false);
  const [assignedClasses, setAssignedClasses] = useState([])
  const [request, setrequest] = useState(false)
  // console.log(assignedClasses)
  const [info, setinof] = useState({
    classId: "",
    year: "",
    department: ""
  })
 

  useEffect(() => {
    const Fetch_Class = async () => {
      try {
        const response_class = await GetClassList()
        if (response_class.status == 429) {
          return setrequest(true)
        }
        setrequest(false)
        secureLocalStorage.setItem("totalClass", response_class.data.message.length)
        setAssignedClasses(response_class.data.message)
        setinof({
          classId: response_class.data.message[0].classId,
          department: response_class.data.message[0].department,
          year: response_class.data.message[0].year
        })

      } catch (error) {
        console.log(error.message, 'from the Fetching Teacher Pages Api Call.')
        toast.error(error.message)
      }
    }
    Fetch_Class()
  }, [])

  const options = [
    { icon: <FaPlus />, label: "Add Assignment", color: "bg-blue-100 text-blue-500", url: "/assignments" },
    { icon: <FaUpload />, label: "Upload Material", color: "bg-green-100 text-green-500", url: "/Upload-Material" },
    { icon: <FaClipboardCheck />, label: "Mark Attendance", color: "bg-yellow-100 text-yellow-500", url: "/attendance" },
  ];


  const handelActionType = (type) => {
    SetActon(type);
    SethandelActon(true);
  };
  const ActionsTodo = [{ color: "cursor-pointer text-blue-600", title: "Add assigment", Name: "", Link: "/assignments", icon: <FaPlus /> }, { color: "cursor-pointer text-green-600", title: "Upload Material", Name: "", Link: "/Upload-Material", icon: <FaFileUpload /> }, { color: "cursor-pointer text-purple-600", title: "Students", Name: "", Link: "/students", icon: <FaUsers /> }, { color: "cursor-pointer text-orange-600", title: "report", Name: "", Link: "/report", icon: <FaChartBar /> }]
  const navigate = useNavigate("")

  const handelDO = (dataID, item) => {
    // console.log({ dataID, item })
    // navigate("/assignments", { state: dataID })

    switch (item) {
      case "Upload Material":
        navigate("/upload-material", { state: dataID })

        break;
      case "Students":
        navigate("/students", { state: dataID })

        break;
      case "Add assigment":
        navigate("/assignments", { state: dataID })

        break;
      default:
        navigate("/report", { state: dataID })
        break;
    }
  }

  return (
    <>
      <App></App>
      {request && <Tomany></Tomany>}
      <div className="md:ml-64 p-6 space-y-6 min-h-screen bg-gray-100">
        {/* ================= HEADER ================= */}

        <AdminHeader pathname="Classes" ></AdminHeader>

        {/* ================= QUICK ACTION CARDS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          {options.map((opt, idx) => (
            <Link key={idx} to={opt.url || "#"}>
              <div
                className={`bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-gray-50`}
                onClick={() => handelActionType(opt.label)}
              >
                <div className={`text-2xl ${opt.color}`}>{opt.icon}</div>
                <p className="text-sm font-medium text-gray-700">{opt.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ================= CLASSES TABLE ================= */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Subjects</th>
                <th className="p-3 text-center">Students</th>
                <th className="p-3 text-left">Schedule</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedClasses.length === 0 ? (
                <Tablecomponets col={6} text="There is no AssignedClasses Found" />
              ) : (
                assignedClasses.map((data, idx) => (
                  <tr className="border-b hover:bg-gray-50" key={idx}>
                    <td className="p-3 font-medium">{data.classId}</td>

                    {/* Combine all subjects into one td */}
                    <td className="p-3">
                      {data.subjects?.map((subj, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-block bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {subj.subjectName}
                        </span>
                      ))}
                    </td>

                    {/* Example placeholders for Students, Schedule, Status */}
                    <td className="p-3 text-center">{data.studentsCount || '-'}</td>
                    <td className="p-3">{data.schedule || '-'}</td>
                    <td className="p-3 text-center">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">Active</span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center flex justify-center gap-3">
                      {ActionsTodo.map((im, aIdx) => (
                        // <Link to={im.Link} key={aIdx}>
                        <div
                          title={im.title}
                          className={`${im.color} cursor-pointer transition-all duration-200 hover:scale-110 hover:text-black`}
                          onClick={() => handelDO(data.classId, im.title)}
                        >
                          {im.icon}
                        </div>
                        // </Link>
                      ))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


      </div>
    </>

  );
}

export default Classes;
