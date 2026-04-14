import React, { useEffect, useState } from 'react'
import { FaBell, FaUser } from 'react-icons/fa'
import { FetchClassByTecherId } from './TechersApiCall/FectchClassApi'
import Dataloading from '../../Loaders/Dataloading'
import NotFound from '../../Loaders/NotFound'
import AdminHeader from '../../Components/AdminHeader'
import AddingSoon from '../../Loaders/AddingSoon'
import Loaders from '../../Loaders/Loaders'
import ProgressLoader from '../../../src/Loaders/Progressloader.jsx'

function UpdateAttandance() {
    const [Update, setupdate] = useState([{ id: 1, name: "tharun", isstatus: true }, { id: 2, name: "tharun", isstatus: false }, { id: 3, name: "tharun", isstatus: true }])
    // const[class,setClassList]=useState([])
    const [Class, setClassList] = useState([])
    const [present, setpresent] = useState(0)
    const [Absent, setAbsent] = useState(0)
    const [Byclass, setByclass] = useState('')
    const [type, setype] = useState("Mark")
    const [markAllPresent, setmarkallPresent] = useState(false)
    const [markalAbsent, setmarkalAbsent] = useState(false)
    const [MarkallLength, setMarkallLength] = useState(0)
    const [MarkallAbsentLength, setMarkallAbsentLength] = useState(0)
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



        setpresent(GetpresentCount.length)
        setAbsent(GetAbsentCount.length)

    }, [present, Absent, Update])


    const handelUpdateStatus = (typeUpdateStaus, id, status) => {
        const newUpdatesStaust = status ? { id: id, name: "tharun1", isstatus: true } : { id: id, name: "tharun2", isstatus: false }
        const newupdate = [...Update, newUpdatesStaust]
        setupdate(newupdate)
    }

    const markAllPresnt = () => {
        setmarkallPresent((prev) => !prev)
        const updated = markAllPresent ? Update.map((item) => ({
            ...item,
            isstatus: true,
        })) : 0;
        setMarkallLength(updated.length)

    }
    const markAllAbsent = () => {
        setmarkalAbsent(prev => !prev)
        const updatedAb = markalAbsent ? Update.map((item) => ({
            ...item,
            isstatus: false,
        })) : 0;
        setMarkallAbsentLength(updatedAb.length)
    }
    return (

        <>
            {true && <ProgressLoader />}
            <div className="space-y-6">

                {/* HEADER */}
                <AdminHeader pathname="Update Attendance" ></AdminHeader>


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
                            onClick={markAllPresnt}
                        />
                        <span className="text-sm font-medium">Mark All Present</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            onClick={markAllAbsent}
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
                                            {markAllPresent ? <button className={`${markAllPresent && "text-green-500"}`} > Present </button> : markalAbsent ? <button className={`${!student.isstatus && "text-red-500"}`} onClick={() => handelUpdateStatus("ab")}>

                                                Absent
                                            </button> : student.isstatus ? <button className={`${student.isstatus && "text-green-500"}`} onClick={() => handelUpdateStatus("p", student.id, student.isstatus)}> Present </button> :

                                                <button className={`${!student.isstatus && "text-red-500"}`} onClick={() => handelUpdateStatus("ab")}>

                                                    Absent
                                                </button>}
                                        </td>

                                        { }
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* FOOTER */}
                    <div className="flex justify-between p-4 text-sm">
                        <span>Total: {Update.length}</span>
                        <span className="text-green-600">Present: {markAllPresent ? MarkallLength : present}</span>
                        <span className="text-red-500">Absent: {Absent}</span>
                    </div>
                </div>


            </div>
        </>

    )
}

export default UpdateAttandance