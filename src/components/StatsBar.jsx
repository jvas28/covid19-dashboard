import React from 'react'
import Card from './Card';
import ToggleCard from './ToggleCard';
import CountryList from './CountryList';
import { FaCross, FaHospital, FaMapMarkerAlt } from 'react-icons/fa';
import { GiHealing, GiWorld } from "react-icons/gi";
export default function StatsBar({globalStats, statsByCountry, setSelected, selected, showSideBar}) {
    return (
        <div id="side-bar" className={`absolute z-10 mt-12 md:z-10  ${showSideBar?'w-full md:w-1/3 lg:w-1/4 xl:1/5':'w-0 overflow-hidden'}`}>
            <ToggleCard title="Global Stats" Icon={GiWorld} onToggle={()=>alert('')} open={true}>
                <div className="w-full">
                    <Card Icon={FaHospital} title="Confirmed" value={globalStats.cases} color={'yellow-500'}/>
                </div>
                <div className="w-1/2 md:w-full">
                    <Card Icon={FaCross} title="Deaths" value={globalStats.deaths} color="red-500"/>
                </div>
                <div className="w-1/2 md:w-full">
                    <Card Icon={GiHealing} title="Recovered" value={globalStats.recovered} color="green-500"/>
                </div>
            </ToggleCard>
            <ToggleCard title="Stats by country" Icon={FaMapMarkerAlt} onToggle={()=>alert('')} open={true}>
                <CountryList data={statsByCountry} setSelected={setSelected} selected={selected} />
            </ToggleCard>
        </div>
    )
}
