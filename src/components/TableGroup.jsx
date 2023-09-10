import React, {useContext, useState, useCallback} from 'react';
import '../index.css'
import AdminUpdateSkill from "../components/AdminUpdateSkill"
import { AddedContext } from './RolePlannerContext'
export default function TableGroup() {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const added = useContext(AddedContext)
    return (<>
        <div onClick={()=>forceUpdate()} className='col-start-2 col-end-4 row-start-2 row-end-6 border rounded-lg overflow-y-auto max-h-screen mx-12'>
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm relative">
                <thead>
                    <tr className='h-16 bg-gray-100 sticky top-0'>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Skills Added</th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Remove Skill</th>
                    </tr>
                </thead>
                {added[0].length == 0 ?
                    <tbody>
                        <tr>
                            <td colSpan='2' className='text-center'>
                                <h2 className="text-xl font-medium mt-36">
                                    No Skills Added Yet...
                                </h2>

                                <p className="mt-4 text-sm text-gray-500">
                                    Added skills will appear here
                                </p>
                            </td>
                        </tr>
                    </tbody>
                    :
                    <AdminUpdateSkill action='delete'/>}
            </table>
        </div>
        <div onClick={()=>forceUpdate()} className='col-start-4 col-end-6 row-start-2 row-end-6 border rounded-lg overflow-y-auto max-h-screen mx-12'>
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm relative">
                <thead>
                    <tr className='h-16 bg-gray-100 sticky top-0'>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Skills Left</th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Add Skill</th>
                    </tr>
                </thead>
                <AdminUpdateSkill action='add'/>
            </table>
        </div>
    </>
    )
}