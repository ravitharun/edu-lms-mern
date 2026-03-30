import React from 'react'
import Announcement from '../../Components/Announcement'
import Calendars from './Calendars'
import App from '../../App'
import BackButton from '../../Components/BackButton'
import { MaintanceMode } from '../../Apis/Islogin'
import Undermanitance from '../../Loaders/Undermanitance'

function AcademiCalendar() {
    return (

<>
            <App />
            <BackButton page="dashboard" currentPage="AcademiCalendar"></BackButton>
            <Calendars></Calendars>
        </>
    )
}

export default AcademiCalendar