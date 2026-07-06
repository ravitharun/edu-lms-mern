 
// Studymaterials.jsx
import App from '../../App'
import { Link, useLocation } from 'react-router-dom'
import BackButton from '../../Components/BackButton'
import Footer from './Footer'
import LMSLoader from '../../Loaders/BackgroungImgLoader'
import { MaintanceMode } from '../../Apis/Islogin'
import Undermanitance from '../../Loaders/Undermanitance'
import { useEffect, useState } from 'react'
import { fetchSubjetcsMaterials } from './FetchPdfs'
import toast from 'react-hot-toast'
import Dataloading from '../../Loaders/Dataloading'
import PoupProfileimg from './PoupProfileimg'
import {
  FaBookOpen,
  FaClipboardList,
  FaChalkboardTeacher,
} from "react-icons/fa";
import TeacherInfo from './TeacherInfo'
import ViewAssignemts from './ViewAssignemts'
function Studymaterials() {
  const location = useLocation()
  const course = location.state.data

  const Subject_info = location.state.info
  const [Showpdfs, setshowpdfs] = useState([])
  const [Menu, setmenu] = useState("Study Materials")

  const [loader, setloader] = useState(false)
  const [isurl, setporileurl] = useState('')
  const [Poupporileurl, setPoupporileurl] = useState(false)

  useEffect(() => {
    const FetchPdfs = async () => {
      // console.log(location.state.data.subjectId)
      try {
        setloader(true)
        const response = await fetchSubjetcsMaterials(location.state.data.subjectId)
        console.log(response, 'response')
        setshowpdfs(response.data.data)
        setloader(false)

      } catch (error) {
        toast.error(error)
      }
    }

    FetchPdfs()
  }, [])
  if (!course) {
    return (
      <>
        <App />
        <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
          No Course Data Found
        </div>
      </>
    )
  }
  const handelProfilePoupImg = (url) => {
    setporileurl(url)
    setPoupporileurl((prev) => !prev)

  }
  const menuItems = [
    {
      title: "Study Materials",
      icon: <FaBookOpen className="text-3xl text-blue-600" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Assignments",
      icon: <FaClipboardList className="text-3xl text-emerald-600" />,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Teacher Info",
      icon: <FaChalkboardTeacher className="text-3xl text-purple-600" />,
      color: "from-purple-500 to-pink-500",
    },
  ];
  return (
    <>
      <App />
      <BackButton page="dashboard" currentPage="my-course" />
      {Poupporileurl && <PoupProfileimg url={isurl} onClose={handelProfilePoupImg}></PoupProfileimg>}
      <div className="w-full rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-3 shadow-[0_8px_30px_rgba(59,130,246,0.08)]">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {menuItems.map((item, idx) => {
            const isActive = Menu === item.title;

            return (
              <button
                key={idx}
                onClick={() => setmenu(item?.title)}
                className={`group flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300
            ${isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-200 scale-[1.02]"
                    : "bg-white text-slate-700 border border-sky-100 hover:bg-sky-50 hover:text-blue-600 hover:shadow-sm"
                  }`}
              >
                <span
                  className={`text-lg transition-all duration-300 ${isActive
                      ? "text-white"
                      : "text-sky-500 group-hover:text-blue-600"
                    }`}
                >
                  {item.icon}
                </span>

                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>



      {Menu == "Study Materials" && <div className="max-w-6xl mx-auto p-4">

        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <div className="bg-white shadow-md rounded-xl p-6 mb-6 border">

            {/* Subject Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {course.subjectName}
            </h1>

            {/* Year & Department Badges */}
            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm shadow-sm">
                Year {Subject_info.year}
              </span>

              <span className="px-4 py-1 bg-purple-100 text-purple-700 font-semibold rounded-full text-sm shadow-sm">
                {Subject_info.dept} Department
              </span>

            </div>
          </div>

          {/* Improved UI Section */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-5 border">

            {/* Left Side - Course Details */}
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Course Code:</span>{" "}
                {course.subjectId}
              </p>

              <p>
                <span className="font-semibold">Course ID:</span>{" "}
                {course.subjectId}
              </p>

              <p>
                <span className="font-semibold">Professor:</span>{" "}
                {course.name}
              </p>
            </div>

            {/* Right Side - Teacher Image */}
            <div>
              <img
               loading="lazy"
                src={course.Techer_profile}
                alt={course.name}
                onClick={() => handelProfilePoupImg(course.Techer_profile)}
                className="w-24 hover:cursor-pointer h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg hover:scale-105 transition duration-300"
              />
            </div>

          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto bg-white shadow-md rounded-xl border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left"> S.No</th>
                <th className="border px-4 py-3 text-left">Subject Name</th>
                <th className="border px-4 py-3 text-left">Module</th>

                <th className="border px-4 py-3 text-left">createdAt</th>
                <th className="border px-4 py-3 text-left">updatedAt</th>
                <th className="border px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loader ? (
                <tr>
                  <td colSpan="5" className="py-10">
                    <div className="flex justify-center items-center">
                      <Dataloading path="PDFs are" />
                    </div>
                  </td>
                </tr>
              ) : Showpdfs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">
                    No PDFs Found
                  </td>
                </tr>
              ) : (
                Showpdfs.map((module, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition duration-200 text-center"
                  >
                    <td className="border px-4 py-3 font-medium">
                      {idx + 1}
                    </td>
                    <td className="border px-4 py-3 font-medium">
                      {module.subjectname}
                    </td>
                    <td className="border px-4 py-3">
                      {module.Description}
                    </td>
                    <td className="border px-4 py-3 text-sm text-gray-600">
                      {new Date(module.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-3 text-sm text-gray-600">
                      {new Date(module.updatedAt).toLocaleDateString()}
                      {/* {module.updatedAt} */}
                    </td>
                    <td className="border px-4 py-3 space-x-3">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                        href={`https://docs.google.com/gview?url=${encodeURIComponent(module.UploadUrl)}&embedded=true`}
                      >
                        View
                      </a>
                      <a
                        className="text-green-600 hover:underline"
                        href={module.UploadUrl}
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>}
      {Menu == "Assignments" && <>

        <ViewAssignemts Section={course} Subject_info={course}/>
      </>}
      {Menu == "Teacher Info" && <>

        <TeacherInfo></TeacherInfo>
      </>}

      {/* <Footer /> */}
    </>
  )
}

export default Studymaterials
