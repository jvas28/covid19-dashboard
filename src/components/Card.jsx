import React from 'react'
export default function Card({Icon, value, title, color="black"}) {
    return (
        <div className={`flex flex-col md:flex-row items-center rounded md:rounded-lg  bg-${color} text-white p-3 m-1`}>
            <Icon className="md:mx-2" />
            <p className="font-bold text-base">{value ? value.toLocaleString(): '...'}</p>
            <p className="text-xs flex-auto uppercase md:text-right">{title}</p>
        </div>
    )
}
