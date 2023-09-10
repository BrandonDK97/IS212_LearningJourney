import React from 'react';
import '../index.css'

export default function SkillCard(props) {
    const name = props.name
    const numCourses = props.numCourses
    const skillid = props.skillid
    const roleid = props.roleid
    const completed = props.completed
    return (

        <a href={roleid + "/" + skillid} class="group relative flex h-40 items-end rounded-3xl border-4 border-black bg-white transition hover:bg-yellow-50 mt-4">
            <span class="absolute inset-0 -z-10 -translate-x-2 -translate-y-2 rounded-3xl bg-white ring-4 ring-black">
            </span>
            <span class="absolute inset-0 -z-20 -translate-x-4 -translate-y-4 rounded-3xl bg-white ring-4 ring-black">
            </span>

            <div class="p-8 lg:group-hover:absolute lg:group-hover:opacity-0">
                <div className='inline-flex'>
                    <p class="text-lg font-bold">
                        {name}
                    </p>
                    <svg className={completed ? 'my-auto ml-2 fill-green-300' : 'hidden'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="#33363F" stroke-width="2" />
                        <path d="M6 10L9 13L14 7" stroke="#33363F" stroke-width="2" />
                    </svg>
                    <svg className={!completed ? 'my-auto ml-2 fill-amber-200' : 'hidden'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="#33363F" stroke-width="2" />
                        <path d="M14.5 10H10.25C10.1119 10 10 9.88807 10 9.75V6.5" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                    </svg>


                </div>
                <p class="mt-1 font-mono text-sm">{numCourses} Courses</p>
            </div>

            <div class="absolute p-8 opacity-0 lg:group-hover:relative lg:group-hover:opacity-100">
                <div className='inline-flex'>
                    <p class="text-lg font-bold">
                        {name}
                    </p>
                    <svg className={completed ? 'my-auto ml-2 fill-green-300' : 'hidden'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="#33363F" stroke-width="2" />
                        <path d="M6 10L9 13L14 7" stroke="#33363F" stroke-width="2" />
                    </svg>
                    <svg className={!completed ? 'my-auto ml-2 fill-amber-200' : 'hidden'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="#33363F" stroke-width="2" />
                        <path d="M14.5 10H10.25C10.1119 10 10 9.88807 10 9.75V6.5" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
                <p class="mt-1 text-sm">
                    {completed ? 'Completed' : 'Not Completed'}
                </p>
            </div>
        </a>
    )
}