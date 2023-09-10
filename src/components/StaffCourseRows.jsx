import React, { useState, createContext, useCallback, useContext } from 'react';
import '../index.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import CourseDescriptionModal from './CourseDescriptionModal';
import { LJCoursesContext } from './RolePlannerContext';
export const CourseModalContext = createContext({ opened: false, name: '', desc: '' })
export default function StaffCourseRows(props) {
    const [modal, setModal] = useState({ opened: false, name: '', desc: '' })
    const skillData = props.skillData
    const courseData = props.courseData
    const staffData = props.staffData
    const regData = props.regData
    const { roleid, skillid } = useParams()
    const journey = props.journey
    const showAdded = props.showAdded
    function showDesc(courseName, courseDesc) {
        setModal({ opened: true, name: courseName, desc: courseDesc })
    }
    function completionStatus(courseid) {
        for (let obj of regData.data) {
            if (obj['Course_ID'] == courseid) {
                return [obj['Completion_Status'], obj['Reg_Status']]
            }
            else {
                return ['Not Completed', 'Not Registered']
            }
        }
    }
    const LearningJourneyCourses = journey['Courses']
    function checkIfCourseInLearningJourney(courseid) {
        if (LearningJourneyCourses.includes(courseid)) {
            if (!buttonState[courseid]) {
                buttonState[courseid] = true   
            }
            else {
                buttonState[courseid] = false
            }
            return true
        }
        return false
    }
    const [buttonState, setButtonState] = useState({})
    function addToJourney(courseid) {
        if (buttonState[courseid] == true) {
            buttonState[courseid] = false
            coursesAdded[courseid] = false
        }
        else {
            buttonState[courseid] = true
            coursesAdded[courseid] = true
        }
        forceUpdate()
    }
    const [buttonName, setButtonName] = useState({})
    function handleHover(courseid) {
        buttonName[courseid] = 'Remove'
        forceUpdate()
    }
    function handleHoverOut(courseid) {
        buttonName[courseid] = 'Added'
        forceUpdate()
    }
    //Use Global Courses Variable
    const coursesAdded = useContext(LJCoursesContext)
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    if (showAdded) {
        const rows = Object.keys(courseData.data).map(function (key, index) {
            const statuses = completionStatus(key) //[completion status, reg status]
            const inJourney = checkIfCourseInLearningJourney(key)
            if (skillData.data[skillid]['Skill_courses'].includes(key) && inJourney) {
                return <tr className="hover:bg-gray-200 cursor-pointer h-16" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>{courseData.data[key]['Course_Name']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{courseData.data[key]['Course_Type']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{courseData.data[key]['Course_Category']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{statuses[0]}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>{courseData.data[key]['Course_Status']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {statuses[1].toLowerCase() == 'registered' ?
                            <a className="inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-2 py-1 text-white"
                                disabled>
                                <span className="text-xs font-medium"> Registered </span>
                            </a> :
                            <a className="inline-flex items-center rounded-2xl border border-indigo-600 bg-indigo-600 px-2 py-1 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                href={"/courseRegistration/" + key}>
                                <span className="text-xs font-medium"> Register </span>
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
                            </a>}

                    </td>
                </tr>
            }
            else {
                return
            }
        })
        return (
            <tbody className="divide-y divide-gray-200">
                <CourseModalContext.Provider value={{ modal, setModal }}>
                    <CourseDescriptionModal opened={modal.opened} />
                    {rows}
                </CourseModalContext.Provider>
            </tbody>
        )
    }
    //Show Courses that are NOT added and Added
    else {
        const rows = Object.keys(courseData.data).map(function (key, index) {
            const statuses = completionStatus(key) //[completion status, reg status]
            const inJourney = checkIfCourseInLearningJourney(key)
            if (skillData.data[skillid]['Skill_courses'].includes(key)) {
                return <tr className="hover:bg-gray-200 cursor-pointer h-16">
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>{courseData.data[key]['Course_Name']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>{courseData.data[key]['Course_Type']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>{courseData.data[key]['Course_Category']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>{statuses[0]}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center" onClick={() => showDesc(courseData.data[key]['Course_Name'], courseData.data[key]['Course_Desc'])}>{courseData.data[key]['Course_Status']}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {
                            buttonState[key] || buttonState[key] == true ?
                                <a onMouseOver={() => handleHover(key)} onMouseLeave={() => handleHoverOut(key)} className="w-32 justify-center inline-flex items-center rounded-2xl border border-indigo-600 bg-indigo-600 px-2 py-1 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                    onClick={() => addToJourney(key)}>
                                    <span className="text-xs font-medium my-auto"> {!buttonName[key] ? 'Added' : buttonName[key]} </span>
                                    {!buttonName[key] || buttonName[key] == 'Added' ? <svg className="ml-2 h-3 w-3" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 9L5 12L14 1" stroke="currentColor" strokeWidth="2" />
                                    </svg> : <svg className="ml-2 h-2 w-2" width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                        <path d="M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                    </svg>

                                    }


                                </a>

                                :
                                <a className="w-32 justify-center inline-flex items-center rounded-2xl border border-indigo-600 bg-indigo-600 px-2 py-1 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                    onClick={() => addToJourney(key)}>
                                    <span className="text-xs font-medium"> Add to Journey </span>
                                    <svg className="ml-2 h-5 w-5" width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2" />
                                        <path d="M10 13L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="square" />
                                        <path d="M13 10L7 10" stroke="currentColor" stroke-width="2" stroke-linecap="square" />
                                    </svg>
                                </a>
                        }


                    </td>
                </tr>
            }
            else {
                return
            }
        })
        return (
            <tbody className="divide-y divide-gray-200">
                <CourseModalContext.Provider value={{ modal, setModal }}>
                    <CourseDescriptionModal opened={modal.opened} />
                    {rows}
                </CourseModalContext.Provider>
            </tbody>


        )
    }




}