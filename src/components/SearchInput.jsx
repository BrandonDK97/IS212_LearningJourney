import React from 'react';
import '../index.css'

export default function SearchInput() {
    return (
        <div className="relative">
            <label className="sr-only"> Search </label>
            <input type="search" id="UserEmail" placeholder="Search" className="w-full rounded-md border border-gray-200 shadow-sm sm:text-sm p-3" />
            <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center text-gray-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="6" stroke="#222222" />
                    <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round" />
                </svg>
            </span>
        </div>
    )
}