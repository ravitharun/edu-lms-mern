import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from './Components/Login.jsx';
import Siginup from './Components/SiginUp.jsx';
import Dashboard from './Pages/Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/siginup" element={<Siginup />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
