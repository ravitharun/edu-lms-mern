import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from './Components/Login.jsx';
import Siginup from './Components/SiginUp.jsx';
import BackgroungImgLoader from './Loaders/BackgroungImgLoader.jsx';
import Studymaterials from './Pages/StudentPages/Studymaterials.jsx';

import Classes from './Pages/AdminPages/Classes.jsx';
import MArkAttandance from './Pages/AdminPages/MArkAttandance.jsx';
import Addassignments from './Pages/AdminPages/Addassignments.jsx';
import UploadMaterilas from './Pages/AdminPages/UploadMaterilas.jsx';
import ApplyLeave from './Pages/AdminPages/ApplyLeave.jsx';
import Students from './Pages/AdminPages/Students.jsx';
import AdminProfile from './Pages/AdminPages/AdminProfile.jsx';
import Loaders from './Loaders/Loaders.jsx';
import secureLocalStorage from 'react-secure-storage';
import MasterAdminDashboard from './Pages/AdminPages/Master/MasterAdminDashboard.jsx';
import AssiginSubject from './Pages/AdminPages/Master/AssiginSubject.jsx';
import AssiginTeacherwisesubjects from './Pages/AdminPages/Master/AssiginTeacherwisesubjects.jsx';
const Dashboard = lazy(() => import("./Pages/StudentPages/Dashboard.jsx"));
const AdminDashboard = lazy(() => import("./Pages/AdminPages/AdminDashboard.jsx"));
const MyCourses = lazy(() => import("./Pages/StudentPages/MyCourses.jsx"));
// import MyCourses from './Pages/MyCourses.jsx';


const clr_token_logout = secureLocalStorage.getItem("User_info")
console.log(clr_token_logout?.role
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <Suspense fallback={<BackgroungImgLoader />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="/moreabout" element={
          <Suspense fallback={<BackgroungImgLoader />}>
            <Studymaterials />
          </Suspense>
        } />


        <Route path="/my-course" element={<Suspense fallback={<BackgroungImgLoader />}>
          <MyCourses />

        </Suspense>}

        />
        <Route path="/login" element={<Login />} />
        <Route path="/siginup" element={<Siginup />} />
        {/* teacher routes */}
        <Route path="/admin-dashboard" element={
          <Suspense fallback={<Loaders />}>
            <AdminDashboard />
          </Suspense>
        } />

        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="/classes" element={<Classes />} />
        <Route path="/attendance" element={<MArkAttandance />} />
        <Route path="/assignments" element={<Addassignments />} />
        <Route path="/Upload-Material" element={<UploadMaterilas />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers/ApplyLeave" element={<ApplyLeave />} />
        <Route path="/teachers/profile" element={<AdminProfile />} />
{/* adminMAster routes */}
        <Route path="/AdminDashboard" element={<MasterAdminDashboard />} />
        <Route path="/Admin/AssiginSubjects" element={<AssiginSubject />} />
        <Route path="/admin/Assign-Teachers" element={<AssiginTeacherwisesubjects />} />
        <Route path="/Admin/Profile" element={<AdminProfile />} />

      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
