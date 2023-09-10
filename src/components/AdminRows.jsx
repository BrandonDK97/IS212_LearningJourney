import React, { useState, createContext, useCallback, useContext } from 'react'
import DeleteModal from './DeleteModal';
export const SkillModalContext = createContext({ opened: false, name: '', desc: '' })
export default function AdminRows(props) {
    const [modal, setModal] = useState({ opened: false, name: '', desc: '' })
    const [toDelete, setToDelete] = useState([props.type,''])
    function handleModal(name, id) {
        setToDelete([props.type,id])
        setModal({ opened: true, name: 'Delete '+name, desc: 'Are you sure you want to delete ' + name +'?' })
    }
    const rows = Object.values(props.data).map(function (item, index) {
        return <tr className="hover:bg-white-200">
            <td className="whitespace-nowrap py-2 font-medium text-gray-900 text-center">{item[props.name]}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                <a className="inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-4 py-2 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500"
                    href={props.href + item[props.id]}>
                    <span className="text-xs font-medium"> {props.message} </span>
                </a>
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                <a className="cursor-pointer inline-flex items-center rounded-2xl border border-gray-600 bg-gray-600 px-4 py-2 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500"
                    onClick={() => handleModal(item[props.name],item[props.id])}>
                    <span className="text-xs font-medium"> {props.message2} </span>
                </a>
            </td>
        </tr>

    })
    return (
        <tbody className="divide-y divide-gray-200">
            <SkillModalContext.Provider value={{ openModal: [ modal, setModal ], toBeDeleted: [toDelete, setToDelete] }}>
                <DeleteModal opened={modal.opened}/>
                {rows}
            </SkillModalContext.Provider>

        </tbody>

    )
}