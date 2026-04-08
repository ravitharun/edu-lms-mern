import React, { useEffect, useState } from 'react'
import DisplyTimetabel from '../Admin/DisplyTimetabel.jsx'
import Footer from './Footer'
import BackButton from '../../Components/BackButton'
import App from '../../App'
import { Toaster } from 'react-hot-toast'
import { MaintanceMode, UserName } from '../../Apis/Islogin'
import AddTimeTable from '../Admin/AddTimeTable'
import { FetchTimeTableByYear } from '../Admin/APIS/HandelTimeTable.js'
import Undermanitance from '../../Loaders/Undermanitance'

function ClassTimings() {
    const [date, setate] = useState([])
    useEffect(() => {
        const HandelGetTimeTableByYear = async () => {
            try {
                // console.log(UserName.StudentsYearDepartment + "" + UserName.department + "dept")
                // 'SEM1-1YEAR'
                // SEM11YEAR 
                // CSE 1--Yrdpet
                // CSE--dept
                // "CSE 1".replace("CSE","SEM").split(" ").join("")
                let StudentsYearDepartment = UserName?.StudentsYearDepartment || "";
                let department = UserName?.department;
        
                let base = StudentsYearDepartment.slice(0, -1);

        
                let sem = StudentsYearDepartment.replace(base, "SEM").replace(/\s+/g, "");


                let newrs = `${sem} ${StudentsYearDepartment.split(" ")[1]}YEAR`.replace(/\s+/g, "-");




                const responseGetTimeTableByYear = await FetchTimeTableByYear(newrs )
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