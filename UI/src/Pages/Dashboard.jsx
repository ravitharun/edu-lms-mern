
import React, { useState } from 'react';
import App from '../App';
import { FaBell, FaBellSlash, FaBriefcase, FaCheckCircle, FaDownload, FaEnvelope, FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import Footer from './Footer';
import { IoNewspaperOutline } from "react-icons/io5";

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
  return (
    <>
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
        <div className="absolute md:static top-6 right-6">
          <div
            className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/50 ring-offset-2 shadow-lg"
            style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format&ixlib=rb-4.0.3"
              alt="Ravi Tharun"
              className="w-full h-full object-cover"
              title={Name}
            />
          </div>
        </div>
      </div>


      {/* Main Section: Left Profile + Right Stats + Notifications */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 justify-center">
        {/* Left: Profile Card (smaller width) */}
        <div
          className="bg-white rounded-xl p-6 w-full lg:w-70 shadow-lg h-[360px]"
          style={{ boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)" }}
        >


          <div className="flex flex-col items-center -mt-12 mb-3">
            <div
              className="bg-white rounded-full p-2"
              style={{ boxShadow: "0 2px 10px rgba(59, 130, 246, 0.2)" }}
            >
              <div className="absolute md:static top-6 right-6">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/50 ring-offset-2 shadow-lg"
                  style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format&ixlib=rb-4.0.3"
                    alt="Ravi Tharun"
                    className="w-full h-full object-cover"
                    title={Name}
                  />
                </div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mt-2">{Name}</h2>
            <div className="w-12 h-1 bg-blue-500 rounded my-2"></div>
          </div>

          <p className="text-sm text-gray-600 mb-3">CSE · B.Tech · 8th Sem · STU237</p>

          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Roll Number:</span> <span className="font-medium">40</span></p>
            <p><span className="text-gray-500">Date of Birth:</span> <span className="font-medium">18/06/2005</span></p>
            <p><span className="text-gray-500">Student Email:</span> <span className="font-medium">student_email</span></p>
            <p><span className="text-gray-500">Phone Number:</span> <span className="font-medium">student_phnumber</span></p>
          </div>
        </div>

        {/* Right: Top Stats + Notifications (takes remaining space) */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          {/* Top 3 ProfileData Cards */}
          <div className="flex flex-wrap gap-4 justify-start">
            {ProfileData.map((data, idx) => (
              <div
                key={idx}
                className="relative flex items-center gap-4 rounded-xl p-4 w-full sm:w-[calc(33%-1rem)] shadow-md"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                  color: "white",
                  height: "100px",
                }}
              >
                <div className="flex items-center justify-center bg-white/20 rounded-lg w-12 h-12 text-2xl">
                  {data.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{data.type}</span>
                  <span className="text-2xl font-bold">{data.count}</span>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tr-xl rounded-bl-xl bg-white/20"></div>
              </div>
            ))}
          </div>



          {/* Notifications Section */}
          <div className="bg-white p-4 rounded-xl shadow-md mt-2">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 text-gray-800  text-xl">
              <FaBell className="text-blue-500" />
              <span className="flex items-center gap-1 font-mono">
                <span>Notifications</span>
                {notificationType !== "Notification" && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                    {notificationType}
                  </span>
                )}
              </span>
            </div>

            {/* Nav Tabs */}
            <nav className="flex flex-wrap gap-3 justify-start bg-gray-100 p-2 rounded-md shadow-inner mb-4">
              {navItems.map((item) => (
                <li
                  key={item.key}
                  onClick={() => setNotificationType(item.key)}
                  className={`list-none cursor-pointer px-4 py-2 rounded-full transition-colors duration-300 text-sm font-medium
              ${notificationType === item.key
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-700 hover:bg-blue-200"
                    }`}
                >
                  {item.label}
                </li>
              ))}
            </nav>

            {/* Notification Content */}
            {notificationType === "Notification" && (
              <div className="overflow-y-auto" style={{ maxHeight: "250px" }}>
                {Notifications.map((notif, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 w-full hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-center bg-blue-100 text-blue-500 rounded-full w-10 h-10">
                      {notif.icon}
                    </div>
                    <div className="flex-1 mx-3">
                      <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                      <p className="text-xs text-gray-500">{notif.subtitle}</p>
                    </div>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                ))}
              </div>
            )}

            {notificationType === "Studentannocement" && (
              <div className="text-center py-10 text-gray-500 font-medium">
                Student Announcements will appear here.
              </div>
            )}

            {notificationType === "circular" && (
              <div className="text-center py-10 text-gray-500 font-medium">
                Circulars will appear here.
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
