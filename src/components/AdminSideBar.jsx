import React from 'react';
import '../index.css'
import SideBarButton from "./SideBarButton"

const AdminSideBar = (props) => {
    return (
        <div className="flex h-screen flex-col justify-between border-r bg-white">
            <div className="px-4 py-6">
                <h1 className='text-2xl font-bold'>
                    LJPS Admin Dashboard
                </h1>
                <nav className="mt-6 flex flex-col space-y-1">
                    <SideBarButton name='Job Roles' selected={props.select} href='/adminrolepage' />
                    <SideBarButton name='Skills' selected={props.select} href='/adminskillpage' />
                    <SideBarButton name='Courses' selected={props.select} href='/admincoursepage' />
                </nav>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="/staffprofile" className="flex shrink-0 items-center bg-white p-4 hover:bg-gray-50">
                    <img
                        alt="Man"
                        // src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        src ={require("../images/geraldleejieren.jpg")}
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div className="ml-1.5">
                        <p className="text-xs">
                            <strong className="block font-medium">Gerald Lee Jie Ren</strong>

                            <span> geraldleejieren@gmail.com </span>
                        </p>
                    </div>
                </a>
            </div>
        </div>

    )
}

export default AdminSideBar