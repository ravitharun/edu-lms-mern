import React, { useEffect, useState } from 'react'
import Loaders from './src/Loaders/Loaders'
import { UserName } from './src/Apis/Islogin'
import Countdown from 'react-countdown'

function Redirect() {
    const [loading, setLoading] = useState(true)
    const [sec, setsec] = useState(0)
    // Page redirect Logic
    useEffect(() => {
        setLoading(true)

        const role = UserName?.role  

        // ❌ if role not exists
        if (!role) {
            window.location.href = "/login"
            return
        }

        if (role === "Admin" || role === "admin") {
            window.location.href = "/AdminDashboard"
        }
        else if (role === "Teacher" || role === "Teacher") {
            setTimeout(() => {
                window.location.href = "/teacher-dashboard"
            }, 10000);
        }
        else {
            window.location.href = "/StudentDashboard"
        }

    }, [])

    return (
        <>
            <Countdown
                date={Date.now() + 10000}
                renderer={({ total, completed }) => {
                    const sec = Math.ceil(total / 1000)
                    return (
                        <>
                            {loading &&
                                <Loaders pathname={UserName?.role} userName={UserName?.name} sec={sec} />
                            }
                        </>
                    )
                }}
            />
        </>
    )
}

export default Redirect