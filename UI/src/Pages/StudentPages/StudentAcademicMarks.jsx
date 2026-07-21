


import React, { useEffect, useState } from 'react'
import App from '../../App'
import MarksHeader from './MarksHeader'
import MarksOverviewCards from './MarksOverviewCards'
import MarksTableSection from './MarksTableSection'
import StudentProfileCard from './StudentProfileCard'
import PerformanceSummaryCard from './PerformanceSummaryCard'
import MarksLegendCard from './MarksLegendCard'
import DataLoading from '../../Loaders/Dataloading'
import { Header_Token_expry, url, UserName, UserProfileInfo } from '../../Apis/Islogin'
import axios from "axios"
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { incremented } from '../../Store/Section'


function StudentAcademicMarks() {
  const data = useSelector((state) => state.section);
  const [Marks, setStudentMarks] = useState([])
  const Dept = []
  const [choosesection, setchoosesection] = useState('')
  for (let i = 1; i <= 8; i++) {
    if (UserName.department == "CSE") {
      let data = "CSE" + i
      Dept.push(data)
    }
    if (UserName.department == "MECH") {
      let data = "CSE" + i
      Dept.push(data)
    }
    if (UserName.department == "ECE") {
      let data = "CSE" + i
      Dept.push(data)
    }

  }
  useEffect(() => {
    const setDefult = () => {


      setchoosesection(Dept[0])


    }

    setDefult()
  }, [])





  useEffect(() => {
    const FetchStudentMarks = async () => {


      try {
        const response = await axios.get(`${url}/api/studentMarks/Student/sem`, {
          Header_Token_expry,
          params: {
            semseter: data.value,
            studentid: UserProfileInfo?._id


          }
        })


        console.log(response.data.message, 'response');
        setStudentMarks(response.data.message)

      } catch (error) {


        const Message = error?.response.data.message
        const Status = error?.response.status

        if (Status == 500) {


          return toast.error(Message)
        }


        if (Status == 401) {


          return toast.error(Message)
        }




      }



    }
    FetchStudentMarks()

  }, [data.value])




  const viewButtons =
    [
      { id: 'overall', label: 'Overall View', active: true },
      { id: 'final', label: 'Final Exam', active: false },
      { id: 'internal', label: 'Internal', active: false },
      { id: 'assignment', label: 'Assignment', active: false },
      { id: 'lab', label: 'Lab', active: false },
    ]
  const [ViewButtons, setviewButtons] = useState(viewButtons[0])

  const studentData = {
    student: {
      name: 'Arun Kumar',
      regNo: '23CSE1042',
      course: 'B.E Computer Science',
      department: 'Computer Science and Engineering',
      batch: '2023 - 2027',
      currentSemester: 'Semester 4',
    },
    semesters: [
      {
        semester: 'Semester 4',
        overallPercentage: 89,
        cgpa: 8.9,
        subjects: [
          {
            code: 'CS401',
            name: 'Design and Analysis of Algorithms',
            internalMarks: 19,
            assignmentMarks: 9,
            labMarks: 0,
            finalExamMarks: 63,
            totalMarks: 91,
            grade: 'A+',
            type: 'Theory',
          },
          {
            code: 'CS402',
            name: 'Web Technology',
            internalMarks: 20,
            assignmentMarks: 10,
            labMarks: 9,
            finalExamMarks: 55,
            totalMarks: 94,
            grade: 'O',
            type: 'Theory + Lab',
          },
          {
            code: 'CS403',
            name: 'Machine Learning Basics',
            internalMarks: 18,
            assignmentMarks: 8,
            labMarks: 0,
            finalExamMarks: 60,
            totalMarks: 86,
            grade: 'A',
            type: 'Theory',
          },
          {
            code: 'CS404',
            name: 'Compiler Design',
            internalMarks: 18,
            assignmentMarks: 9,
            labMarks: 0,
            finalExamMarks: 60,
            totalMarks: 49,
            grade: 'A',
            type: 'Theory',
          },
          {
            code: 'CS405',
            name: 'Aptitude and Soft Skills',
            internalMarks: 19,
            assignmentMarks: 10,
            labMarks: 0,
            finalExamMarks: 61,
            totalMarks: 90,
            grade: 'A+',
            type: 'Theory',
          },
        ],
      },
    ],
  }
  const selectedSemester = studentData.semesters[0]

  const highestTotal = Math.max(...selectedSemester.subjects.map((item) => item.totalMarks))
  const averageTotal = Math.round(
    selectedSemester.subjects.reduce((acc, item) => acc + item.totalMarks, 0) /
    selectedSemester.subjects.length
  )
  const averageInternal = Math.round(
    selectedSemester.subjects.reduce((acc, item) => acc + item.internalMarks, 0) /
    selectedSemester.subjects.length
  )
  const averageAssignment = Math.round(
    selectedSemester.subjects.reduce((acc, item) => acc + item.assignmentMarks, 0) /
    selectedSemester.subjects.length
  )
  const averageLab = Math.round(
    selectedSemester.subjects.reduce((acc, item) => acc + item.labMarks, 0) /
    selectedSemester.subjects.length
  )
  const averageFinal = Math.round(
    selectedSemester.subjects.reduce((acc, item) => acc + item.finalExamMarks, 0) /
    selectedSemester.subjects.length
  )
  console.log(viewButtons, 'viewButtons');

  return (
    <>
      <App />


      <div className="space-y-6">
        <MarksHeader
          semesters={Dept}
          selectedSemester={selectedSemester}
        />

        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl bg-slate-100 p-1.5">
            {viewButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => setviewButtons(button)}
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${ViewButtons.id === button.id
                  ? "bg-white text-indigo-600 shadow"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>



      {

        ViewButtons.label == 'Overall View' &&

        <div className="min-h-screen bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">




              <div className="p-4 sm:p-6 lg:p-8">
                <MarksOverviewCards
                  student={studentData.student}
                  selectedSemester={selectedSemester}
                  averageInternal={averageInternal}
                  averageAssignment={averageAssignment}
                  averageLab={averageLab}
                  averageFinal={averageFinal}
                />

                <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <div className="xl:col-span-2">

                    <MarksTableSection semester={selectedSemester.semester} Marks={Marks} />

                  </div>

                  <div className="space-y-6">
                    <StudentProfileCard student={studentData.student} />
                    <PerformanceSummaryCard
                      highestTotal={highestTotal}
                      averageTotal={averageTotal}
                    />
                    <MarksLegendCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {ViewButtons.label == 'Final Exam' && <>

        <div className="mt-6 mx-auto w-full max-w-6xl">
          <MarksTableSection
            page="child"
            subjects={selectedSemester.subjects}
            semester={selectedSemester.semester}
          />
        </div>

      </>}
      {ViewButtons.label == 'Internal' && <>


        <div className="mt-6 mx-auto w-full max-w-6xl">
          {/* add here Internal marks */}
          <DataLoading path={`${ViewButtons.label} Marks`} description='Internal Marks data loading' />
        </div>

      </>}
      {ViewButtons.label == 'Assignment' && <>


        <div className="mt-6 mx-auto w-full max-w-6xl">
          {/* add here Internal marks */}
          <DataLoading path={`${ViewButtons.label} Marks`} description='Assignment Marks data loading' />
        </div>

      </>}
      {ViewButtons.label == 'Lab' && <>


        <div className="mt-6 mx-auto w-full max-w-6xl">
          {/* add here Internal marks */}

          <DataLoading path={`${ViewButtons.label} Marks`} description='Lab Marks data loading' />
        </div>

      </>}



    </>
  )
}

export default StudentAcademicMarks