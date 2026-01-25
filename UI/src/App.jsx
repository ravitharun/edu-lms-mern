import { useEffect, useState } from 'react'

import Navbar from './Components/Navbar'

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