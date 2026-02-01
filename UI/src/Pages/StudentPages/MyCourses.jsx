import React from "react";
import App from "../../App";
import BackButton from "../../Components/BackButton";
import BackgroungImgLoader from "../../Loaders/BackgroungImgLoader";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import LMSLoader from "../../Loaders/BackgroungImgLoader";

function MyCourses() {
  const Data_metrails = [
    {
      CourseID: "CSE101",
      Img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      coursecode: "CS101",
      CourseName: "Programming in C",
    },
    {
      CourseID: "CSE102",
      Img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
      coursecode: "CS102",
      CourseName: "Data Structures",
    },
    {
      CourseID: "CSE103",
      Img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      coursecode: "CS103",
      CourseName: "DBMS",
    },
    {
      CourseID: "CSE103",
      Img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      coursecode: "CS103",
      CourseName: "DBMS",
    },
    {
      CourseID: "CSE104",
      Img: "https://images.unsplash.com/photo-1517430816045-df4b7de1cd0b",
      coursecode: "CS104",
      CourseName: "Operating Systems",
    },
    {
      CourseID: "CSE104",
      Img: "https://images.unsplash.com/photo-1517430816045-df4b7de1cd0b",
      coursecode: "CS104",
      CourseName: "Operating Systems",
    },
    {
      CourseID: "CSE104",
      Img: "https://images.unsplash.com/photo-1517430816045-df4b7de1cd0b",
      coursecode: "CS104",
      CourseName: "Operating Systems",
    },
  ];
  const naviaget = useNavigate("")
  const handeldataprops = (data) => {
    naviaget("/moreabout", { state: data })
  }
  return (
    <>
      <App />
      <BackButton page="dashboard" />

      <div className="px-4 mt-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Study Materials
        </h1>
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Data_metrails.map((data) => (
            <div
              key={data.CourseID}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
              onClick={() => handeldataprops(data)}
            >
              {/* IMAGE (TOP HALF) */}
              <div className="h-32 w-full">
                <img
                  src={data.Img}
                  alt={data.CourseName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT (BOTTOM HALF) */}
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-500">
                  {data.coursecode}
                </span>

                <h2 className="text-sm font-semibold text-gray-800 mt-1">
                  {data.CourseName}
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
