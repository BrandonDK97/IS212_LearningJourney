import React, { createContext, useContext } from 'react';
import '../index.css'
export default function LearningJourneyCards(props) {
    const journeyObj = props.journey
    const title = props.title;
    const subtitle = props.subtitle;
    const skills = props.skills;
    const courses = props.courses;
    const progress = props.progress;
    return (
        <a class="relative rounded-xl border-4 border-gray-800 hover:bg-gray-100 py-10 min-w-fit mb-6 w-full" href={"staffhomepage/" + journeyObj['Job_ID']}>
            <div class="mt-4 text-gray-500 text-center">
                {progress == 'Completed' ? 
                    <svg className='mx-auto' width="64" height="56" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.41667 38.1667L20.9831 49.8415C21.4118 50.163 22.0177 50.0895 22.3571 49.6747L58.5 5.5" stroke="#33363F" stroke-width="10" stroke-linecap="round" />
                    </svg> 
                    : 
                    <svg className='mx-auto' width="64" height="56" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="38" cy="38" r="35.1667" stroke="#33363F" stroke-width="6" />
                        <path d="M56.375 38H38.25C38.1119 38 38 37.8881 38 37.75V23.7084" stroke="#33363F" stroke-width="5" stroke-linecap="round" />
                    </svg>
                }
                <h5 class="mt-4 text-xl font-bold text-gray-900">{title}</h5>
                <p class="mt-2 hidden text-sm sm:block">
                    {subtitle}
                </p>
            </div>
        </a>
    )
}
