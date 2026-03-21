import React, { useEffect, useState } from 'react'
import DisplyTimetabel from '../AdminPages/Master/DisplyTimetabel'
import Footer from './Footer'
import BackButton from '../../Components/BackButton'
import App from '../../App'
import { Toaster } from 'react-hot-toast'
import { UserName } from '../../Apis/Islogin'
import AddTimeTable from '../AdminPages/Master/AddTimeTable'
import { FetchTimeTableByYear } from '../AdminPages/Master/APIS/HandelTimeTable'

function ClassTimings() {
    const [date, setate] = useState([])
    useEffect(() => {
        const HandelGetTimeTableByYear = async () => {
            try {

                const responseGetTimeTableByYear = await FetchTimeTableByYear('SEM1-1YEAR')
                setate(responseGetTimeTableByYear.data.message)
                if (responseGetTimeTableByYear.data.message == `No data.`) {
                    toast.error(`No Time Table Found For these ${GetTimeTableByYear} `)
                    // return setfilterbysem([])

                }

            } catch (error) {

            }
        }
        HandelGetTimeTableByYear()
    }, [])
    return (
        <>
            <Toaster></Toaster>
            <App />
            <BackButton page="dashboard" currentPage="ClassTImeTable" />
            <DisplyTimetabel role={UserName.role} events={date}></DisplyTimetabel>
            {/* <AddTimeTable></AddTimeTable> */}
            <Footer></Footer>
        </>
    )
}

export default ClassTimings