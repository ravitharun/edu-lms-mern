
// Studymaterials.jsx
import App from '../../App'
import { useLocation } from 'react-router-dom'
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

function Studymaterials() {
  const location = useLocation()
  console.log(location, 'location')
  const course = location.state.data
  const Subject_info = location.state.info
  const [Showpdfs, setshowpdfs] = useState([])
  const [loader, setloader] = useState(false)
  const [isurl,setporileurl]=useState('')
  const [Poupporileurl,setPoupporileurl]=useState(false)

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
const handelProfilePoupImg=(url)=>{
  setporileurl(url)
  setPoupporileurl((prev)=>!prev)

}

  return (
    <>
      <App />
      <BackButton page="dashboard" currentPage="my-course" />
     {Poupporileurl &&  <PoupProfileimg url={isurl} onClose={handelProfilePoupImg}></PoupProfileimg>}
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
                onClick={()=>handelProfilePoupImg(course.Techer_profile)}
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

      </div>

      {/* <Footer /> */}
    </>
  )
}

export default Studymaterials