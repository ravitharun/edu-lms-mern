import { useEffect, useState } from "react";
import {
  HiOutlineXMark,
  HiOutlineCalendarDays,
  HiOutlineAcademicCap,
  HiOutlineDocumentDuplicate,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineDocumentText,
  HiOutlineHashtag,
  HiOutlineClipboardDocumentList,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineCog6Tooth,
  HiOutlineEye,
} from "react-icons/hi2";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { handleLogout, url } from '../../Apis/Islogin'
import toast, { Toaster } from "react-hot-toast";
import Dataloading from "../../Loaders/Dataloading";
export default function StudentAssignmentsSubmissions({ Data, setDefaultNavbar }) {
  const navigate = useNavigate()

  const data = Data.data
  const [loading, setisloading] = useState(false)
  const [isReview, setisReview] = useState(false)
  const [issetid, setid] = useState(0)
  const [submissiondata, setsubmissiondata] = useState([])


  const [updateMarks, setUpdatedmarks] = useState(0)
  const [UpdatedStatus, setUpdatedStatus] = useState("")
  console.log({ UpdatedStatus, updateMarks }, 'UpdatedStatus')

  useEffect(() => {
    const FetchSubmissions = async () => {
      try {
        setisloading(true)
        const response = await axios.get(`${url}/api/UploadAssignments/GetSubmissions`,
          {
            params: {
              id: Data.data.assignmentId


            }
          })
        console.log(response.data.message)
        setsubmissiondata(response.data.data)
      } catch (error) {
        const err_status = error.response.status
        const err_message = error.response.data.message
        if (err_status == 401) {
          return handleLogout()
        }
        if (err_status == 500) { return toast.error(err_message) }

      }
      finally {
        setisloading(false)

      }
    }
    FetchSubmissions()
  }, [Data.data.assignmentId])




  const submissions = [
    {
      id: "SUB-001",
      student: "Ravi Kumar",
      assignment: "React Hooks Assignment",
      submitted: "04 Jul 2026",
      score: "--",
      status: "Pending",
    },
    {
      id: "SUB-002",
      student: "Rahul Sharma",
      assignment: "Node.js Project",
      submitted: "03 Jul 2026",
      score: "94/100",
      status: "Approved",
    },
    {
      id: "SUB-003",
      student: "Priya Reddy",
      assignment: "DBMS Assignment",
      submitted: "02 Jul 2026",
      score: "42/100",
      status: "Rejected",
    },
  ];

  const badge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };



  const handelPoupReview = (id, open) => {



    console.log(id, open)


    setisReview((prev) => !prev)

    setid(id)
  }



  const HandelUpdate = async (updatedata) => {
    console.log(updatedata,'updatedata')

    if (!UpdatedStatus || !updateMarks) { return toast.error("Required") }
    if (!updatedata.assignmentId) { return toast.error("Some Thing Went Wrong.") }
    const updateddata = { UpdatedStatus, updateMarks, Student_ID: updatedata.studentId._id, assignementId: updatedata.assignmentId, TotalMarks: data?.Marks }

    try {
      const response = await axios.put(`${url}/api/UploadAssignments/UpdateSubmissions`, {
        data: updateddata

      })
      // console.log(response.data.)
      if (response.status == 201) {
        return toast.success(response.data.message)
      }
      console.log(response, 'response')
    } catch (error) {
      const err_message = error.response.data.message
      const err_status = error.response.status

    }
  }
  return (
    <>

      <Toaster></Toaster>

      {loading ? <Dataloading path="Loading Student Assignment Submissions..." /> :
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-800">
                  Assignment Submissions
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage student submissions, marks, and review status.
                </p>
              </div>

              <button
                onClick={() => setDefaultNavbar("Assignments Uploaded")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <HiOutlineXMark className="text-lg" />
                Close
              </button>
            </div>

            {/* Top Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Due Date
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-800">
                      {data?.DueDate
                        ? new Date(data.DueDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-3 text-red-500">
                    <HiOutlineCalendarDays className="text-xl" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Total Marks
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {data?.Marks ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <HiOutlineAcademicCap className="text-xl" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Submissions
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {data?.totalSubmissions || 0}
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <HiOutlineDocumentDuplicate className="text-xl" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Pending
                    </p>
                    <div className="mt-3 flex items-end gap-3">
                      <h2 className="text-2xl font-bold text-amber-500">{0}</h2>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Needs review
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-500">
                    <HiOutlineClock className="text-xl" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Completed
                    </p>
                    <div className="mt-3 flex items-end gap-3">
                      <h2 className="text-2xl font-bold text-emerald-600">{0}</h2>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Evaluated
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <HiOutlineCheckCircle className="text-xl" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Rejected
                    </p>
                    <div className="mt-3 flex items-end gap-3">
                      <h2 className="text-2xl font-bold text-red-500">{0}</h2>
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                        Action needed
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-red-50 p-3 text-red-500">
                    <HiOutlineXCircle className="text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}
              <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <HiOutlineDocumentText className="text-lg" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Student Submission List
                      </h2>
                      <p className="text-sm text-slate-500">
                        Review submitted assignments, update marks, and change status.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                      <HiOutlineHashtag className="text-slate-400" />
                      <span className="font-medium text-slate-500">Assignment ID:</span>
                      <span className="text-slate-700">{Data.id + 1}</span>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                      <HiOutlineClipboardDocumentList className="text-slate-400" />
                      <span className="font-medium text-slate-500">Assignment:</span>
                      <span className="text-slate-700">
                        {data.AssignementName || "AssignementName"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <div className="relative w-full sm:w-72">
                    <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                    <input
                      placeholder="Search student..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    <HiOutlineFunnel className="text-base" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineUser className="text-sm" />
                          Student
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineUser className="text-sm" />
                          Department
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineDocumentText className="text-sm" />
                          Assignment
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineCalendarDays className="text-sm" />
                          Submitted On
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineAcademicCap className="text-sm" />
                          Marks
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineTag className="text-sm" />
                          Status
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <HiOutlineCog6Tooth className="text-sm" />
                          Active
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <HiOutlineCog6Tooth className="text-sm" />
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {submissiondata?.map((item) => (
                      <tr key={item._id} className="transition hover:bg-slate-50">
                        {/* Student */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.studentId?.profilePreview}
                              alt={item.studentId?.name}
                              className="h-12 w-12 rounded-full border object-cover"
                              loading="lazy"
                            />

                            <div>
                              <h3 className="font-semibold text-slate-800">
                                {item.studentId?.name}
                              </h3>

                              <p className="text-xs text-slate-500">
                                {item.studentId?.Student_ID}
                              </p>

                              <p className="text-xs text-slate-500">
                                {item.studentId?.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            <p className="font-medium text-slate-700">
                              {item.studentId?.department}
                            </p>

                            <p className="text-sm text-slate-500">
                              {item.studentId?.StudentsYearDepartment}
                            </p>
                          </div>
                        </td>

                        {/* Assignment */}
                        <td className="px-6 py-5">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-blue-600 hover:underline hover:bg-blue-100"

                            href={`https://docs.google.com/gview?url=${encodeURIComponent(item.submissionUrl)}&embedded=true`}
                          >
                            <HiOutlineDocumentText />
                            View Submission
                          </a>
                        </td>

                        {/* Submitted */}
                        <td className="px-6 py-5">
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2 text-slate-700">
                              <HiOutlineCalendarDays />
                              {new Date(item.submittedAt).toLocaleDateString("en-IN")}
                            </p>

                            <p className="text-xs text-slate-500">
                              {new Date(item.submittedAt).toLocaleTimeString("en-IN")}
                            </p>
                          </div>
                        </td>

                        {/* Marks */}
                        <td className="px-6 py-5">
                          <div className="inline-flex rounded-lg bg-green-50 px-3 py-2 font-semibold text-green-700">
                            {item.obtainedMarks}/{data?.Marks}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* Student Account */}
                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${item.studentId?.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                            >
                              {item.studentId?.isActive ? "Online" : "Offline"}
                            </span>


                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex min-w-[220px] flex-col gap-2">
                            <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"

                              onClick={() => handelPoupReview(item._id, true)}
                            >
                              <HiOutlineEye />
                              {isReview && item._id == issetid ? "Close" : "Review"}
                            </button>
                            {

                              isReview && item._id == issetid ?
                                <>



                                  <select className="h-10 rounded-xl border px-3" onChange={(e) => setUpdatedmarks(e.target.value)} >
                                    <option>Select Marks</option>

                                    {[...Array((data?.Marks ?? 0) + 1).keys()].map((num) => (
                                      <option key={num} value={num}>{num}</option>

                                    ))}
                                  </select>

                                  <select className="h-10 rounded-xl border px-3" onChange={(e) => setUpdatedStatus(e.target.value)}>
                                    <option>Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Rejected">Rejected</option>
                                  </select>
                                  <button onClick={() => HandelUpdate(item)}>Update</button>
                                </>
                                : null

                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }

    </>

  );
}