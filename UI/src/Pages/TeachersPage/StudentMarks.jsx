import { url } from "../../Apis/Islogin";
import App from "../../App";
import axios from "axios";
import AdminHeader from "../../Components/AdminHeader";
import { useEffect, useState } from "react";
import { FetchClassByTecherId } from "./TechersApiCall/FectchClassApi";
import { useNavigate } from "react-router-dom";
import NotFound from "../../Loaders/NotFound";
import DataLoading from "../../Loaders/Dataloading";
import { socket } from "../../Socket";

const StudentMarks = () => {
  const naviagte = useNavigate()
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const [Section, setsection] = useState([])
  const [choosesection, setSection] = useState("")
  const [loader, setloader] = useState(false)

  const [marksstudent, setmarksstudent] = useState([])
  const displayStudents = marksstudent.length > 0 ? marksstudent : students;

  // Fetch StudentsMArks



  useEffect(() => {
    const FetchStudentsMarks = async () => {


      try {
        setloader(true)
        const response = await axios.get(`${url}/api/studentMarks/fetchMarksByStudentId`, {
          params: {

            Section: choosesection.split("-")[0]

          }
        })


        setloader(false)
        setmarksstudent(response.data.data)

      } catch (error) {

      }
      finally {



        setloader(false)
      }
    }

    FetchStudentsMarks()
  }, [choosesection])


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${url}/api/markAttandance/StudentsAttandance`,

          {
            params: {
              ClassID: choosesection.split("-")[0].slice(0, 3) + " " + choosesection.split("-")[0].slice(3, 4),
            },
          }
        );

        setStudents(response.data.message);


      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, [choosesection]);


  useEffect(() => {


    const FetchClassAssigned = async () => {



      try {

        const response = await FetchClassByTecherId()

        setsection(response.data.message);


      } catch (error) {


        if (error.response.status == 500) {
          return console.error("server error");

        }
        if (error.response.status == 403) {
          return naviagte("/login");

        }

      }
    }
    FetchClassAssigned()
  }, [])

  useEffect(() => {
    socket.on("marksUpdated", (savedMarks) => {


      // Option 1: Update React state directly
      setStudents(savedMarks);

      // Option 2: Fetch latest data from API
      // getAllMarks();
    });

    return () => {
      socket.off("marksUpdated");
    };
  }, []);

  const handleMarkChange = (studentId, field, value) => {
    const numericValue = Number(value) || 0;

    const filterBySubjectid = Section.find(
      (s) => s.classId === choosesection.split("-")[0]
    );

    // Update the UI immediately
    if (marksstudent.length > 0) {
      setmarksstudent((prev) =>
        prev.map((student) =>
          student._id === studentId
            ? {
              ...student,
              [field]: numericValue,
              total:
                Number(field === "internal" ? numericValue : student.internal || 0) +
                Number(field === "lab" ? numericValue : student.lab || 0) +
                Number(field === "final" ? numericValue : student.final || 0),
            }
            : student
        )
      );
    }

    setData((prev) => {
      const existing = prev.find((item) => item.id === studentId);

      if (existing) {
        const updated = {
          ...existing,
          [field]: numericValue,
          subjectid: filterBySubjectid.subjects[0]._id,
          Semester: filterBySubjectid.classId,
        };

        updated.total =
          Number(updated.internal || 0) +
          Number(updated.lab || 0) +
          Number(updated.final || 0);

        return prev.map((item) =>
          item.id === studentId ? updated : item
        );
      }

      return [
        ...prev,
        {
          id: studentId,
          internal: field === "internal" ? numericValue : 0,
          lab: field === "lab" ? numericValue : 0,
          final: field === "final" ? numericValue : 0,
          Grade: "",
          percentage: 0,
          total:
            (field === "internal" ? numericValue : 0) +
            (field === "lab" ? numericValue : 0) +
            (field === "final" ? numericValue : 0),
          subjectid: filterBySubjectid.subjects[0]._id,
          Semester: filterBySubjectid.classId,
        },
      ];
    });
  };

  const getStudentTotal = (studentId) => {


    const record = displayStudents.find((item) => item?._id === studentId);


    return record?.total ?? 0;
  };

  const SaveAll = async () => {

    try {
      setloader(true)
      const response = await axios.post(`${url}/api/studentMarks/AssiginMarks`, { data: data })



      setloader(false)
    } catch (error) {
      console.log(error);


    }

    finally {
      setloader(false)
    }



  };

  return (
    <>

      <App />

      <div className="md:ml-64 min-h-screen bg-gray-100 p-6 space-y-6">
        <AdminHeader pathname={"Marks"} />

        {/* Section select wrapper */}
        <div>
          <label
            htmlFor="section"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Section
          </label>

          <div className="relative inline-block">
            <select
              id="section"
              name="Section"
              onChange={(e) => {

                setSection(e.target.value)



              }}
              className="block w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="" disabled selected>
                select Section
              </option>
              {Section.map((subj, idx) => (
                <option
                  key={idx}
                  value={`${subj.classId}-${subj.department}-${subj.subjects[0].subjectId}`}
                >
                  {subj.subjects[0].subjectId}
                </option>
              ))}
            </select>

            {/* custom arrow */}
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              ▾
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow border border-gray-100">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Upload Student Marks - {choosesection || "Select a section"}
            </h2>
            <p className="text-sm text-gray-500">
              Enter the marks for each student and click <b>Save All Marks</b>.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-700">
                  <th className="px-4 py-3">Profile</th>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3 text-center">Internal</th>
                  <th className="px-4 py-3 text-center">Lab</th>
                  <th className="px-4 py-3 text-center">Final Exam</th>
                  <th className="px-4 py-3 text-center">Total</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loader &&
                  <DataLoading description="Saving marks for all students..." />}
                {loader ? (
                  <DataLoading description="Saving marks for all students..." />
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8">
                      <NotFound message="No students Found" />
                    </td>
                  </tr>
                ) : (
                  displayStudents?.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={student.profilePreview || student.id?.profilePreview}
                          alt={student.name || student.id?.name}
                          className="h-10 w-10 rounded-full object-cover border border-gray-200"
                        />
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {student.Student_ID || student.id?.Student_ID}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {student.name || student.id?.name}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          placeholder="10"
                          max="100"
                          min="0"
                          value={student.internal ?? ""}
                          className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-center text-sm"
                          onChange={(e) =>
                            handleMarkChange(student._id, "internal", e.target.value)
                          }
                        />
                      </td>

                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          placeholder="0"
                          value={student.lab ?? ""}
                          className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-center text-sm"
                          onChange={(e) =>
                            handleMarkChange(student._id, "lab", e.target.value)
                          }
                        />
                      </td>
                      {/* final marsk */}
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          placeholder="0"
                          className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-center text-sm"
                          value={student.final ?? ""}
                          onChange={(e) =>
                            handleMarkChange(student._id, "final", e.target.value)
                          }

                        />
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800">
                          {getStudentTotal(student._id)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t bg-gray-50 px-6 py-4">
            <button
              onClick={SaveAll}
              disabled={loader ? true : students.length == 0}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Save All Marks
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentMarks;