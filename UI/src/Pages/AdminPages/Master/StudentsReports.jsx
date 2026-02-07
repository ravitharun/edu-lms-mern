import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import { MdOutlineFileDownload } from "react-icons/md";
import { CSVLink } from "react-csv";
import DownloadReports from "./DownloadReports";

function StudentsReports() {
    const data = [
        { name: "CSE", students: 120, color: "#0D1A63" },
        { name: "ECE", students: 90, color: "#1A2CA3" },
        { name: "MECH", students: 60, color: "#576A8F" },
        { name: "CIVIL", students: 60, color: "#FF5B5B" },
        { name: "EEE", students: 20, color: "#362F4F" },
        { name: "AERO", students: 50, color: "#511D43" },
    ];
    const yer = new Date
    return (
        <>
            <div className="mt-10">
                <DownloadReports data={data} fileName={`students-report-${yer.getFullYear()}`} buttonName={'Students'}/>
            </div>


            <div className="w-full p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Chart Card 1 */}
                    <div className="bg-white rounded-xl shadow-sm border p-4 w-full">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Students by Department
                        </h3>

                        <div className="h-[220px] overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                        <LabelList
                                            dataKey="students" position="top"
                                        // position="insideStart"
                                        // formatter={(value, entry) => `${entry.name}: ${value}`}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart Card 2 */}
                    <div className="bg-white rounded-xl shadow-sm border p-4 w-full">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Enrollment Overview
                        </h3>

                        <div className="h-[220px] overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                        <LabelList
                                            dataKey="students" position="top"
                                        // position="right"
                                        // formatter={(value, entry) => `${entry.name}: ${value}`}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart Card 3 */}
                    <div className="bg-white rounded-xl shadow-sm border p-4 w-full">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Department Strength
                        </h3>

                        <div className="h-[220px] overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                        <LabelList
                                            dataKey="students" position="top"

                                        // formatter={(value, entry) => `${entry.name}: ${value}`}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart Card 4 */}
                    <div className="bg-white rounded-xl shadow-sm border p-4 w-full">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Performance Snapshot
                        </h3>

                        <div className="h-[220px] overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                        <LabelList
                                            dataKey="students"
                                            position="top"
                                        // formatter={(value, entry) => `${entry.name}: ${value}`}
                                        />
                                    </Bar>

                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>


        </>

    );
}

export default StudentsReports;
