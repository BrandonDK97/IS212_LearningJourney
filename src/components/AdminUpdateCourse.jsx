import {useContext, useState} from 'react'
import {AddContext} from './RolePlannerContext'


const AdminUpdateCourse = (props) => {
    const add = useContext(AddContext)
    const [addedCourses, setAddedCourses] = useState(add[0])
    const [unaddedCourses, setUnaddedCourses] = useState(add[1])
    function handleChange(courseid, action){
        var item = ''
        if (action === 'add'){
            for(let i=0; i<unaddedCourses.length; i++){
                item = unaddedCourses[i]
                if(item['Course_ID'] === courseid){
                    if (action === 'add'){
                        unaddedCourses.splice(i,1)
                        addedCourses.push(item)
                    }
                    else {
                        addedCourses.splice(i,1)
                        unaddedCourses.push(item)
                    }

                }
            }
        }

        else {
            for(let i=0; i<addedCourses.length; i++){
                item = addedCourses[i]
                if(item['Course_ID'] === courseid){
                    addedCourses.splice(i,1)
                    unaddedCourses.push(item)
                }
            }
        }
        add[0] = addedCourses
        add[1] = unaddedCourses
    }
 
    var rows = {}
    if (props.action === 'add') {
        rows = unaddedCourses.map(function (item, index) {
            return <tr className="hover:bg-white-200">
                <td className="whitespace-nowrap py-2 font-medium text-gray-900 text-center">{item['Course_Name']}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <button onClick={()=>handleChange(item['Course_ID'], props.action)} className="inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-4 py-2 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500">
                        <span className="text-xs font-medium"> Add Course </span>
                    </button>
                </td>
            </tr>
    
        })
    }
    else {
        rows = addedCourses.map(function (item, index) {
            return <tr className="hover:bg-white-200">
                <td className="whitespace-nowrap py-2 font-medium text-gray-900 text-center">{item['Course_Name']}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <button onClick={()=>handleChange(item['Course_ID'], props.action)} className="inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-4 py-2 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500">
                        <span className="text-xs font-medium"> Remove Course</span>
                    </button>
                </td>
            </tr>
    
        })
    }

    return (
        <tbody className="divide-y divide-gray-200">
            {rows}

        </tbody>

    )
}

export default AdminUpdateCourse