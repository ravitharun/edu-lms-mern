import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from './Components/Login.jsx';
import Siginup from './Components/SiginUp.jsx';
import BackgroungImgLoader from './Loaders/BackgroungImgLoader.jsx';
import Studymaterials from './Pages/StudentPages/Studymaterials.jsx';
import Classes from './Pages/TeachersPage/Classes.jsx';
import MArkAttandance from './Pages/TeachersPage/MArkAttandance.jsx';
import Addassignments from './Pages/TeachersPage/Addassignments.jsx';
import UploadMaterilas from './Pages/TeachersPage/UploadMaterilas.jsx';
import ApplyLeave from './Pages/TeachersPage/ApplyLeave.jsx';
import Students from './Pages/TeachersPage/Students.jsx';
import AdminProfile from './Pages/TeachersPage/AdminProfile.jsx';
import Loaders from './Loaders/Loaders.jsx';
import MasterAdminDashboard from './Pages/Admin/MasterAdminDashboard.jsx';
import AssiginSubject from './Pages/Admin/AssiginSubject.jsx';
import AssiginTeacherwisesubjects from './Pages/Admin/AssiginTeacherwisesubjects.jsx';
import AdminStudents from './Pages/Admin/Reports.jsx';
import TeachersProfiles from './Pages/Admin/TeachersProfiles.jsx';
import UpdatePassword from './Pages/StudentPages/UpdatePassword.jsx';
import StudentProfile from './Pages/TeachersPage/StudentsProfile.jsx';
import Error from './Components/Error.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import AccountDeactivate from './Components/AcctountDeactive.jsx';
import Issues from './Pages/Admin/Issues.jsx';
import ApplyLeaveAccept from './Pages/TeachersPage/ApplyLeaveAccept.jsx';
import TeacherProfileInfo from './Pages/Admin/TeacherProfileInfo.jsx';
import ProfilesStudenta from './Pages/Admin/ProfilesStudenta.jsx';
import TeachersProfile from './Pages/TeachersPage/TeachersProfile.jsx';
import Annoncement from './Pages/Admin/Announcemet.jsx';
import AcademiCalendar from './Pages/StudentPages/AcademiCalendar.jsx';
import ExamSchedule from './Pages/StudentPages/ExamSchedule.jsx';
import TeacherAcademicCalendar from './Pages/TeachersPage/TeacherAcademicCalendar.jsx';
import { UserName } from './Apis/Islogin.js';
import AddTimeTable from './Pages/Admin/AddTimeTable.jsx';
import ClassTimings from './Pages/StudentPages/ClassTimings.jsx';
import AdminMangeholidays from './Pages/Admin/AdminMangeholidays.jsx';
import Redirect from '../Redirect.jsx';
import Undermanitance from './Loaders/Undermanitance.jsx';
import Exam from './Pages/TeachersPage/Exam.jsx';

const Dashboard = lazy(() => import("./Pages/StudentPages/Dashboard.jsx"));
const AdminDashboard = lazy(() => import("./Pages/TeachersPage/AdminDashboard.jsx"));
const MyCourses = lazy(() => import("./Pages/StudentPages/MyCourses.jsx"));
const Studentprofile = lazy(() => import("./Pages/StudentPages/Studentprofile.jsx"));
// import MyCourses from './Pages/MyCourses.jsx';



createRoot(document.getElementById('root')).render(
  // <Undermanitance>
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <Suspense fallback={<BackgroungImgLoader />}>


            <Redirect />

          </Suspense>
        } />
        <Route path="/StudentDashboard" element={
          <Suspense fallback={<BackgroungImgLoader />}>


            <Dashboard />

          </Suspense>
        } />
        <Route path="/Class-Timings" element={
          <Suspense fallback={<BackgroungImgLoader />}>
            <ProtectedRoute allowedRoles={"student"}>

              <ClassTimings />
            </ProtectedRoute>
          </Suspense>
        } />
        <Route path="/moreabout" element={
          <Suspense fallback={<BackgroungImgLoader />}>
            <Studymaterials />
          </Suspense>
        } />


        <Route path="/my-course"
          element={<Suspense fallback={<BackgroungImgLoader />}


          >
            <ProtectedRoute allowedRoles={"students"}>
              <MyCourses />
            </ProtectedRoute>

          </Suspense>}

        />
        <Route path="/profile"
          element={<Suspense fallback={<BackgroungImgLoader />}>
            <ProtectedRoute allowedRoles={"students"}>

              <Studentprofile />
            </ProtectedRoute>

          </Suspense>}

        />
        <Route path="/Academic-Calendar"
          element={<Suspense fallback={<BackgroungImgLoader />}>
            <ProtectedRoute allowedRoles={"students"}>

              <AcademiCalendar />
            </ProtectedRoute>

          </Suspense>}

        />
        <Route path="/Exam-Schedule"
          element={<Suspense fallback={<BackgroungImgLoader />}>
            <ProtectedRoute allowedRoles={"students"}>

              <ExamSchedule />
            </ProtectedRoute>

          </Suspense>}

        />
        <Route path="/login" element={<Login />} />
        <Route path="/access-restricted" element={<Error />} />
        <Route path="/AccountDeactivate" element={<AccountDeactivate />} />
        <Route path="/siginup" element={<Siginup />} />
        {/* teacher routes */}
        <Route path="/admin-dashboard" element={
          <Suspense fallback={<Loaders />}>
            <ProtectedRoute allowedRoles={"Teacher"}>

              <AdminDashboard />
            </ProtectedRoute>
          </Suspense>
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
    </BrowserRouter>

  </StrictMode>,
)
