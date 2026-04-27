import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const Login = lazy(() => import('./Components/Login.jsx'));
const Siginup = lazy(() => import('./Components/SiginUp.jsx'));
const BackgroungImgLoader = lazy(() => import('./Loaders/BackgroungImgLoader.jsx'));
const Studymaterials = lazy(() => import('./Pages/StudentPages/Studymaterials.jsx'));
const Classes = lazy(() => import('./Pages/TeachersPage/Classes.jsx'));
const MArkAttandance = lazy(() => import('./Pages/TeachersPage/MArkAttandance.jsx'));
const Addassignments = lazy(() => import('./Pages/TeachersPage/Addassignments.jsx'));
const UploadMaterilas = lazy(() => import('./Pages/TeachersPage/UploadMaterilas.jsx'));
const ApplyLeave = lazy(() => import('./Pages/TeachersPage/ApplyLeave.jsx'));
const Students = lazy(() => import('./Pages/TeachersPage/Students.jsx'));
const AdminProfile = lazy(() => import('./Pages/TeachersPage/AdminProfile.jsx'));
const Loaders = lazy(() => import('./Loaders/Loaders.jsx'));
const MasterAdminDashboard = lazy(() => import('./Pages/Admin/MasterAdminDashboard.jsx'));
const AssiginSubject = lazy(() => import('./Pages/Admin/AssiginSubject.jsx'));
const AssiginTeacherwisesubjects = lazy(() => import('./Pages/Admin/AssiginTeacherwisesubjects.jsx'));
const AdminStudents = lazy(() => import('./Pages/Admin/Reports.jsx'));
const TeachersProfiles = lazy(() => import('./Pages/Admin/TeachersProfiles.jsx'));
const UpdatePassword = lazy(() => import('./Pages/StudentPages/UpdatePassword.jsx'));
const StudentProfile = lazy(() => import('./Pages/TeachersPage/StudentsProfile.jsx'));
const Error = lazy(() => import('./Components/Error.jsx'));
const AccountDeactivate = lazy(() => import('./Components/AcctountDeactive.jsx'));
const Issues = lazy(() => import('./Pages/Admin/Issues.jsx'));
const ApplyLeaveAccept = lazy(() => import('./Pages/TeachersPage/ApplyLeaveAccept.jsx'));
const TeacherProfileInfo = lazy(() => import('./Pages/Admin/TeacherProfileInfo.jsx'));
const ProfilesStudenta = lazy(() => import('./Pages/Admin/ProfilesStudenta.jsx'));
const TeachersProfile = lazy(() => import('./Pages/TeachersPage/TeachersProfile.jsx'));
const Annoncement = lazy(() => import('./Pages/Admin/Announcemet.jsx'));
const AcademiCalendar = lazy(() => import('./Pages/StudentPages/AcademiCalendar.jsx'));
const ExamSchedule = lazy(() => import('./Pages/StudentPages/ExamSchedule.jsx'));
const TeacherAcademicCalendar = lazy(() => import('./Pages/TeachersPage/TeacherAcademicCalendar.jsx'));
const AddTimeTable = lazy(() => import('./Pages/Admin/AddTimeTable.jsx'));
const ClassTimings = lazy(() => import('./Pages/StudentPages/ClassTimings.jsx'));
const AdminMangeholidays = lazy(() => import('./Pages/Admin/AdminMangeholidays.jsx'));
const Redirect = lazy(() => import('../Redirect.jsx'));
const Undermanitance = lazy(() => import('./Loaders/Undermanitance.jsx'));
const Exam = lazy(() => import('./Pages/TeachersPage/Exam.jsx'));
const Dashboard = lazy(() => import("./Pages/StudentPages/Dashboard.jsx"));
const AdminDashboard = lazy(() => import("./Pages/TeachersPage/AdminDashboard.jsx"));
const MyCourses = lazy(() => import("./Pages/StudentPages/MyCourses.jsx"));
const Studentprofile = lazy(() => import("./Pages/StudentPages/Studentprofile.jsx"));

import ProtectedRoute from './Components/ProtectedRoute.jsx';
import "../src/Pages/TeachersPage/Script.js"

