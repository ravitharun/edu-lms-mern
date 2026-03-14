import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Hnadlefetechannouncements } from './APIS/Fetechannouncements';

function GetAnnouncement() {
    const [announcements, setannouncements] = useState([]);

    // console.log(announcements, "announcements")
    useEffect(() => {
        const Fetchannouncements = async () => {

            const response =await  Hnadlefetechannouncements()
            console.log(response,'hey')
            setannouncements(response)

        }
        Fetchannouncements()
    }, [])


    return (
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
                    <tr  className="border-t">
                        <td className="p-3">{announcements[0].Title}</td>
                        <td className="p-3" title={announcements[0].TargetAudience == "Both" ? "Students+Teacher" : announcements.TargetAudience}>{announcements[0].TargetAudience}</td>
                        <td className="p-3">{announcements[0].StartDate}</td>
                        <td className="p-3">{announcements[0].EndDate}</td>

                        <td className="p-3"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                            {announcements[0].AnnouncementType}
                        </span></td>
                        <td className="p-3">Created</td>
                        <td className="p-3">Updated</td>

                        <td className="p-3 flex gap-3">
                            <button className="text-blue-600" onClick={() => alert(`Edit Id ${announcements.id}`)}>Edit</button>
                            <button className="text-red-500" onClick={() => alert(`Delete Id ${announcements.id}`)}>Delete</button>
                        </td>
                    </tr>
                {/* {announcements.map((announcements, index) => (
                ))} */}
            </tbody>
        </table>
    )
}

export default GetAnnouncement