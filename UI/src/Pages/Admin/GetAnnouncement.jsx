import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Hnadlefetechannouncements } from './APIS/Fetechannouncements';
import Announcement from '../../Components/Announcement';

function GetAnnouncement() {
    const [announcements, setannouncements] = useState([]);
    const [filtertypedata, setfiltertypedate] = useState([])
    useEffect(() => {
        try {
            const Fetchannouncements = async () => {
                const response = await Hnadlefetechannouncements()
                setannouncements(response)
                setfiltertypedate(response)
            }
            Fetchannouncements()

        } catch (error) {
            console.log('error', error)

        }
    }, [])
    function handelFilter(type) {
        if (type === 'All') {

            setannouncements(filtertypedata)
            return 
        }

        const FilterbyData = announcements.filter(
            data => data.AnnouncementType === type
        )

        setannouncements(FilterbyData)
    }
    return (

        <>
            <Announcement></Announcement>

            <div className="mt-4">
                <select
                    onChange={(e) => handelFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-400 
               bg-white text-gray-700"
                >
                    {["All", "event", "holiday", "assignment", "festival", "General Notice"].map((itm, idx) => (
                        <option key={idx} value={itm}>
                            {itm}
                        </option>
                    ))}
                </select>
            </div>~
            <table className="w-full bg-white rounded-lg shadow mt-6">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3">Title</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Start Date</th>
                        <th className="p-3">End Date</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Created</th>
                        <th className="p-3">Updated</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {announcements.length <= 0 ? <>

                        <div className="flex justify-center items-center h-full">
                            No Announcements Yet.
                        </div>
                    </> : announcements.length <= 1 ? <>

                        <tr className="border-t">
                            <td className="p-3">{announcements[0]?.Title}</td>
                            <td className="p-3" title={announcements[0]?.TargetAudience == "Both" ? "Students+Teacher" : announcements?.TargetAudience}>{announcements[0]?.TargetAudience}</td>
                            <td className="p-3">{announcements[0]?.StartDate}</td>
                            <td className="p-3">{announcements[0]?.EndDate}</td>

                            <td className="p-3"><span className={`px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded ${announcements[0]?.AnnouncementType == "" ? "bg-green-500" : ""}`}>
                                {announcements[0]?.AnnouncementType}
                            </span></td>
                            <td className="p-3">{announcements.createdAt}</td>
                            <td className="p-3">{announcements.updatedAt}</td>


                            <td className="p-3 flex gap-3">
                                <button className="text-blue-600" onClick={() => alert(`Edit Id ${announcements[0]._id}`)}>Edit</button>
                                <button className="text-red-500" onClick={() => alert(`Delete Id ${announcements[0]._id}`)}>Delete</button>
                            </td>
                        </tr>


                    </>
                        :
                        announcements.map((data, idx) => (
                            <tr className="border-t" key={idx}>
                                <td className="p-3">{data?.Title}</td>
                                <td className="p-3" title={data?.TargetAudience == "Both" ? "Students+Teacher" : `Only ${data?.TargetAudience}`}>{data?.TargetAudience}</td>
                                <td className="p-3">{new Date(data?.StartDate).toLocaleDateString()}</td>
                                <td className="p-3">{new Date(data?.EndDate).toLocaleDateString()}</td>

                                <td className="p-3"><span className={`px-2 py-1 text-xs rounded ${data?.AnnouncementType == "holiday" ? "bg-green-500 text-white font-semibold" : data.AnnouncementType == 'event' ? "bg-blue-100 text-blue-600 " : data?.AnnouncementType == 'assignment' ? "bg-amber-400 text-gray-600" : data?.AnnouncementType == 'festival' ? "bg-indigo-600 text-white" : data?.AnnouncementType == "exam" ? "bg-yellow-950 text-black" : data?.AnnouncementType == 'General Notice' ? "bg-lime-500 text-white" : ""}`}>
                                    {data?.AnnouncementType}
                                </span></td>
                                <td className="p-3">{new Date(data.createdAt).toGMTString() || "Not Added"}</td>
                                <td className="p-3">{new Date(data.updatedAt).toGMTString() || "Not Added"}</td>
                                <td className="p-3 flex gap-3">
                                    <button className="text-blue-600" onClick={() => alert(`Edit Id ${data._id}`)}>Edit</button>
                                    <button className="text-red-500" onClick={() => alert(`Delete Id ${data._id}`)}>Delete</button>
                                </td>
                            </tr>
                        ))

                    }

                </tbody>
            </table>
        </>

    )
}

export default GetAnnouncement