createRoot(document.getElementById('root')).render(
  // <Undermanitance>


    <>
      <BrowserRouter>
        <Suspense fallback={<BackgroungImgLoader />}>
          <Routes>
            <Route path="/" element={



              <Redirect />


            } />
            <Route path="/StudentDashboard" element={

              <ProtectedRoute allowedRoles={"students"}>


                <Dashboard />
              </ProtectedRoute>


            } />
            <Route path="/Class-Timings" element={

              <ProtectedRoute allowedRoles={"students"}>

                <ClassTimings />
              </ProtectedRoute>

            } />
            <Route path="/moreabout" element={

              <Studymaterials />

            } />


            <Route path="/my-course"
              element={



                <ProtectedRoute allowedRoles={"students"}>
                  <MyCourses />
                </ProtectedRoute>

              }

            />
            <Route path="/profile"
              element={
                <ProtectedRoute allowedRoles={"students"}>

                  <Studentprofile />
                </ProtectedRoute>

              }

            />
            <Route path="/Academic-Calendar"
              element={
                <ProtectedRoute allowedRoles={"students"}>

                  <AcademiCalendar />
                </ProtectedRoute>

              }

            />
            <Route path="/Exam-Schedule"
              element={
                <ProtectedRoute allowedRoles={"students"}>

                  <ExamSchedule />
                </ProtectedRoute>

              }

            />
            <Route path="/login" element={<Login />} />
            <Route path="/access-restricted" element={<Error />} />
            <Route path="/AccountDeactivate" element={<AccountDeactivate />} />
            <Route path="/siginup" element={<Siginup />} />
            {/* teacher routes */}
            <Route path="/admin-dashboard" element={

              <ProtectedRoute allowedRoles={"Teacher"}>

                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
            <Route path="/change-password" element={<UpdatePassword />} />
            <Route path="/classes" element={<ProtectedRoute allowedRoles={"Teacher"}>

              <Classes />
            </ProtectedRoute>} />

            <Route path="/StudentsProfile" element={<ProtectedRoute allowedRoles={"Teacher"}>


              <StudentProfile />
            </ProtectedRoute>} />

            <Route path="/TecherProfile/Info" element={<ProtectedRoute allowedRoles={"Admin"}>


              <TeacherProfileInfo />
            </ProtectedRoute>} />

            <Route path="/teachers/ApplyLeaveAccept" element={<ProtectedRoute allowedRoles={"Teacher"}>


              <ApplyLeaveAccept />
            </ProtectedRoute>} />
            <Route path="/attendance" element={


              <ProtectedRoute allowedRoles={["Teacher"]}>

                <MArkAttandance />
              </ProtectedRoute>

            } />
            <Route path="/assignments" element={



              <ProtectedRoute allowedRoles={"Teacher"}>
                <Addassignments />
              </ProtectedRoute>

            } />
            <Route
              path="/Upload-Material"
              element={
                <ProtectedRoute allowedRoles={["Teacher"]}>
                  <UploadMaterilas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/Academic-Calendar"
              element={
                <ProtectedRoute allowedRoles={["Teacher"]}>
                  <TeacherAcademicCalendar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/students"
              element={
                <ProtectedRoute allowedRoles={["Teacher"]}>
                  <Students />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exam"
              element={
                <ProtectedRoute allowedRoles={["Teacher"]}>
                  <Exam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Teachers/Profile"
              element={
                <ProtectedRoute allowedRoles={["Teacher"]}>
                  <TeachersProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teachers/ApplyLeave"
              element={
                <ProtectedRoute allowedRoles={["Teacher"]}>
                  <ApplyLeave />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teachers/profile"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/Issues"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Issues />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/Studenta"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <ProfilesStudenta />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/Annoncement"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Annoncement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/AddTimeTable"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AddTimeTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/Uploadholidays"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminMangeholidays />
                </ProtectedRoute>
              }
            />

            {/* adminMAster routes */}
            <Route path="/AdminDashboard" element={<ProtectedRoute allowedRoles={["Admin"]}>
              <MasterAdminDashboard />
            </ProtectedRoute>} />

            <Route
              path="/Admin/AssiginSubjects"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AssiginSubject />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/Assign-Teachers"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AssiginTeacherwisesubjects />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/Profile"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/Reports"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminStudents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/Teachers"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <TeachersProfiles />
                </ProtectedRoute>
              }
            />

          </Routes>
        </Suspense>
      </BrowserRouter>

    </>,
//  </Undermanitance>
)
