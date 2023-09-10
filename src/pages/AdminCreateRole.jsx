import React, { useEffect } from 'react';
import '../index.css'
import AdminSideBar from '../components/AdminSideBar'
import SearchInput from '../components/SearchInput'
import NoPermission from '../components/NoPermission';
import { AddedContext } from '../components/RolePlannerContext'
import { useState } from 'react'
import { findAllByDisplayValue } from '@testing-library/react';
import TableGroup from '../components/TableGroup';
export default function AdminCreateRole() {
    //Roles with permissions
    const [permissions, setPermissions] = useState(['1','3'])
    const currStaffRole = JSON.parse(sessionStorage.getItem("user")).data['Role']
    //Fetch Skill Data
    const [skillData, setSkillData] = useState({ 'data': {} });
    const [skillLoading, setSkillLoading] = useState(true);
    const [skillError, setSkillError] = useState(null);
    useEffect(() => {
        const backend_url = "http://localhost:5000"
        fetch(backend_url + "/skills")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setSkillData({ 'data': data.data })
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setSkillError(error);
            })
            .finally(() => {

                setSkillLoading(false);
            })
    }, [])

    function processCreateRole() {
        if (added[0].length == 0 || roleName.length == 0) {
            console.log('fail') //fail cos no skills at all
        }
        else {
            const jobName = roleName
            const editedSkills = added[0] //update the role
            const newJobSkills = []
            for (let obj of editedSkills) {
                newJobSkills.push(parseInt(obj['Skill_ID']))
            }
            const post_body = {
                "Job_name": jobName,
                "Job_skills": newJobSkills,
            }
            const backend_url = "http://localhost:5000"
            fetch(backend_url + "/jobs/create",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(post_body)
                })
                .then(response => {
                    if (response.ok) {
                        console.log(response.data)
                        window.location.href = "/adminrolepage"
                    }
                    throw response;
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                })
        }
    }


    
    const [added, setAdded] = useState([[], []]) //Default is [Empty Array, All Skills]\

    var roleName = ''
    var addedSkills = []
    var unaddedSkills = []
    added[0] = addedSkills
    added[1] = unaddedSkills

    if(!permissions.includes(currStaffRole)){
        return(
            <NoPermission/>
        )
    }

    if (skillLoading == false) {
        for (let key of Object.keys(skillData.data)) {
            unaddedSkills.push(skillData.data[key])
        }
        return (
            <div className="container-full grid grid-cols-5 grid-rows-6 max-h-screen">
                <div className="col-span-1">
                    <AdminSideBar select='Job Roles' />
                </div>

                <div className='col-start-2 col-end-4 my-auto flex'>
                    <h1 className="text-3xl font-bold text-start ml-12">
                        Create a Role -
                    </h1>
                        <div className="ml-4">
                            <label className="sr-only"> Role Name </label>
                            <input onChange={(e) => roleName = e.target.value} type="text" id="roleName" placeholder="Role Name" className="w-full rounded-md border border-gray-200 shadow-sm sm:text-sm p-3" />
                        </div>
                </div>
                <div className='col-start-4 col-end-6 col-span-2 my-auto mx-12'>
                    <SearchInput />
                </div>
                <AddedContext.Provider value={added}>
                    <TableGroup />
                </AddedContext.Provider>
                <div className='col-start-4 text-end col-end-6 row-start-6 row-end-6 my-auto overflow-y-auto max-h-screen mx-12'>
                    <a onClick={() => processCreateRole()}
                        className="inline-block rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        href="#">
                        Create Role
                    </a>
                </div>
            </div >

        )
    }
}