import React from "react";
import Card from "./Card";
import ToggleCard from "./ToggleCard";
import CountryList from "./CountryList";
import { FaCross, FaHospital } from "react-icons/fa";
import { GiHealing, GiWorld } from "react-icons/gi";
export default function StatsBar({
  globalStats,
  statsByCountry,
  setSelected,
  selected,
  showSideBar,
}) {
  return (
    <div id="stats-bar" className={` ${showSideBar ? "show" : "hide"}`}>
      <ToggleCard
        id="global-stats-card"
        title="Global Stats"
        Icon={GiWorld}
        onToggle={() => alert("")}
        open={true}
      >
        <div className="w-full">
          <Card
            Icon={FaHospital}
            title="Confirmed"
            value={globalStats.cases}
            color={"yellow-500"}
          />
        </div>
        <div className="w-1/2">
          <Card
            Icon={FaCross}
            title="Deaths"
            value={globalStats.deaths}
            color="red-500"
          />
        </div>
        <div className="w-1/2">
          <Card
            Icon={GiHealing}
            title="Recovered"
            value={globalStats.recovered}
            color="green-500"
          />
        </div>
      </ToggleCard>
      <CountryList
        data={statsByCountry}
        setSelected={setSelected}
        selected={selected}
      />
    </div>
  );
}
