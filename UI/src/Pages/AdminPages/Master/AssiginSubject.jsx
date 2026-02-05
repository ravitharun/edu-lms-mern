import React, { useEffect, useState } from 'react'
import MasterAdminNavbar from './MasterAdminNavbar'
import MasterLogoNav from './MasterLogoNav'
import { fetchAllSubjects } from './APIS/GetAll-subjects'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import Loaders from '../../../Loaders/Loaders'
import Dataloading from '../../../Loaders/Dataloading'

function AssiginSubject() {
    const [getAllData, setallData] = useState([])
    const [Search, setsearch] = useState('')
    const [loder, setloader] = useState(false)
    const [originalData, setOriginalData] = useState([]);
    const [poupForm, setpoupForm] = useState(false);

    useEffect(() => {
        const get = async () => {
            try {
                setloader(true)
                const rsdata = await fetchAllSubjects()
                // console.log(data)
                setallData(rsdata.data?.message)
                setOriginalData(rsdata.data?.message);
                setloader(false)
            } catch (err) {
                console.log(err.message)
            }

        }
        get()
    }, [])

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setsearch(search);
        if (!search) {
            setallData(originalData);
            return;
        }
        const filtered = originalData.filter(subj =>
            subj.subject?.toLowerCase().includes(search) ||
            subj.courseId?.toLowerCase().includes(search) ||
            subj.department?.toLowerCase().includes(search) ||
            subj.year?.toString().includes(search)
        );

        setallData(filtered);
    };


    const HandelClear = () => {
        setsearch("")
        setallData(originalData)
    }
    return (
        <>
            <div className="min-h-screen flex bg-gray-50">
                {/* Sidebar */}
                <MasterAdminNavbar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 w-full">
                    {/* Navbar */}
                    <MasterLogoNav path="Manage Subjects" />

                    {/* Scrollable Content */}
                    <main className="flex-1 pt-16 md:ml- pb-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
                        <div className="max-w-7xl mx-auto mt-10 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Manage Subjects
                                <hr className="mt-3 h-1 w-24 border-0 rounded-full bg-blue-500" />
                            </h2>

                            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md shadow-sm transition" onClick={() => setpoupForm((prev) => !prev)} >
                                <FaPlus className="text-xs" />
                                {!poupForm ? 'Add' : 'close'}
                            </button>
                        </div>
                        <div className="mt-10 mb-10 flex justify-center">
                            <div className="flex items-center gap-2 w-full max-w-md bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">

                                {/* Search Icon */}
                                <FaSearch className="text-gray-400" />

                                {/* Input */}
                                <input
                                    type="text"
                                    placeholder="Search subjects..."
                                    onChange={(e) => handleSearch(e)}
                                    value={Search}
                                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                                />

                                {/* Clear Button */}
                                {Search && <button className="text-gray-400 hover:text-red-500 transition" onClick={HandelClear}>
                                    <FaTimes />
                                </button>}

                            </div>
                        </div>
                        {poupForm &&
                            <>
                                Open form
                                <div>
                                    <input type="text" />
                                    <input type="text" />
                                    <button onClick={() => setpoupForm(false)}>close</button>
                                </div>
                            </>
                        }
                        {/* table */}
                        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                            <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">

                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                                        <th className="px-6 py-4 text-left">Course ID</th>
                                        <th className="px-6 py-4 text-left">Department</th>
                                        <th className="px-6 py-4 text-center">Subject</th>
                                        <th className="px-6 py-4 text-center">Year</th>
                                    </tr>
                                </thead>


                                {loder ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan={4} className="py-16">
                                                <div className="flex items-center justify-center">
                                                    <Dataloading />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : getAllData.length == 0 ?
                                    <tbody>
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="py-16 text-center text-gray-500 font-medium"
                                            >
                                                No data
                                            </td>
                                        </tr>
                                    </tbody>

                                    :
                                    <tbody className="divide-y divide-gray-200 text-sm">
                                        {getAllData.map((data, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 text-left">{data.courseId}</td>
                                                <td className="px-6 py-4 text-left">{data.department}</td>
                                                <td className="px-6 py-4 text-center">{data.subject}</td>
                                                <td className="px-6 py-4 text-center">{data.year}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                }
                            </table>
                        </div>


                    </main>
                </div>
            </div>
        </>
    )
}

export default AssiginSubject