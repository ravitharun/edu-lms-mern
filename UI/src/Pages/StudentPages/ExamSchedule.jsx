import React from 'react'
import App from '../../App'
import BackButton from '../../Components/BackButton'
import Calendars from './Calendars'

function ExamSchedule() {
    return (
        <>

            <App></App>
            <BackButton page="dashboard" currentPage="Exam-Schedule"></BackButton>
            <Calendars examData="data"></Calendars>
        </>
    )
}

export default ExamSchedule