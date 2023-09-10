import {useContext, useState, useCallback, useEffect} from 'react'
import {AddedContext} from './RolePlannerContext'


const AdminUpdateSkill = (props) => {
    const added = useContext(AddedContext)
    const [addedSkills, setAddedSkills] = useState(added[0])
    const [unaddedSkills, setUnaddedSkills] = useState(added[1])
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);   
    function handleChange(skillid, action){
        var item = ''
        if (action === 'add'){
            for(let i=0; i<unaddedSkills.length; i++){
                item = unaddedSkills[i]
                if(item['Skill_ID'] == skillid){
                    if (action === 'add'){
                        unaddedSkills.splice(i,1)
                        addedSkills.push(item)
                    }
                    else {
                        addedSkills.splice(i,1)
                        unaddedSkills.push(item)
                    }
                }
            }
        }

        else {
            for(let i=0; i<addedSkills.length; i++){
                item = addedSkills[i]
                if(item['Skill_ID'] == skillid){
                    addedSkills.splice(i,1)
                    unaddedSkills.push(item)
                }
            }

        }
        added[0] = addedSkills
        added[1] = unaddedSkills
    }
    
    
    var rows = {}
    if (props.action === 'add') {
        rows = unaddedSkills.map(function (item, index) {
            return <tr className="hover:bg-white-200">
                <td className="whitespace-nowrap py-2 font-medium text-gray-900 text-center">{item['Skill_name']}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <button onClick={()=>handleChange(item['Skill_ID'], props.action)} className="inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-4 py-2 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500">
                        <span className="text-xs font-medium"> Add Skill </span>
                    </button>
                </td>
            </tr>
    
        })
    }
    else {
        rows = addedSkills.map(function (item, index) {
            return <tr className="hover:bg-white-200">
                <td className="whitespace-nowrap py-2 font-medium text-gray-900 text-center">{item['Skill_name']}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <button onClick={()=>handleChange(item['Skill_ID'], props.action)} className="inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-4 py-2 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500">
                        <span className="text-xs font-medium"> Remove Skill</span>
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


export default AdminUpdateSkill