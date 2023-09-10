import StaffSideBar from "../components/StaffSideBar"
import DeleteLearningJourneyModal from '../components/DeleteLearningJourneyModal'
import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import SkillCard from '../components/SkillCard'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import '../index.css'
export const DeleteLJModalContext = createContext({ opened: false, name: '', desc: '', journeyid:''})
const LearningJourneySkills = () => {
    let { roleid } = useParams()
    //Fetch All Skills
    const [modal, setModal] = useState({ opened: false, name: '', desc: '', journeyid:''})
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
    
    function showDesc(id, name) {
        setModal({ opened: true, name: 'Delete Learning Journey - '+ name, desc: 'Are you sure you want to delete this Journey?', journeyid:id})
    }
    if (skillLoading == false && staffLoading == false) { //Once staff data integrated, add staffloading here too
        //user's learning journeys
        const userLearningJourneys = staffData.data['Learning_Journeys']
        let journey = null
        for (let obj of userLearningJourneys) {
            if (obj['Job_ID'] == roleid) {
                journey = obj
            }
        }
        const skillCards = journey['Skills'].map(function (skillid) {
            if (staffData.data['Completed_Skills'].includes(String(skillid))) {
                return <SkillCard name={skillData.data[skillid]['Skill_name']} numCourses={skillData.data[skillid]['Skill_courses'].length} skillid={skillid} roleid={journey['Job_ID']} completed={true} />
            }
            else {
                return <SkillCard name={skillData.data[skillid]['Skill_name']} numCourses={skillData.data[skillid]['Skill_courses'].length} skillid={skillid} roleid={journey['Job_ID']} completed={false} />
            }
        })

        return (
            <div className="container-full grid grid-cols-4 grid-rows-6 max-h-screen">
                <div className="col-span-1">
                    <StaffSideBar select='Learning Journey' />
                </div>

                <div className='col-start-2 col-end-4 my-auto'>
                    <h1 className="text-3xl font-medium text-start ml-12">
                        Learning Journey - <span className='font-bold'>{journey['Job_name']}</span>
                    </h1>
                </div>

                <div className='col-end-5 col-span-1 my-auto text-end mr-16'>
                    <a onClick={() => showDesc(journey['LearningJounery_ID'], journey['Job_name'])} class="cursor-pointer group relative inline-flex items-center overflow-hidden rounded-full bg-red-500 px-8 py-3 text-white focus:outline-none focus:ring active:bg-red-600">
                        <span class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 15L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M14 15L14 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>

                        </span>

                        <span class="text-sm font-medium transition-all group-hover:ml-4">
                            Delete Learning Journey
                        </span>
                    </a>
                </div>
                <div className='col-start-2 col-end-5 row-start-2 row-end-6 rounded-lg overflow-y-auto max-h-screen mx-12'>
                    <h1 className='font-bold text-2xl sticky top-0 w-full text-center bg-white'>{journey['Skills'].length} Skills Required</h1>
                    <div className='grid grid-cols-4 p-6 gap-6'>
                        {skillCards}
                    </div>
                </div>
                <DeleteLJModalContext.Provider value={{ modal, setModal }}>
                    <DeleteLearningJourneyModal opened={modal.opened} />
                </DeleteLJModalContext.Provider>
            </div>
            
        )
    }

}

export default LearningJourneySkills