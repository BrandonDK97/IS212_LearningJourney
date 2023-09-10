import AdminSideBar from "../components/AdminSideBar"
import SearchInput from "../components/SearchInput"
import CourseTableGroup from './CourseTableGroup'
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { AddContext } from './RolePlannerContext'
const AdminEditSkill = () => {
    const params = useParams()
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

    function processEditSkill(skillid) {
        if (add[0].length == 0) {
            console.log('fail') // fail cos no courses at all
        }
        else {
            if(newSkillName.length == 0){
                newSkillName = skillname
            }
            const editedCourses = add[0] // update the skill
            const newSkillCourses = []
            for (let obj of editedCourses) {
                newSkillCourses.push(obj['Course_ID'])
            }
            const skillID = skillid
            const skillName = newSkillName
            console.log(skillName)
            console.log(newSkillCourses)
            console.log(skillID)
            const name_post_body = {
                "Skill_ID": skillID,
                "Skill_name": skillName,
            }
            //Update Name
            const backend_url = "http://localhost:5000"
            fetch(backend_url + "/skill/changeName",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify(name_post_body)
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

            //Update Skill Courses
            const post_body = {
                "skill_id": skillID,
                "new_course_ids": newSkillCourses,
            }
            fetch(backend_url + "/courseskill/edit",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify(post_body)
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
                    window.location.href = "/adminskillpage"
                })
            
        }
    }
    const [add, setAdd] = useState([[], []]) //Default is [Skill's Added Courses, Skill's UnAdded Courses]
    var newSkillName = ''
    var addedCourses = []
    var unaddedCourses = []
    add[0] = addedCourses
    add[1] = unaddedCourses
    if (skillLoading == false && courseLoading == false) {
        var skillid = params.skillid
        var skillname = skillData["data"][skillid]["Skill_name"]
        var skillCourses = skillData["data"][skillid]['Skill_courses']
        for (let key of Object.keys(courseData.data)) {
            if (skillCourses.includes(key)) {
                addedCourses.push(courseData.data[key])
            }
            else {
                unaddedCourses.push(courseData.data[key])
            }
        }
        return (
            <div className="container-full grid grid-cols-5 grid-rows-6 max-h-screen">
                <div className="col-span-1">
                    <AdminSideBar select='Skills' />
                </div>

                <div className='col-start-2 col-end-4 my-auto flex'>
                    <h1 className="text-3xl font-bold text-start ml-12">
                        Job skill - 
                    </h1>
                    <div className="ml-4 font-bold relative">
                        <label className="sr-only"> Role Name </label>
                        <input  defaultValue={skillname} onChange={(e) => newSkillName = e.target.value} type="text" id="skillName" placeholder="Skill Name" className="w-full rounded-md border border-gray-200 shadow-sm sm:text-sm p-3" />
                        <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center text-gray-500">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-outside-1_2_27" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17" fill="black">
                                    <rect fill="white" width="17" height="17" />
                                    <path d="M10.5858 3.41421L3.39171 10.6083C3.19706 10.8029 3.09974 10.9003 3.03276 11.0186C2.96579 11.1368 2.93241 11.2704 2.86564 11.5374L2.20211 14.1915C2.11186 14.5526 2.06673 14.7331 2.16682 14.8332C2.2669 14.9333 2.44742 14.8881 2.80844 14.7979L2.80845 14.7979L5.46257 14.1344C5.72963 14.0676 5.86316 14.0342 5.98145 13.9672C6.09974 13.9003 6.19706 13.8029 6.39171 13.6083L13.5858 6.41421L13.5858 6.41421C14.2525 5.74755 14.5858 5.41421 14.5858 5C14.5858 4.58579 14.2525 4.25245 13.5858 3.58579L13.4142 3.41421C12.7475 2.74755 12.4142 2.41421 12 2.41421C11.5858 2.41421 11.2525 2.74755 10.5858 3.41421Z" />
                                </mask>
                                <path d="M3.39171 10.6083L4.80593 12.0225L4.80593 12.0225L3.39171 10.6083ZM10.5858 3.41421L9.17157 2L9.17157 2L10.5858 3.41421ZM13.4142 3.41421L12 4.82843L12 4.82843L13.4142 3.41421ZM13.5858 3.58579L15 2.17157L15 2.17157L13.5858 3.58579ZM13.5858 6.41421L15 7.82843L13.5858 6.41421ZM6.39171 13.6083L4.9775 12.1941L4.9775 12.1941L6.39171 13.6083ZM2.86564 11.5374L4.80593 12.0225L4.80593 12.0225L2.86564 11.5374ZM2.20211 14.1915L0.261828 13.7065H0.261828L2.20211 14.1915ZM2.80845 14.7979L2.32338 12.8576L2.23624 12.8794L2.15141 12.9089L2.80845 14.7979ZM5.46257 14.1344L4.97751 12.1941L4.9775 12.1941L5.46257 14.1344ZM2.16682 14.8332L3.58103 13.419L3.58103 13.419L2.16682 14.8332ZM2.80844 14.7979L3.29351 16.7382L3.38065 16.7164L3.46549 16.6869L2.80844 14.7979ZM5.98145 13.9672L4.99605 12.2268L4.99605 12.2268L5.98145 13.9672ZM13.5858 6.41421L15 7.82842L15 7.82842L13.5858 6.41421ZM3.03276 11.0186L1.29236 10.0332L1.29236 10.0332L3.03276 11.0186ZM4.80593 12.0225L12 4.82843L9.17157 2L1.9775 9.19407L4.80593 12.0225ZM12 4.82843L12.1716 5L15 2.17157L14.8284 2L12 4.82843ZM12.1716 5L4.9775 12.1941L7.80593 15.0225L15 7.82843L12.1716 5ZM0.925358 11.0524L0.261828 13.7065L4.1424 14.6766L4.80593 12.0225L0.925358 11.0524ZM3.29352 16.7382L5.94764 16.0746L4.9775 12.1941L2.32338 12.8576L3.29352 16.7382ZM0.261828 13.7065C0.233004 13.8218 0.150553 14.1296 0.122586 14.4155C0.0921993 14.7261 0.065091 15.5599 0.752603 16.2474L3.58103 13.419C3.84671 13.6847 3.99914 14.0005 4.06644 14.2928C4.12513 14.5478 4.10965 14.7429 4.10358 14.8049C4.09699 14.8724 4.08792 14.904 4.097 14.8631C4.10537 14.8253 4.11788 14.7747 4.1424 14.6766L0.261828 13.7065ZM2.15141 12.9089L2.1514 12.9089L3.46549 16.6869L3.46549 16.6869L2.15141 12.9089ZM2.32338 12.8576C2.22531 12.8821 2.17467 12.8946 2.13694 12.903C2.09595 12.9121 2.12762 12.903 2.19506 12.8964C2.25712 12.8903 2.45223 12.8749 2.70717 12.9336C2.99955 13.0009 3.31535 13.1533 3.58103 13.419L0.752598 16.2474C1.44011 16.9349 2.27387 16.9078 2.58449 16.8774C2.87039 16.8494 3.17822 16.767 3.29351 16.7382L2.32338 12.8576ZM4.9775 12.1941C4.95279 12.2188 4.9317 12.2399 4.91214 12.2593C4.89271 12.2787 4.87671 12.2945 4.86293 12.308C4.84916 12.3215 4.83911 12.3312 4.83172 12.3382C4.82812 12.3416 4.82545 12.3441 4.8236 12.3458C4.82176 12.3475 4.8209 12.3483 4.82092 12.3482C4.82094 12.3482 4.82198 12.3473 4.82395 12.3456C4.82592 12.3439 4.82893 12.3413 4.83291 12.338C4.84086 12.3314 4.85292 12.3216 4.86866 12.3098C4.88455 12.2979 4.90362 12.2843 4.92564 12.2699C4.94776 12.2553 4.97131 12.2408 4.99605 12.2268L6.96684 15.7076C7.37599 15.476 7.68636 15.1421 7.80593 15.0225L4.9775 12.1941ZM5.94764 16.0746C6.11169 16.0336 6.55771 15.9393 6.96685 15.7076L4.99605 12.2268C5.02079 12.2128 5.0453 12.2001 5.06917 12.1886C5.09292 12.1772 5.11438 12.1678 5.13277 12.1603C5.15098 12.1529 5.16553 12.1475 5.17529 12.1441C5.18017 12.1424 5.18394 12.1412 5.18642 12.1404C5.1889 12.1395 5.19024 12.1391 5.19026 12.1391C5.19028 12.1391 5.18918 12.1395 5.18677 12.1402C5.18435 12.1409 5.18084 12.1419 5.17606 12.1432C5.16625 12.1459 5.15278 12.1496 5.13414 12.1544C5.11548 12.1593 5.09368 12.1649 5.0671 12.1716C5.04034 12.1784 5.0114 12.1856 4.97751 12.1941L5.94764 16.0746ZM12.1716 5C12.3435 5.17192 12.4698 5.29842 12.5738 5.40785C12.6786 5.518 12.7263 5.57518 12.7457 5.60073C12.7644 5.62524 12.7226 5.57638 12.6774 5.46782C12.6254 5.34332 12.5858 5.18102 12.5858 5H16.5858C16.5858 4.17978 16.2282 3.57075 15.9258 3.1744C15.6586 2.82421 15.2934 2.46493 15 2.17157L12.1716 5ZM15 7.82843L15 7.82842L12.1716 4.99999L12.1716 5L15 7.82843ZM15 7.82842C15.2934 7.53507 15.6586 7.17579 15.9258 6.8256C16.2282 6.42925 16.5858 5.82022 16.5858 5H12.5858C12.5858 4.81898 12.6254 4.65668 12.6774 4.53218C12.7226 4.42362 12.7644 4.37476 12.7457 4.39927C12.7263 4.42482 12.6786 4.482 12.5738 4.59215C12.4698 4.70157 12.3435 4.82807 12.1716 5L15 7.82842ZM12 4.82843C12.1719 4.6565 12.2984 4.53019 12.4078 4.42615C12.518 4.32142 12.5752 4.27375 12.6007 4.25426C12.6252 4.23555 12.5764 4.27736 12.4678 4.32264C12.3433 4.37455 12.181 4.41421 12 4.41421V0.414214C11.1798 0.414214 10.5707 0.771767 10.1744 1.07417C9.82421 1.34136 9.46493 1.70664 9.17157 2L12 4.82843ZM14.8284 2C14.5351 1.70665 14.1758 1.34136 13.8256 1.07417C13.4293 0.771767 12.8202 0.414214 12 0.414214V4.41421C11.819 4.41421 11.6567 4.37455 11.5322 4.32264C11.4236 4.27736 11.3748 4.23555 11.3993 4.25426C11.4248 4.27375 11.482 4.32142 11.5922 4.42615C11.7016 4.53019 11.8281 4.6565 12 4.82843L14.8284 2ZM1.9775 9.19407C1.85793 9.31364 1.52401 9.62401 1.29236 10.0332L4.77316 12.0039C4.75915 12.0287 4.7447 12.0522 4.73014 12.0744C4.71565 12.0964 4.70207 12.1155 4.69016 12.1313C4.67837 12.1471 4.66863 12.1591 4.66202 12.1671C4.65871 12.1711 4.65613 12.1741 4.65442 12.1761C4.65271 12.178 4.65178 12.1791 4.65176 12.1791C4.65174 12.1791 4.65252 12.1782 4.65422 12.1764C4.65593 12.1745 4.65842 12.1719 4.66184 12.1683C4.66884 12.1609 4.67852 12.1508 4.692 12.1371C4.7055 12.1233 4.72132 12.1073 4.74066 12.0879C4.76013 12.0683 4.78122 12.0472 4.80593 12.0225L1.9775 9.19407ZM4.80593 12.0225C4.8144 11.9886 4.82164 11.9597 4.82839 11.9329C4.8351 11.9063 4.84068 11.8845 4.84556 11.8659C4.85043 11.8472 4.85407 11.8337 4.8568 11.8239C4.85813 11.8192 4.85914 11.8157 4.85984 11.8132C4.86054 11.8108 4.86088 11.8097 4.86088 11.8097C4.86087 11.8098 4.86046 11.8111 4.85965 11.8136C4.85884 11.8161 4.85758 11.8198 4.85588 11.8247C4.85246 11.8345 4.84713 11.849 4.8397 11.8672C4.8322 11.8856 4.82284 11.9071 4.81141 11.9308C4.79993 11.9547 4.78717 11.9792 4.77316 12.0039L1.29236 10.0332C1.06071 10.4423 0.966371 10.8883 0.925358 11.0524L4.80593 12.0225Z" fill="#33363F" mask="url(#path-1-outside-1_2_27)" />
                                <path d="M9.5 3.5L12.5 1.5L15.5 4.5L13.5 7.5L9.5 3.5Z" fill="#33363F" />
                            </svg>

                        </span>
                    </div>
                </div>

                <div className='col-start-4 col-end-6 col-span-2 my-auto mx-12'>
                    <SearchInput />
                </div>
                <AddContext.Provider value={add}>
                    <CourseTableGroup />
                    <div className='cursor-pointer col-start-4 text-end col-end-6 row-start-6 row-end-6 my-auto overflow-y-auto max-h-screen mx-12'>
                        <a onClick={() => processEditSkill(skillid)}
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
export default AdminEditSkill