import React, { useEffect } from "react";
import App from "../../App";
import BackButton from "../../Components/BackButton";
import BackgroungImgLoader from "../../Loaders/BackgroungImgLoader";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import LMSLoader from "../../Loaders/BackgroungImgLoader";
import { UserName, UserRole } from "../../Apis/Islogin";
import axios from "axios";
import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function MyCourses() {

  const [Info, setInfo] = useState({
    yr: "",
    department: ""
  })

  const [subjects, setsubjects] = useState([])
  const [Semester, setSemester] = useState("")
  useEffect(() => {
    const fetchAllSubjectsClassid = async () => {
      try {
        console.log(UserName.StudentsYearDepartment, 'StudentsYearDepartment')
        const response_subjectsByClassID = await axios.get(`http://localhost:5001/api/AssignSubjects/get/subjects/${UserName.StudentsYearDepartment.split(" ").join("")}`)
        setInfo({
          yr: response_subjectsByClassID.data.message.year,
          department: response_subjectsByClassID.data.message.department
        })
        console.log(response_subjectsByClassID.data.message.subjects, 'response_subjectsByClassID')
        setsubjects(response_subjectsByClassID.data.message.subjects)

      } catch (error) {

      }

    }
    fetchAllSubjectsClassid()
  }, [])
  // debugger
  console.log(subjects, 'subjects')

  const naviaget = useNavigate("")
  const handeldataprops = (data, info) => {
    const newdata = {
      data, info
    }
    console.log(newdata)
    naviaget("/moreabout", { state: newdata })
  }
  console.log(UserName)
  return (
    <>
      <Toaster></Toaster>
      <App />
      <BackButton page="dashboard" currentPage="Course" />      <div className="px-4 mt-8">

        {/* HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

          {/* <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Study Materials
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Year {Info.yr || 1} • {Info.department || 'CSE'} Department
            </p>

            {Semester && <>


              <div className="text-sm text-gray-500 mt-1">


                ({Semester})Semester
              </div></>}
          </div> */}
          <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Study Materials
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Year {Info?.yr || 1} • {Info?.department || "CSE"} Department
            </p>

            {Semester && (
              <p className="text-sm text-gray-500">
                Semester {Semester}
              </p>
            )}
          </div>
          {/* DROPDOWN RIGHT */}
          <div className="w-64">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Semester
            </label>

            <select className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm 
      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"

              onChange={(e) => {
                setSemester(e.target.value)

                toast.success(`Feteching the ${e.target.value} Semester Notes.`)
              }}
            >
              <option disabled>Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* CONDITION */}
        {subjects.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center justify-center h-52 w-80 bg-white rounded-xl shadow-sm border">
              <FaBookOpen className="text-4xl text-gray-400 mb-3" />
              <p className="text-gray-600 text-lg font-semibold">
                No Courses Found
              </p>
              <p className="text-sm text-gray-400 text-center px-4">
                Please check back later or add a new course.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((data) => (
              <div
                key={data.subjectId}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
                onClick={() =>
                  handeldataprops(data, {
                    year: Info.yr,
                    dept: Info.department,
                  })
                }
              >
                <div className="h-32 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                    alt={data.subjectName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <span className="text-xs font-semibold text-blue-500">
                    {data.subjectId}
                  </span>

                  <h2 className="text-sm font-semibold text-gray-800 mt-1">
                    {data.subjectName}
                  </h2>

                  <button className="mt-3 text-sm text-blue-600 font-medium hover:underline">
                    View Materials →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>

    </>
  );
}

export default MyCourses;
