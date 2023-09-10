import React, { useEffect, useState } from 'react';
import '../index.css'

export default function StaffRoleRows() {
    // Fetch All Roles
    const [roleData, setRoleData] = useState({'data':{}});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const backend_url = "http://localhost:5000"
        fetch(backend_url+"/jobs")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setRoleData({'data':data.data}) 
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);    
            })
    }, [])

   
    const staffData = JSON.parse(sessionStorage.getItem("user"));
    const rows = Object.values(roleData.data).map(function (item, index) {
        return <tr className="hover:bg-gray-200">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">{item['Job_name']}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{item['Job_skills'].length}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{item['Job_courses'].length}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                <a className="inline-flex items-center rounded-2xl border border-indigo-600 bg-indigo-600 px-2 py-1 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    href={"/roleplanner/" + staffData.data['Staff_ID'] + "/" + item['Job_ID']}>
                    <span className="text-xs font-medium"> Plan For Role </span>
                    <svg
                        className="ml-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </a>
            </td>
        </tr>

    })
    return (
        <tbody className="divide-y divide-gray-200">
            {rows}
        </tbody>

    )
}