import React from 'react'
export default function ToggleCard({children, Icon, title}) {
    return (
      <div style={{minWidth: 100}} className={`card flex flex-row md:flex-col flex-wrap rounded shadow m-3 bg-white p-2 flex flex-row justify-between`}>
        <div className="w-full flex flex-row items-center text-gray-500 justify-between h-10">
            <h2 className="flex flex-row font-bold items-center"><Icon className="mx-2"/>{title}</h2>  
        </div>
        <>
        {children}
        </>
      </div>
    )
}
