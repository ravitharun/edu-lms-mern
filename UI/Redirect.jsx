import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import Loaders from './src/Loaders/Loaders'
import { UserRole } from './src/Apis/Islogin'
import Undermanitance from './src/Loaders/Undermanitance'

function Redirect() {
    // const navigate=useNavigate()
    const [loadin, setloading] = useState(true)
    useEffect(() => {
        setloading(true)
        const Getuserrole = secureLocalStorage.getItem("User_info")
        console.log(Getuserrole.role, 'Getuserrole')
        if (Getuserrole.role == "Admin") {

            window.location.href = "/AdminDashboard"

        }
        else if (Getuserrole.role == 'teacher') {

            window.location.href = "/admin-dashboard"
        }
        else {
            window.location.href = "/"

        }
        setloading(true)
    }, [])

    return (
        <>
            {loadin &&<>
            <Loaders pathname={UserRole.role}/>
            </>}
        </>
    )
}

export default Redirect