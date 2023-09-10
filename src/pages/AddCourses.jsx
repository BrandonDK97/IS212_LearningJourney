import StaffSideBar from "../components/StaffSideBar"
import SearchInput from "../components/SearchInput"
import React, { useContext, useState, useEffect } from "react";
import StaffCourseRows from "../components/StaffCourseRows"
import { LJCoursesContext } from "../components/RolePlannerContext";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import '../index.css'
const AddCourses = () => {
    let { roleid, skillid } = useParams()
    //Fetch All Skills
    const [skillData, setSkillData] = useState({ 'data': {} });
    const [skillLoading, setSkillLLoading] = useState(true);
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
                setSkillLLoading(false);
            })
    }, [])
    //Fetch All Registration
    const [regData, setRegData] = useState({ 'data': {} });
    const [regLoading, setregLoading] = useState(true);
    const [regError, setregError] = useState(null);
    useEffect(() => {
        const backend_url = "http://localhost:5000"
        fetch(backend_url + "/registration")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setRegData({ 'data': data.data })
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setregError(error);
            })
            .finally(() => {
                setregLoading(false);
            })
    }, [])

    //Fetch All Courses
    const [courseData, setCourseData] = useState({ 'data': {} });
    const [courseLoading, setCourseLoading] = useState(true);
    const [courseError, setCourseError] = useState(null);
    useEffect(() => {
        const backend_url = "http://localhost:5000"
        fetch(backend_url + "/course")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setCourseData({ 'data': data.data })
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setCourseError(error);
            })
            .finally(() => {
                setCourseLoading(false);
            })
    }, [])
    //Update Learning Journey
    function processLJUpdate(journey){
        const toUpdate = []
        for(let course of journey['Courses']){
            if(skillData.data[skillid]['Skill_courses'].includes(course)){
                toUpdate.push(course)
            }
        }        
        for(let [key,value] of Object.entries(coursesAdded)){
            if(value == true && !toUpdate.includes(key)){
                toUpdate.push(key)
            }
            else if(value == false && toUpdate.includes(key)){
                let idx = toUpdate.indexOf(key)
                toUpdate.splice(idx,1)
            }
        }
        if(toUpdate.length == 0){
            console.log('Fail: Number of added courses cannot be empty')
        }
        else{
            const backend_url = "http://localhost:5000"
            const toPut = {
                'LearningJounery_ID':journey['LearningJounery_ID'],
                'new_Course_IDs':toUpdate  
            }
            fetch(backend_url + "/learningjourneyCourses/edit",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify(toPut)
                })
                .then(response => {
                    if (response.ok) {
                        console.log(response.data)
                    }
                    throw response;
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                })
                .finally(() => {
                    window.location.href = "/staffhomepage/"+roleid+"/"+skillid
                })
        }
        
    }
    //Global Courses Variable
    const [coursesAdded, setCoursesAdded] = useState({})
    //Fetch Staff data By ID
    const staffid = JSON.parse(sessionStorage.getItem("user")).data['Staff_ID']
    const [staffData, setStaffData] = useState({ 'data': {} });
    const [staffLoading, setStaffLoading] = useState(true);
    const [staffError, setStaffError] = useState(null);
    useEffect(() => {
        const backend_url = "http://localhost:5000"
        fetch(backend_url + "/staff/" + staffid)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setStaffData({ 'data': data.data })
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setStaffError(error);
            })
            .finally(() => {
                setStaffLoading(false);
            })
    }, [])

    if (skillLoading == false && regLoading == false && courseLoading == false && staffLoading==false) { //once staff data and course data is ready, add their loading here too
        //user's learning journeys
        const userLearningJourneys = staffData.data['Learning_Journeys']
        let journey = null
        for (let obj of userLearningJourneys) {
            if (obj['Job_ID'] == roleid) {
                journey = obj
            }
        }

        return (
            <div className="container-full grid grid-cols-4 grid-rows-6 max-h-screen">
                <div className="col-span-1">
                    <StaffSideBar select='Learning Journey' />
                </div>

                <div className='col-start-2 col-end-4 my-auto'>
                    <h1 className="text-2xl font-medium text-start ml-12">
                        Learning Journey - {journey['Job_name']} - <span className='font-bold'>{skillData.data[skillid]['Skill_name']}</span>
                    </h1>
                    <h1 className="text-xl font-medium text-start ml-12 mt-4 text-gray-500">
                        Add courses to this Learning Journey
                    </h1>
                </div>

                <div className='col-end-5 col-span-1 my-auto mx-12'>
                    <SearchInput />
                </div>
                <div className='col-start-2 col-end-5 row-start-2 row-end-6 border rounded-lg overflow-y-auto max-h-screen mx-12'>
                    <table class="min-w-full divide-y-2 divide-gray-200 text-sm relative">
                        <thead>
                            <tr className='h-16 bg-gray-100 sticky top-0'>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Course Name</th>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Type</th>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Category</th>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Completion Status</th>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Course Status</th>
                                <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900"></th>
                            </tr>
                        </thead>
                        <LJCoursesContext.Provider value = {coursesAdded}>
                            <StaffCourseRows skillData={skillData} courseData={courseData} staffData={staffData} regData={regData} journey={journey} showAdded={false} />
                        </LJCoursesContext.Provider>
                    </table>
                </div>
                <div className={"col-start-4 row-start-6 mr-12 my-auto pl-40"}>
                    <a class="cursor-pointer group flex items-center justify-between rounded-lg border border-gray-600 bg-gray-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring" onClick={()=>processLJUpdate(journey)}>
                        <span class="font-medium text-white transition-colors group-hover:text-gray-600 group-active:text-gray-500">
                            Done
                        </span>
                        <span class="ml-2 flex-shrink-0 rounded-full border border-current bg-white p-2 text-gray-600 group-active:text-gray-500">
                            <svg className="h-4 w-4" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9L5 12L14 1" stroke="currentColor" stroke-width="2" />
                            </svg>

                        </span>
                    </a>
                </div>
            </div>
        )
    }

}

export default AddCourses