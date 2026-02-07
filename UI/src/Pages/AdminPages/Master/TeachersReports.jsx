import React from 'react'
import StudentsReports from './StudentsReports'
import DownloadReports from './DownloadReports'

function TeachersReports() {
  const teacherData = [
    { name: "Dr. Ravi Tharun", department: "CSE", courses: 5, experience: 8, email: "ravi.cse@college.edu" },
    { name: "Prof. Priya Kumar", department: "ECE", courses: 4, experience: 6, email: "priya.ece@college.edu" },
    { name: "Dr. Manoj Reddy", department: "MECH", courses: 3, experience: 10, email: "manoj.mech@college.edu" },
    { name: "Prof. Anjali Singh", department: "CIVIL", courses: 4, experience: 7, email: "anjali.civil@college.edu" },
    { name: "Dr. Suresh Babu", department: "EEE", courses: 2, experience: 5, email: "suresh.eee@college.edu" },
    { name: "Prof. Neha Sharma", department: "AERO", courses: 3, experience: 4, email: "neha.aero@college.edu" },
    { name: "Dr. Kiran Reddy", department: "CSE", courses: 6, experience: 9, email: "kiran.cse@college.edu" },
    { name: "Prof. Lavanya Das", department: "ECE", courses: 5, experience: 8, email: "lavanya.ece@college.edu" },
    { name: "Dr. Ajay Kumar", department: "MECH", courses: 4, experience: 6, email: "ajay.mech@college.edu" },
    { name: "Prof. Sneha Rao", department: "CIVIL", courses: 3, experience: 7, email: "sneha.civil@college.edu" },
    { name: "Dr. Rohit Verma", department: "EEE", courses: 2, experience: 5, email: "rohit.eee@college.edu" },
    { name: "Prof. Priyanka Iyer", department: "AERO", courses: 4, experience: 6, email: "priyanka.aero@college.edu" },
  ];

  const yer = new Date
  return (
    <>
     <div className="mt-10 w-max">
  <DownloadReports
    data={teacherData}
    fileName={`teacher's-report-${yer.getFullYear()}`}
    buttonName="Teachers"
  />
</div>

    </>
  )
}

export default TeachersReports