import React from 'react';
import '../index.css'
import SideBarButton from "./SideBarButton"

export default function StaffSideBar(props) {
    return (
        <div className="flex h-screen flex-col justify-between border-r bg-white">
            <div className="px-4 py-6">
                <h1 className='text-2xl font-bold'>
                    Learning Journey Planner
                </h1>
                <nav className="mt-6 flex flex-col space-y-1">
                    <SideBarButton name='Learning Journey' selected={props.select} href='/staffhomepage' />
                    <SideBarButton name='Job Roles' selected={props.select} href='/staffrolepage' />
                    <SideBarButton name='My Skills' selected={props.select} href='/staffskillpage' />
                    <SideBarButton name='Courses' selected={props.select} href='/staffcourses' />
                    <SideBarButton name='Analytics' selected={props.select} href='/staffanalytics' />
                    <details className="group">
                        <summary className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> </svg>

                            <span className="ml-3 text-sm font-medium"> Account </span>

                            <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </summary>

                        <nav className="mt-1.5 ml-8 flex flex-col">
                            <a href="/staffsettings" className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="ml-3 text-sm font-medium"> Settings </span>
                            </a>

                            <a href="/stafflogout" className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="ml-3 text-sm font-medium"> Log Out </span>
                            </a>
                        </nav>
                    </details>
                </nav>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="/staffprofile" className="flex shrink-0 items-center bg-white p-4 hover:bg-gray-50">
                    <img
                        alt="Man"
                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div className="ml-1.5">
                        <p className="text-xs">
                            <strong className="block font-medium">Eric Frusciante</strong>

                            <span> eric@frusciante.com </span>
                        </p>
                    </div>
                </a>
            </div>
        </div>

    )
}


