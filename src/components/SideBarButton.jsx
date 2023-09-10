import React from 'react';
import '../index.css'

export default function SideBarButton(props) {
    if (props.selected == props.name) {
        return (
            <a href={props.href} className='flex items-center rounded-lg bg-gray-100 px-6 py-2 text-gray-700 justify-between' >
                <span className="text-sm font-medium">{props.name}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 12L18.7071 11.2929L19.4142 12L18.7071 12.7071L18 12ZM6 13C5.44771 13 5 12.5523 5 12C5 11.4477 5.44771 11 6 11V13ZM14.7071 7.29289L18.7071 11.2929L17.2929 12.7071L13.2929 8.70711L14.7071 7.29289ZM18.7071 12.7071L14.7071 16.7071L13.2929 15.2929L17.2929 11.2929L18.7071 12.7071ZM18 13H6V11H18V13Z" fill="#33363F" />
                </svg>
            </a>
        )
    }
    else {
        return (
            <a href={props.href} className='flex items-center rounded-lg px-6 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 justify-between' >
                <span className="text-sm font-medium">{props.name}</span>
                

            </a>
        )
    }
}