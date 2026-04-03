import React, { useEffect, useState } from 'react'
import { FaBell, FaUser } from 'react-icons/fa'
import { FetchClassByTecherId } from './TechersApiCall/FectchClassApi'
import Dataloading from '../../Loaders/Dataloading'
import NotFound from '../../Loaders/NotFound'

function UpdateAttandance() {
    const [Update, setupdate] = useState([{ id: 1, name: "tharun", isstatus: true }, { id: 2, name: "tharun", isstatus: false }, { id: 3, name: "tharun", isstatus: true }])
    // const[class,setClassList]=useState([])
    const [Class, setClassList] = useState([])
    const [present, setpresent] = useState()
    const [Absent, setAbsent] = useState()
    const [Byclass, setByclass] = useState('')
    const [type, setype] = useState("Mark")


    useEffect(() => {
        const Fetch_Assignment = async () => {
            try {
                const reonse = await FetchClassByTecherId()
                setClassList(reonse.data.message)


            } catch (error) {
                console.log(error.message)
            }
        }
        Fetch_Assignment()
    }, [])


    useEffect(() => {
        const GetpresentCount = Update.filter((data) => data.isstatus == true)
        const GetAbsentCount = Update.filter((data) => data.isstatus == false)
        console.log(GetpresentCount, 'GetpresentCount')
        setpresent(GetpresentCount.length)
        setAbsent(GetAbsentCount.length)
    }, [present, Absent, Update])

    const handelUpdateStatus = (typeUpdateStaus, id, status) => {
        console.log({ typeUpdateStaus, id, status })
        const newUpdatesStaust = status ? { id: id, name: "tharun1", isstatus: true } : { id: id, name: "tharun2", isstatus: false }
        const newupdate = [...Update,newUpdatesStaust]
        setupdate(newupdate)
    }
    return (



        <>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Mark Attendance
                    </h1>

                    <div className="flex items-center gap-4">
                        <FaBell
                            className="text-xl text-gray-600 cursor-pointer hover:text-blue-500"
                            onClick={() => setShowNotifications(!showNotifications)}
                        />
                        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow">
                            <FaUser className="text-gray-600" />
                            <span className="text-gray-800 text-sm font-medium">
                                Mr. Tharun
                            </span>
                        </div>
                    </div>
                </div>

                {/* DROPDOWN */}
                <div className="bg-white rounded-xl shadow p-4 max-w-md">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                        Choose a Section
                    </label>
                    <select
                        onChange={(e) => setByclass(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select Section --</option>
                        {Class.map((cls, idx) => (
                            <option
                                key={idx}
                                value={`${cls.classId}-${cls.department}-${cls.year}`}
                            >
                                {cls.classId} - {cls.department} - {cls.year}
                            </option>
                        ))}
                    </select>
                </div>



                {/* MARK ALL */}
                <div className="flex gap-6 bg-white p-4 rounded-lg shadow w-fit items-center">

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={() => setHandelAttandance(prev => !prev)}
                        />
                        <span className="text-sm font-medium">Mark All Present</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={() => setHandelAbsentAttandance(prev => !prev)}
                        />
                        <span className="text-sm font-medium">Mark All Absent</span>
                    </label>

                </div>

                {/* TABLE */}
                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <table className="w-full text-sm">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Roll No</th>
                                <th className="p-3 text-left">Student Name</th>
                                <th className="p-3 text-center">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {false ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-6">
                                        <Dataloading path="Loading..." />
                                    </td>
                                </tr>
                            ) : Update.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-10">
                                        <NotFound message="No students data available" />
                                    </td>
                                </tr>
                            ) : (
                                Update.map((student, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{student.id}</td>
                                        <td className="p-3">{student.name}</td>

                                        <td className="text-center">
                                            {student.isstatus ? <button className={`${student.isstatus && "text-green-500"}`} onClick={() => handelUpdateStatus("p", student.id, student.isstatus)}> Present </button> :

                                                <button className={`${!student.isstatus && "text-red-500"}`} onClick={() => handelUpdateStatus("ab")}>

                                                    Absent
                                                </button>}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* FOOTER */}
                    <div className="flex justify-between p-4 text-sm">
                        <span>Total: {Update.length}</span>
                        <span className="text-green-600">Present: {present}</span>
                        <span className="text-red-500">Absent: {Absent}</span>
                    </div>
                </div>


            </div>
        </>

    )
}

export default UpdateAttandance