import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

function UserisLogin() {
    const navigate = useNavigate("")
    useEffect(() => {
        const fun = () => {
            let tkn = secureLocalStorage.getItem("token")

            if (tkn == null) {
                return navigate("/login")
            }

        }
        fun()
    }, [])
    return (
        <>


        </>)
}

export default UserisLogin