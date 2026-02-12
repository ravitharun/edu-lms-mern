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

function MyCourses() {

  const [Info, setInfo] = useState({
    yr: "",
    department: ""
  })

  const [subjects, setsubjects] = useState([])

  useEffect(() => {
    const fetchAllSubjectsClassid = async () => {
      try {
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

  const naviaget = useNavigate("")
  const handeldataprops = (data, info) => {
    const newdata = {
      data, info
    }
    console.log(newdata)
    naviaget("/moreabout", { state: newdata })
  }
  return (
    <>
      <App />
      <BackButton page="dashboard" />

      <div className="px-4 mt-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Study Materials  - year {Info.yr} - department {Info.department}
        </h1>
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((data) => (
            <div
              key={data.subjectId}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
              onClick={() => handeldataprops(data, {
                year: Info.yr,
                dept: Info.department
              })}
            >
              {/* IMAGE (TOP HALF) */}
              <div className="h-32 w-full">
                <img
                  src='https://images.unsplash.com/photo-1518770660439-4636190af475'
                  alt={data.CourseName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT (BOTTOM HALF) */}
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
      </div>
      <Footer></Footer>


    </>
  );
}

export default MyCourses;
