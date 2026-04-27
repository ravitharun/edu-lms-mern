
// Studymaterials.jsx
import React from 'react'
import App from '../../App'
import { useLocation } from 'react-router-dom'
import BackButton from '../../Components/BackButton'
import Footer from './Footer'
import LMSLoader from '../../Loaders/BackgroungImgLoader'
import { MaintanceMode } from '../../Apis/Islogin'
import Undermanitance from '../../Loaders/Undermanitance'

function Studymaterials() {
  const location = useLocation()
  console.log(location,'location')
  const course = location.state.data
  const Subject_info = location.state.info
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

  return (
    <>
      <App />
      <BackButton page="dashboard" currentPage="my-course" />
      <div className="max-w-6xl mx-auto p-4">

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
                src={course.Techer_profile}
                alt={course.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg hover:scale-105 transition duration-300"
              />
            </div>

          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto bg-white shadow-md rounded-xl border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left">Module</th>
                <th className="border px-4 py-3 text-left">Study Materials</th>
                <th className="border px-4 py-3 text-left">Pending Assignments</th>
              </tr>
            </thead>

            <tbody>
              {course?.Modules?.map((module, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  {/* Module Name */}
                  <td className="border px-4 py-3 font-semibold">
                    {module.ModuleName}
                  </td>

                  {/* Study Materials */}
                  <td className="border px-4 py-3">
                    {module?.StudyMaterials?.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {module.StudyMaterials.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">
                        No materials
                      </span>
                    )}
                  </td>

                  {/* Pending Assignments */}
                  <td className="border px-4 py-3">
                    {module?.PendingAssignments?.length > 0 ? (
                      <ul className="list-disc list-inside text-red-600 space-y-1">
                        {module.PendingAssignments.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">
                        No pending assignments
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* <Footer /> */}
    </>
  )
}

export default Studymaterials