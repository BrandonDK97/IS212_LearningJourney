import React from 'react';
import '../index.css'

export default function NoPermission() {
    return (
        <div class="grid h-screen place-content-center bg-white">
        <div class="text-center">
          <strong class="text-9xl font-black text-gray-200">Forbidden</strong>
      
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>
      
          <p class="mt-4 text-gray-500">You Do Not Have Access.</p>
      
          <a
            href="/staffhomepage"
            class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a>
        </div>
      </div>
      

    )
}