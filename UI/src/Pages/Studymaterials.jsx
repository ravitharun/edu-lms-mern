// Studymaterials.jsx
import React from 'react'
import App from '../App'
import { useLocation } from 'react-router-dom'
import BackButton from '../Components/BackButton'

function Studymaterials() {
  const location = useLocation()
  const course = location.state || {
    CourseID: 'CSE101',
    CourseName: 'Programming in C',
    coursecode: 'CS101',
    Img: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    Professor: 'Dr. John Doe',
    Modules: [
      {
        ModuleName: 'Module 1: Basics',
        StudyMaterials: ['Lecture 1.pdf', 'Lecture 2.pdf'],
        PendingAssignments: ['Assignment 1', 'Assignment 2'],
      },
      {
        ModuleName: 'Module 2: Advanced',
        StudyMaterials: ['Lecture 3.pdf', 'Lecture 4.pdf'],
        PendingAssignments: ['Assignment 3'],
      },
      {
        ModuleName: 'Module 3: Practice',
        StudyMaterials: ['Lecture 5.pdf'],
        PendingAssignments: [],
      },
    ],
  }

  return (
    <>
      <App />
      <BackButton page="my-course"></BackButton>

      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{course.CourseName}</h1>
          <p className="text-gray-600">
            <span className="font-semibold">Course Code:</span> {course.coursecode} |{' '}
            <span className="font-semibold">Course ID:</span> {course.CourseID} |{' '}
            <span className="font-semibold">Professor:</span> {course.Professor}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 table-auto">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border px-4 py-2 text-left">Module</th>
                <th className="border px-4 py-2 text-left">Study Materials</th>
                <th className="border px-4 py-2 text-left">Pending Assignments</th>
              </tr>
            </thead>
            <tbody>
              {course?.Modules?.map((module, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-semibold">{module.ModuleName}</td>

                  <td className="border px-4 py-2">
                    {module?.StudyMaterials.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {module.StudyMaterials.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No materials</span>
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {module?.PendingAssignments.length > 0 ? (
                      <ul className="list-disc list-inside text-red-600">
                        {module.PendingAssignments.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No pending assignments</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Studymaterials
