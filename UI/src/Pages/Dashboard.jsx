import React from 'react'
import App from '../App'
import { FaBell, FaCheckCircle, FaEnvelope, FaUserCircle } from 'react-icons/fa'
import { data } from 'react-router-dom'

function Dashboard() {
  const Name = "Ravi Tharun"
  const ProfileData = [

    {
      icon: 'icon',
      type: "attandcane",
      count: "87.4%"
    },
    {
      icon: 'icon',
      type: "assginmen pending",
      count: 4

    },
    {
      icon: 'icon',
      type: "assginmen pending",
      count: 4

    },
  ]
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

  console.log(ProfileData, 'ProfileData')

  return (
    <>
      {/* contain the navbar section */}
      <App></App>

      <br />


      {/* heading Dashboard */}
      <div className="bg-white rounded-xl p-5 ">
        <header className="flex flex-col mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard
            <span className="text-sm font-normal text-gray-500 ml-2">
              {Name}
            </span>
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded mt-1"></div>
        </header>
      </div>
      {/* banner */}

      <div
        className="rounded-lg w-full p-9 text-white shadow-md"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-2" title='Student ID'>
          <p className="text-xs uppercase tracking-wide text-gray-300">
            Student ID :
          </p>

          <p className="text-lg font-semibold text-blue-400">
            STU237
          </p>
        </div>


        <p className="mt-1 text-sm text-gray-300">
          6th Semester | CSE
        </p>
      </div>

      {/* pf card */}
      <div className="flex flex-wrap gap-6 justify-center mt-6">

        {/* Left: Profile Card */}
        <div
          className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg"
          style={{
            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)", // soft blue shadow
          }}
        >
          {/* Profile Icon */}
          <div className="flex flex-col items-center -mt-12 mb-3">
            <div
              className="bg-white rounded-full p-2"
              style={{
                boxShadow: "0 2px 10px rgba(59, 130, 246, 0.2)",
              }}
            >
              <FaUserCircle className="text-5xl text-blue-500" />
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-gray-800 text-center mt-2">
              Ravi Tharun
            </h2>

            {/* Divider */}
            <div className="w-12 h-1 bg-blue-500 rounded my-2"></div>
          </div>

          {/* Academic Info */}
          <p className="text-sm text-gray-600 mb-3">
            CSE · B.Tech · 8th Sem · STU237
          </p>

          <div className="w-full h-px bg-gray-200 my-2"></div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Roll Number:</span> <span className="font-medium">40</span></p>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <p><span className="text-gray-500">Date of Birth:</span> <span className="font-medium">18/06/2005</span></p>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <p><span className="text-gray-500">Student Email:</span> <span className="font-medium">student_email</span></p>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <p><span className="text-gray-500">Alternate Email:</span> <span className="font-medium">student_alt_email</span></p>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <p><span className="text-gray-500">Phone Number:</span> <span className="font-medium">student_phnumber</span></p>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <p><span className="text-gray-500">Father Email:</span> <span className="font-medium">Parent_email</span></p>
            <p><span className="text-gray-500">Father Phone:</span> <span className="font-medium">Parent_number</span></p>
            <p><span className="text-gray-500">Mother Name:</span> <span className="font-medium">MParent_name</span></p>
            <p><span className="text-gray-500">Mother Phone:</span> <span className="font-medium">MParent_number</span></p>
          </div>
        </div>

        {/* Right: Small Stat Cards */}
        <div className="flex-1 flex flex-wrap gap-4">

          {ProfileData.map((data, idx) => (
            <div
              key={idx}
              className="relative flex items-center gap-4 rounded-xl p-4 w-full max-w-xs shadow-md"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)", // blue gradient
                color: "white",
                height: "100px",
              }}
            >
              {/* Icon in a small square */}
              <div className="flex items-center justify-center bg-white/20 rounded-lg w-12 h-12">
                <span className="text-2xl text-white">{data.icon}</span>
              </div>

              {/* Text + Count */}
              <div className="flex flex-col">
                <span className="text-sm">{data.type}</span>
                <span className="text-2xl font-bold">{data.count}</span>
              </div>

              {/* Decorative curve at bottom-right */}
              <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tr-xl rounded-bl-xl bg-white/20"></div>
            </div>
          ))}


        </div>
   <div className="mt-8  min-w-[250px] ">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Notifications</h3>
        <div className="bg-white shadow-md rounded-lg overflow-y-auto" style={{ maxHeight: "300px" }}>
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
      </div>


      </div>


   






      {/* side bar cards */}


    </>
  )
}

export default Dashboard
