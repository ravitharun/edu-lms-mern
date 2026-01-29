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
import AdminDashboard from './Pages/AdminPages/AdminDashboard.jsx';
const Dashboard = lazy(() => import("./Pages/StudentPages/Dashboard.jsx"));
const MyCourses = lazy(() => import("./Pages/StudentPages/MyCourses.jsx"));
// import MyCourses from './Pages/MyCourses.jsx';


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
            <Studymaterials  />
          </Suspense>
        } />


        <Route path="/my-course" element={<Suspense fallback={<BackgroungImgLoader />}>
          <MyCourses />

        </Suspense>} 
        
        />
        <Route path="/login" element={<Login />} />
        <Route path="/siginup" element={<Siginup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
