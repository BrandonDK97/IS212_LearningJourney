import AdminSideBar from "../components/AdminSideBar"
import AdminRows from "../components/AdminRows"
import NoPermission from "../components/NoPermission"
import SearchInput from "../components/SearchInput"
import { useState, useEffect } from 'react'

const AdminRolePage = () => {
    //Roles with permissions
    const [permissions, setPermissions] = useState(['1', '3'])
    const currStaffRole = JSON.parse(sessionStorage.getItem("user")).data['Role']
    //Fetch Role Data
    const [roleData, setRoleData] = useState({ 'data': {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const backend_url = "http://localhost:5000"
        fetch(backend_url + "/jobs")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setRoleData({ 'data': data.data })
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])
    if (!permissions.includes(currStaffRole)) {
        return (
            <NoPermission />
        )
    }
    else {
        return (
            <div className="container-full grid grid-cols-4 grid-rows-6 max-h-screen">
                <div className="col-span-1">
                    <AdminSideBar select='Job Roles' />
                </div>

                <div className='col-start-2 col-end-3 my-auto'>
                    <h1 className="text-3xl font-bold text-start ml-12">
                        Job Roles
                    </h1>
                </div>
                <div className='col-end-5 my-auto mx-12 text-end'>
                    {/* <div className='col-start-3 col-end-4 my-auto mx-12 text-end'> */}
                    <a
                        class="inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-6 py-3 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500"
                        href="/AdminCreateRole"
                    >
                        <span class="text-sm font-medium"> Create Role </span>

                        <svg
                            class="ml-3 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                </div>
                {/* <div className='col-end-5 col-span-1 my-auto mx-12'>
                <SearchInput />
            </div> */}
                <div className='col-start-2 col-end-5 row-start-2 row-end-6 border rounded-lg overflow-y-auto max-h-screen mx-12'>
                    <table class="min-w-full divide-y-2 divide-gray-200 text-sm relative">
                        <thead>
                            <tr className='h-16 bg-gray-100 sticky top-0'>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Role Name</th>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Edit Role</th>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Delete Role</th>
                            </tr>
                        </thead>
                        <AdminRows data={roleData.data} name='Job_name' id='Job_ID' message='Edit Role' message2='Delete Role' type='job' href='/admineditrole/' />
                    </table>
                </div>
            </div>
        )
    }
}

export default AdminRolePage