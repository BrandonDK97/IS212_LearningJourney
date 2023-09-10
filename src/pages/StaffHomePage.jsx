import StaffSideBar from "../components/StaffSideBar"
import SearchInput from "../components/SearchInput"
import LearningJourneyCards from "../components/LearningJourneyCards"
import React, { useState, useEffect } from "react";
import EmptySlate from "../components/EmptySlate";
const StaffHomePage = () => {
    // console.log(sessionStorage.getItem("uid"))
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
    function checkProgress(skills, completedSkills){
        var completed = 'Completed'
        for(let skillid of skills){
            if(!completedSkills.includes(String(skillid))){
                completed = 'In-Progress'
            }
        }
        return completed
    }
    if (staffLoading == false) {
        //user's learning journeys
        const completedSkills = staffData.data['Completed_Skills']
        var userLearningJourneys = staffData.data['Learning_Journeys']
        const learningJourneyCards = userLearningJourneys.map(function (journey) {
            const roleName = journey['Job_name']
            const skills = journey['Skills']
            const progress = checkProgress(skills, completedSkills)
            const courses = journey['Courses']
            return <LearningJourneyCards title={roleName} subtitle={progress} skills={skills} courses={courses} journey={journey} progress={progress} />
        })
        return (
            <div className="container-full grid grid-cols-4 grid-rows-6 max-h-screen">
                <div className="col-span-1">
                    <StaffSideBar select='Learning Journey' />
                </div>

                <div className='col-start-2 col-end-3 my-auto'>
                    <h1 className="text-3xl font-bold text-start ml-12">
                        My Learning Journeys
                    </h1>
                </div>

                <div className='col-end-5 col-span-1 my-auto mx-12'>
                    <SearchInput />
                </div>
                <div className='col-start-2 col-end-5 row-start-2 row-end-4 rounded-lg overflow-y-auto max-h-screen mx-12 scrollbar-thin scrollbar-thumb-gray-800'>
                    <div className={learningJourneyCards.length > 0 ? 'grid grid-cols-4 gap-6 mx-6' : 'mx-6 px-32 mt-16'}>
                        {learningJourneyCards.length > 0 ? learningJourneyCards : <EmptySlate />}
                    </div>
                </div>
                <div className={learningJourneyCards.length > 0 ? 'col-start-2 col-end-5 row-start-4 row-end-6 rounded-lg overflow-y-auto max-h-screen mx-12 pt-6' : 'hidden'}>
                    <div className="ml-6 mb-3 text-2xl font-medium">
                        Most Recent Journey - <span className='font-bold'>Frontend Engineer</span>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-8'>
                        <a class="relative block rounded-xl border border-gray-100 p-8 shadow-lg hover:bg-gray-100" href="">
                            <div class="mt-4 text-gray-500 sm:pr-8">
                                <p class="mt-2 hidden text-md sm:block">
                                    Completed Courses
                                </p>
                                <h5 class="mt-4 text-xl font-bold text-gray-900">15</h5>
                            </div>
                        </a>

                        <a class="relative block rounded-xl border border-gray-100 p-8 shadow-lg hover:bg-gray-100" href="">
                            <div class="mt-4 text-gray-500 sm:pr-8">
                                <p class="mt-2 hidden text-md sm:block">
                                    Ongoing Courses
                                </p>
                                <h5 class="mt-4 text-xl font-bold text-gray-900">15</h5>
                            </div>
                        </a>

                        <a class="relative block rounded-xl border border-gray-100 p-8 shadow-lg hover:bg-gray-100" href="">
                            <div class="mt-4 text-gray-500 sm:pr-8">
                                <p class="mt-2 hidden text-md sm:block">
                                    Uncompleted Courses
                                </p>
                                <h5 class="mt-4 text-xl font-bold text-gray-900">15</h5>
                            </div>
                        </a>
                    </div>
                </div>
                <div className={learningJourneyCards.length > 0 ? "col-start-4 row-start-6 mr-12 my-auto" : 'hidden'}>
                    <a class="group flex items-center justify-between rounded-lg border border-gray-600 bg-gray-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring" href="/staffrolepage">
                        <span class="font-medium text-white transition-colors group-hover:text-gray-600 group-active:text-gray-500">
                            Create Learning Journey
                        </span>
                        <span class="ml-2 flex-shrink-0 rounded-full border border-current bg-white p-2 text-gray-600 group-active:text-gray-500">
                            <svg width="14" height="14" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 2.33333L17 31.6667" stroke="currentColor" stroke-width="6" stroke-linecap="square" stroke-linejoin="round" />
                                <path d="M31.6666 17L2.33329 17" stroke="currentColor" stroke-width="6" stroke-linecap="square" stroke-linejoin="round" />
                            </svg>

                        </span>
                    </a>
                </div>
            </div>
        )
    }
}

export default StaffHomePage