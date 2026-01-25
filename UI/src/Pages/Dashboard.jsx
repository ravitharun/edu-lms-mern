
import React, { Activity, useState } from 'react';
import App from '../App';
import { FaBell, FaBellSlash, FaBriefcase, FaCheck, FaCheckCircle, FaDownload, FaEdit, FaEnvelope, FaInfoCircle, FaTicketAlt, FaUserCircle } from 'react-icons/fa';
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
  const imgechooserurl = [

    {
      imgUrl: "https://wallpapercave.com/wp/wp3629359.jpg"

    },
    {
      imgUrl: "https://tse1.mm.bing.net/th/id/OIP.Q4QiWBOb2kretcP6PEOUyQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"

    },
    {
      imgUrl: "https://tse4.mm.bing.net/th/id/OIP.rJam30xWJpzfQHBwMx3tHwHaEJ?w=626&h=351&rs=1&pid=ImgDetMain&o=7&rm=3"

    },
    {
      imgUrl: "https://th.bing.com/th/id/OIP.8P8HaDgqqrbnG1xMZaeGZgHaEK?w=290&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"

    },
    {
      imgUrl: "https://wallpaperaccess.com/full/1349218.jpg"

    },
    {
      imgUrl: "https://th.bing.com/th/id/OIP.IQisviMYhD2P8Th5nNajkAHaEK?w=269&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"

    },




  ]

  const [imgurlChoosed, setimgurlChoosed] = useState(imgechooserurl[0].imgUrl);
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
    setprofileimg((prev) => !prev)

  }


  const handleImageClick = (choosedurl) => {






    if (!choosedurl) {
      return toast.error("We hit a snag. Please refresh and try again.")
    }
    setimgurlChoosed(choosedurl)
    toast.success("Updated ...")
  }


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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${imgurlChoosed}) `,
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
          <button
            onClick={Handelbgimages}
            className="flex items-center gap-2 mt-3 px-5 py-2
             bg-gradient-to-r from-blue-500/30 to-indigo-500/30
             backdrop-blur-md
             border border-white/20
             text-white font-semibold rounded-full
             shadow-md hover:shadow-xl
             hover:from-blue-500/40 hover:to-indigo-500/40
             hover:scale-105 transition-all duration-300"
          >
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
              {imgechooserurl.map((img, idx) => {
                const isSelected = imgurlChoosed === img.imgUrl;

                return (
                  <div
                    key={idx}
                    onClick={() => handleImageClick(img.imgUrl)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 
          ${isSelected ? "border-green-500" : "border-transparent"}
          hover:border-blue-400 transition`}
                  >
                    {/* ✅ Tick Icon */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                        <FaCheckCircle className="text-green-500 text-lg sm:text-xl" />
                      </div>
                    )}

                    {/* Image */}
                    <img
                      src={img.imgUrl}
                      alt="not-found"
                      className="w-full h-24 sm:h-28 md:h-32 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                );
              })}
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
