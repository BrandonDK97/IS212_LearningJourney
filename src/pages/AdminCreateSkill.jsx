import AdminSideBar from "../components/AdminSideBar"
import SearchInput from "../components/SearchInput"
import CourseTableGroup from '../components/CourseTableGroup'
import NoPermission  from "../components/NoPermission"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { AddContext } from '../components/RolePlannerContext'
const AdminCreateSkill = () => {
    //Roles with permissions
    const [permissions, setPermissions] = useState(['1','3'])
    const currStaffRole = JSON.parse(sessionStorage.getItem("user")).data['Role']

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

    function processCreateSkill() {
        if (add[0].length == 0 || skillName.length == 0) {
            console.log('fail') // fail cos no courses at all
        }
        else {
            const editedCourses = add[0] // update the skill
            const newSkillCourses = []
            for (let obj of editedCourses) {
                newSkillCourses.push(obj['Course_ID'])
            }
            console.log(newSkillCourses)
            console.log(skillName)
            const post_body = {
                "Skill_name": skillName,
                "Skill_courses": newSkillCourses,
            }
            const backend_url = "http://localhost:5000"
            fetch(backend_url + "/skill/create",
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
                        window.location.href = "/adminskillpage"
                    }
                    throw response;
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                })
        }
    }
    
    const [add, setAdd] = useState([[], []]) //Default is [Skill's Added Courses, Skill's UnAdded Courses]
    var skillName = ''
    var addedCourses = []
    var unaddedCourses = []
    add[0] = addedCourses
    add[1] = unaddedCourses
    if(!permissions.includes(currStaffRole)){
        return(
            <NoPermission/>
        )
    }
    else if (courseLoading == false) {
        for (let key of Object.keys(courseData.data)) {
            unaddedCourses.push(courseData.data[key])
        }
        return (
            <div className="container-full grid grid-cols-5 grid-rows-6 max-h-screen">
                <div className="col-span-1">
                    <AdminSideBar select='Skills' />
                </div>

                <div className='col-start-2 col-end-4 my-auto flex'>
                <h1 className="text-3xl font-bold text-start ml-12">
                        Create a Skill -
                    </h1> 
                        <div className="ml-4">
                            <label className="sr-only"> Skill Name </label>
                            <input onChange={(e) => skillName = e.target.value} type="text" id="skillname" placeholder="Skill Name" className="w-full rounded-md border border-gray-200 shadow-sm sm:text-sm p-3" />
                        </div>
                </div>

                <div className='col-start-4 col-end-6 col-span-2 my-auto mx-12'>
                    <SearchInput />
                </div>
                <AddContext.Provider value={add}>
                    <CourseTableGroup />
                    <div className='cursor-pointer col-start-4 text-end col-end-6 row-start-6 row-end-6 my-auto overflow-y-auto max-h-screen mx-12'>
                        <a onClick={() => processCreateSkill()}
                            class="inline-block rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        >
                            Save
                        </a>
                    </div>
                </AddContext.Provider>
            </div>
        )
    }
}
export default AdminCreateSkill