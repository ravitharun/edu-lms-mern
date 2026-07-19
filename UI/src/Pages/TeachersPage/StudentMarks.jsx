import { Header_Token_expry, url } from "../../Apis/Islogin";
import App from "../../App";
import axios from "axios";
import AdminHeader from "../../Components/AdminHeader";
import { useEffect, useState } from "react";
import { FetchClassByTecherId } from "./TechersApiCall/FectchClassApi";
import { useNavigate } from "react-router-dom";
import NotFound from "../../Loaders/NotFound";
import DataLoading from "../../Loaders/Dataloading";
import { socket } from "../../Socket";
import { FaSearch } from "react-icons/fa";

const StudentMarks = () => {
  const naviagte = useNavigate()
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const [Section, setsection] = useState([])
  const [choosesection, setSection] = useState("")
  const [loader, setloader] = useState(false)
  const [marksstudent, setmarksstudent] = useState([])

  const [displayStudents, setdisplayStudents] = useState([]);

  const [searchStudent, setStudent] = useState([])

  useEffect(() => {
    const SetStudentData = () => {
      setdisplayStudents(marksstudent.length > 0 ? marksstudent : students)
    }
    SetStudentData()
  }, [marksstudent, students])


  // Fetch StudentsMArks



  useEffect(() => {
    const FetchStudentsMarks = async () => {


      try {
        setloader(true)
        const response = await axios.get(`${url}/api/studentMarks/fetchMarksByStudentId`, {
          ...Header_Token_expry,
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
      setStudents((prev) =>
        prev.map((student) => {
          const updated = savedMarks.find(
            (item) => item?.id?._id === student?._id
          );

          return updated
            ? {
              ...student,
              ...updated
            }
            : student;
        })
      );
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
      console.log(data, 'data');

      const response = await axios.post(`${url}/api/studentMarks/AssiginMarks`, { data: data }, { ...Header_Token_expry })



      setloader(false)
    } catch (error) {
      console.log(error);


    }

    finally {
      setloader(false)
    }



  };
  const handelSearch = (e) => {
    console.log(e);

    if (!e) {


      return setdisplayStudents(marksstudent.length > 0 ? marksstudent : students)
    }
    const Filter_studentInfo = displayStudents.filter((data) => data?.id.Student_ID == e || data?.id.name == e || data?.id.email == e)


    console.log(Filter_studentInfo, 'Filter_studentInfo');
    if (Filter_studentInfo.length == 0) {
      return setdisplayStudents([])
    }
    setdisplayStudents(Filter_studentInfo)






  }


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

     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">
        Upload Student Marks
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Section: <span className="font-medium text-gray-700">{choosesection || "Select a section"}</span>
      </p>
    </div>

    <div className="relative w-full sm:max-w-sm">
      <FaSearch
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search by name or ID"
        onChange={(e) => handelSearch(e.target.value)}
        className="h-11 w-full rounded-xl border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
      />
    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50">
        <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          <th className="px-4 py-3">S.No</th>
          <th className="px-4 py-3">Profile</th>
          <th className="px-4 py-3">Student ID</th>
          <th className="px-4 py-3">Student Name</th>
          <th className="px-4 py-3 text-center">Internal</th>
          <th className="px-4 py-3 text-center">Lab</th>
          <th className="px-4 py-3 text-center">Final</th>
          <th className="px-4 py-3 text-center">Total</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100 bg-white">
        {loader ? (
          <DataLoading description="Saving marks for all students..." />
        ) : displayStudents.length === 0 || students.length === 0 ? (
          <tr>
            <td colSpan={8} className="px-4 py-10">
              <NotFound message="No students found" />
            </td>
          </tr>
        ) : (
          displayStudents.map((student, idx) => (
            <tr
              key={student._id}
              className="transition hover:bg-blue-50/40"
            >
              <td className="px-4 py-3 font-medium text-gray-700">
                {idx + 1}
              </td>

              <td className="px-4 py-3">
                <img
                  src={student.profilePreview || student.id?.profilePreview}
                  alt={student.name || student.id?.name}
                  className="h-10 w-10 rounded-full border border-gray-200 object-cover shadow-sm"
                />
              </td>

              <td className="px-4 py-3 font-medium text-gray-900">
                {student.Student_ID || student.id?.Student_ID}
              </td>

              <td className="px-4 py-3 text-gray-700">
                {student.name || student.id?.name}
              </td>

              <td className="px-4 py-3 text-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={student.internal ?? ""}
                  onChange={(e) =>
                    handleMarkChange(student._id, "internal", e.target.value)
                  }
                  className="h-10 w-20 rounded-lg border border-gray-300 bg-gray-50 px-2 text-center font-medium text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </td>

              <td className="px-4 py-3 text-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={student.lab ?? ""}
                  onChange={(e) =>
                    handleMarkChange(student._id, "lab", e.target.value)
                  }
                  className="h-10 w-20 rounded-lg border border-gray-300 bg-gray-50 px-2 text-center font-medium text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </td>

              <td className="px-4 py-3 text-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={student.final ?? ""}
                  onChange={(e) =>
                    handleMarkChange(student._id, "final", e.target.value)
                  }
                  className="h-10 w-20 rounded-lg border border-gray-300 bg-gray-50 px-2 text-center font-medium text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </td>

              <td className="px-4 py-3 text-center">
                <span className="inline-flex min-w-[72px] items-center justify-center rounded-lg bg-gray-100 px-3 py-2 font-semibold tabular-nums text-gray-900">
                  {getStudentTotal(student._id)}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm text-gray-500">
      Enter marks for each student, then save all changes.
    </p>

    <button
      onClick={SaveAll}
      disabled={
        loader ||
        students.length === 0 ||
        data.length !== students.length
      }
      className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
    >
      {loader ? "Saving..." : "Save All Marks"}
    </button>
  </div>
</div>
      </div>
    </>
  );
};

export default StudentMarks;



