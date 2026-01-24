import React from 'react'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Example from './Components/SiginUp'
import LogoNavbar from './Components/LogoNavbar'

function App() {
  return (
    <>
      <LogoNavbar></LogoNavbar>
    <div className="sticky top-0 z-40 bg-gray-700 shadow">
  <Navbar />
</div>

    </>
  )
}

export default App