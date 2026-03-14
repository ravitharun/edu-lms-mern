import React from 'react'

function GetAnnouncement() {
    const announcements = [
        {
            id: 1,
            title: "Mid Semester Exam Schedule",
            type: "exam",
            role: "Students",
            startDate: "2026-03-20",
            endDate: "2026-03-30"
        },
        {
            id: 2,
            title: "Holi Festival Holiday",
            type: "festival",
            role: "Both",
            startDate: "2026-03-25",
            endDate: "2026-03-25"
        },
        {
            id: 3,
            title: "Holi Festival Holiday",
            type: "festival",
            role: "Both",
            startDate: "2026-03-25",
            endDate: "2026-03-25"
        }
    ];
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
                {announcements.map((item, index) => (
                    <tr key={index} className="border-t">
                        <td className="p-3">{item.title}</td>
                        <td className="p-3" title={item.role == "Both" ? "Students+Teacher" : item.role}>{item.role}</td>
                        <td className="p-3">{item.startDate}</td>
                        <td className="p-3">{item.endDate}</td>

                        <td className="p-3"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                            {item.type}
                        </span></td>
                        <td className="p-3">Created</td>
                        <td className="p-3">Updated</td>

                        <td className="p-3 flex gap-3">
                            <button className="text-blue-600" onClick={()=>alert(`Edit Id ${item.id}`)}>Edit</button>
                            <button className="text-red-500" onClick={()=>alert(`Delete Id ${item.id}`)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default GetAnnouncement