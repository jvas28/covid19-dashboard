import React from 'react'

export default function FilterBar({settings, selected, onSelect, onTextChange }) {
    return (
        <div className="flex flex-col justify-between bg-gray-300 p-2 rounded text-gray-800" >
            <div className="flex flex-row">
                <input className="p-2 w-full m-1 rounded" onChange={(e)=>onTextChange(e.target.value)} placeholder="Type your country name" />
            </div>
            <div className="flex flex-row">
                    {
                        Object.entries(settings).map(([name, {icon, activeClass}])=>{
                            return <div onClick={()=>onSelect(name)} 
                            key={name}
                            className={`flex flex-auto cursor-pointer
                            text-center content-center bg-gray-400 p-2 rounded justify-center m-1
                            ${selected===name ? activeClass: ''}`}>
                        {icon}
                    </div>
                        })
                    }
            </div>
        </div>
    )
}
