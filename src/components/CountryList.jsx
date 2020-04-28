import React, { useState, useEffect } from "react";
import { FaCross, FaHospital } from "react-icons/fa";
import { GiHealing } from "react-icons/gi";
import CountryItem from "./CountryListItem";
import FilterBar from "./FilterBar";
import { getCountryHistory } from "../services/api";
const filters = {
  cases: {
    title: "Cases",
    activeClass: "bg-yellow-500",
    icon: <FaHospital />,
  },
  deaths: {
    title: "Deaths",
    activeClass: "bg-red-500",
    icon: <FaCross />,
  },
  recovered: {
    title: "Recovered",
    activeClass: "bg-green-500",
    icon: <GiHealing />,
  },
};

export default function CountryList({ data, setSelected, selected }) {
  const countryData = data.map(([name, cases, deaths, recovered]) => ({
    name,
    cases,
    deaths,
    recovered,
  }));
  const [filter, setFilter] = useState("cases");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  countryData.sort(({ [filter]: a }, { [filter]: b }) => b - a);

  useEffect(() => {
    if (selected) {
      getCountryHistory(selected).then((data) => setHistory(data));
    }
  }, [selected]);

  return (
    <>
      <div className="w-full">
        <FilterBar
          selected={filter}
          onTextChange={setSearch}
          settings={filters}
          onSelect={(name) => setFilter(name)}
        />
      </div>

      <div className="flex flex-col w-full flex-grow-0">
        {countryData
          .filter(({ name }) =>
            name.toLowerCase().includes(search.toLowerCase())
          )
          .map(({ name, ...data }, index) => (
            <CountryItem
              key={index}
              selected={selected}
              name={name}
              setSelected={setSelected}
              data={data}
              history={history}
              filter={filter}
            />
          ))}
      </div>
    </>
  );
}
