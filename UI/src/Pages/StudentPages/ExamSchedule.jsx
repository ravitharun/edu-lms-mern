import React from 'react'
import App from '../../App'
import BackButton from '../../Components/BackButton'
import Calendars from './Calendars'

function ExamSchedule() {
    const examData=[{
        start: "2026-09-15T09:00:00",
        end: "2026-09-15T17:00:00",
        name: "Blockchain Workshop",
        color: "#22c55e",
        desc: "Introduction to Blockchain Technology",
        type: "Exam"
    },
    {
        start: "2026-09-20T10:00:00",
        end: "2026-09-20T14:00:00",
        name: "Mid Semester Exam",
        color: "#ef4444",
        desc: "CSE Mid Semester Examination",
        type: "Exam"
    },
    {
        start: "2026-09-25T23:59:00",
        end: "2026-09-25T23:59:59",
        name: "Assignment Deadline",
        color: "#3b82f6",
        desc: "Submit React LMS Assignment",
        type: "Exam"
    },]
    return (
        <>

            <App></App>
            <BackButton page="dashboard" currentPage="Exam-Schedule"></BackButton>
            <Calendars examData={examData}></Calendars>
        </>
    )
}

export default ExamSchedule