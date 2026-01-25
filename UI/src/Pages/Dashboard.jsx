
import React, { Activity, useState } from 'react';
import App from '../App';
import { FaBell, FaBellSlash, FaBriefcase, FaCheckCircle, FaDownload, FaEdit, FaEnvelope, FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import Footer from './Footer';
import { IoNewspaperOutline } from "react-icons/io5";
import "../App.css"
import toast, { Toaster } from 'react-hot-toast';
function Dashboard() {
  const Name = "Ravi Tharun";

  const ProfileData = [
    { icon: '📊', type: "Attendance", count: "87.4%" },
    { icon: '📝', type: "Assignments Pending", count: 4 },
    { icon: '📚', type: "Courses Pending", count: 2 },
  ];

  const Notifications = [
    {
      icon: <FaBell />,
      title: "New Assignment Posted",
      subtitle: "Check your CSE 8th Sem course",
      time: "2h ago",
    },
    {
      icon: <FaEnvelope />,
      title: "Message from Professor",
      subtitle: "Your project proposal is approved",
      time: "5h ago",
    },
    {
      icon: <FaCheckCircle />,
      title: "Course Completed",
      subtitle: "You have completed React Basics",
      time: "1d ago",
    },
  ];

  const [notificationType, setNotificationType] = useState("Notification");
  const [placementNotificationType, setplacementNotificationType] = useState("UpcomingJobs");
  const [profileimgs, setprofileimg] = useState(false)
  const imgechooserurl = [{
    imgUrl: "data:image/jpeg;base64,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"

  },

  {
    imgUrl: "data:image/jpeg;base64,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"
  },


  {
    imgUrl: "data:image/jpeg;base64,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"
  }
  ]
  const [imgurlChoosed, setimgurlChoosed] = useState(imgechooserurl[0]);
  const navItems = [
    { label: "Notification", key: "Notification" },
    { label: "Student Announcement", key: "Studentannocement" },
    { label: "Circular", key: "circular" },
  ];
  const Placement_Registration_navItems = [
    { label: "Upcoming Jobs", key: "UpcomingJobs" },
    { label: "Applied Jobs", key: "AppliedJobs" },

  ];
  const Placement = []
  const message = "Image not applied yet"
  // handel poup to show customize images
  const Handelbgimages = () => {
    toast.error(message,{
      position:"top-right"
    })
    setprofileimg((prev) => !prev)
    console.log(imgechooserurl, 'imgechooserurl')
  }


  const handleImageClick = (choosedurl) => {






    if (!choosedurl) {
      return toast.error("We hit a snag. Please refresh and try again.")
    }
    setimgurlChoosed(choosedurl)
    console.log("imgurl Choosed after select url", imgurlChoosed)
  }
  console.log("imgurl Choosed default url", imgurlChoosed)

  return (
    <>


      {/* <Toaster></Toaster> */}
      <Toaster></Toaster>

      {/* Navbar Section */}
      <App />
      <br />

      {/* Dashboard Header */}
      <div className=" bg-white rounded-xl p-5">
        <header className="flex flex-col mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard
            <span className="text-sm font-normal text-gray-500 ml-2">{Name}</span>
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded mt-1"></div>
        </header>
      </div>

      {/* Banner */}
      <div
        className="rounded-lg w-full p-6 md:p-9 text-white shadow-md mt-4 relative flex flex-col md:flex-row md:justify-between"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Left Side: Student Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2" title="Student ID">
            <p className="text-xs uppercase tracking-wide text-gray-300">Student ID :</p>
            <p className="text-lg font-semibold text-blue-400">STU237</p>
          </div>
          <p className="text-sm text-gray-300">6th Semester | CSE</p>
        </div>

        {/* Right Side: Profile Image */}

        <div className="flex flex-col items-center mt-6 md:mt-0 md:items-end">
          {/* Profile Image */}
          <div
            className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/50 ring-offset-2 shadow-lg hover:scale-105 transition-transform duration-300"
            style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format&ixlib=rb-4.0.3"
              alt="Ravi Tharun"
              className="w-full h-full object-cover"
              title="Ravi Tharun"
            />
          </div>

          {/* Button directly under image */}
          <button className="flex items-center gap-2 mt-3 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300" onClick={Handelbgimages}>
            <FaEdit className="text-sm" /> Customize
          </button>
        </div>

      </div>
      {profileimgs && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Your Profile Image</h2>
              <button
                onClick={Handelbgimages}
                className="text-red-500 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {imgechooserurl.map((imgurl, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-400 transition"
                  onClick={() => handleImageClick(imgurl)}
                >
                  <img
                    src={imgurl.imgurl}
                    alt="not-found"
                    className="w-full h-24 object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Section: Left Profile + Right Stats + Notifications */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 px-4">
        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-xl p-5 w-full sm:max-w-md lg:max-w-sm shadow-lg mx-auto">
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120"
                alt={Name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-2 text-center">
              {Name}
            </h2>
            <div className="w-10 h-1 bg-blue-500 rounded mt-1"></div>
          </div>

          <p className="text-sm text-gray-600 text-center mb-4">
            CSE · B.Tech · 8th Sem · STU237
          </p>

          <div className="space-y-2 text-sm text-center text-gray-700">
            <p><span className="text-gray-500">Roll No:</span> 40</p>
            <p><span className="text-gray-500">DOB:</span> 18/06/2005</p>
            <p><span className="text-gray-500">Email:</span> student_email</p>
            <p><span className="text-gray-500">Phone:</span> student_phone</p>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          {/* ---------- STATS CARDS ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ProfileData.map((data, idx) => (
              <div
                key={idx}
                title={data.type}
                className="flex items-center gap-4 rounded-xl p-4 shadow-md text-white hover:cursor-pointer   bg-gradient-to-br from-blue-500 to-blue-400
                hover:from-blue-300 
hover:to-blue-400"

              >
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg text-2xl ">
                  {data.icon}
                </div>
                <div>
                  <p className="text-sm">{data.type}</p>
                  <p className="text-xl font-bold">{data.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ---------- NOTIFICATIONS ---------- */}
          <div className="bg-white p-4 rounded-xl shadow-md w-full">
            <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
              <FaBell className="text-blue-500" />
              Notifications
            </div>

            <nav className="flex flex-wrap gap-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setNotificationType(item.key)}
                  className={`px-4 py-1.5 rounded-full text-sm transition
                  ${notificationType === item.key
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {notificationType === "Notification" && (
              <div className="max-h-[220px] overflow-y-auto space-y-2">
                {Notifications.map((notif, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full">
                      {notif.icon}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.title}</p>
                      <p className="text-xs text-gray-500">{notif.subtitle}</p>
                    </div>

                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                ))}
              </div>
            )}

            {notificationType !== "Notification" && (
              <div className="text-center py-10 text-gray-500 font-medium">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>




      {/* placement ui components sections and  Placement Registration  of the ui  */}
      <div className="flex flex-col lg:flex-row gap-4 w-full mt-10">

        {/* Placement News */}
        <div className="bg-white p-4 rounded-xl shadow-md w-full lg:w-1/2 h-full">

          {/* Header */}
          <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold text-base sm:text-lg">
            <IoNewspaperOutline className="text-blue-500 text-lg" />
            <span>Placement News</span>
          </div>

          {/* Empty State */}
          {Placement.length <= 0 && (
            <div className="flex justify-center sm:justify-start mt-4">
              <div className="flex items-center gap-2 px-4 py-3 bg-blue-100 rounded-xl shadow-sm">
                <FaInfoCircle className="text-xl text-blue-600" />
                <p className="text-sm text-gray-600 font-medium">
                  No placement news to display
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Placement Registration */}
        <div className="bg-white p-4 rounded-xl shadow-md w-full lg:w-1/2 h-full">

          {/* Header */}
          <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold text-base sm:text-lg">
            <IoNewspaperOutline className="text-blue-500 text-lg" />
            <span>Placement Registration</span>
          </div>

          {/* Nav Tabs */}
          <nav className="flex flex-wrap gap-2 sm:gap-3 bg-gray-100 p-2 rounded-md shadow-inner mb-4">
            {Placement_Registration_navItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setplacementNotificationType(item.key)}
                className={`list-none cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium
            ${placementNotificationType === item.key
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-700 hover:bg-blue-200"
                  }`}
              >
                {item.label}
              </li>
            ))}
          </nav>

          {placementNotificationType === "UpcomingJobs" &&
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md w-full">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

                {/* Title */}
                <h1 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
                  <FaBriefcase className="text-blue-500" />
                  Upcoming Jobs
                </h1>

                {/* Button - Left aligned by default */}
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition w-fit">
                  <FaDownload />
                  Download Resume
                </button>
              </div>

              {/* Empty State */}
              {Placement.length <= 0 && (
                <div className="flex justify-center sm:justify-start mt-4">
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-100 rounded-xl shadow-sm">
                    <FaInfoCircle className="text-lg text-red-600" />
                    <p className="text-sm text-red-500 font-medium">
                      No Record Found

                    </p>
                  </div>
                </div>
              )}
            </div>
          }
          {placementNotificationType === "AppliedJobs" &&
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md w-full">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

                {/* Title */}
                <h1 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
                  <FaBriefcase className="text-blue-500" />
                  Applied Jobs
                </h1>

                {/* Button - Left aligned by default */}
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition w-fit">
                  <FaDownload />
                  Download Resume
                </button>
              </div>

              {/* Empty State */}
              {Placement.length <= 0 && (
                <div className="flex justify-center sm:justify-start mt-4">
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-100 rounded-xl shadow-sm">
                    <FaInfoCircle className="text-lg text-red-600" />
                    <p className="text-sm text-red-500 font-medium">
                      Your job application list is empty. Start applying today!
                    </p>
                  </div>
                </div>
              )}
            </div>
          }
          {/* Empty State */}
          {Placement.length != 0 && (
            <div className="flex justify-center sm:justify-start mt-4">
              <div className="flex items-center gap-2 px-4 py-3 bg-blue-100 rounded-xl shadow-sm">
                <FaInfoCircle className="text-xl text-blue-600" />
                <p className="text-sm text-gray-600 font-medium">
                  No placement news to display
                </p>
              </div>
            </div>
          )}
        </div>

      </div>






      {/* Footer */}
      <Footer />
    </>
  );
}

export default Dashboard;
