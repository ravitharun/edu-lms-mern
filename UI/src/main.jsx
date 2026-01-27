import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from './Components/Login.jsx';
import Siginup from './Components/SiginUp.jsx';
import BackgroungImgLoader from './Loaders/BackgroungImgLoader.jsx';
const Dashboard = lazy(() => import("./Pages/Dashboard.jsx"));
const MyCourses = lazy(() => import("./Pages/MyCourses.jsx"));
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


        <Route path="/my-course" element={<Suspense fallback={<BackgroungImgLoader />}>
          <MyCourses />

        </Suspense>} 
        
        />
        <Route path="/login" element={<Login />} />
        <Route path="/siginup" element={<Siginup />} />

      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
