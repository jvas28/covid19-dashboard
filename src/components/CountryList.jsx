import React, { useState, useEffect } from "react";
import { FaCross, FaHospital } from "react-icons/fa";
import FilterBar from "./FilterBar";
import { GiHealing } from "react-icons/gi";
import { getFlagUrl } from "../services/countries";
import { getCountryHistory } from "../services/api";
import Trend from "./Trend";
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
const CountryItem = ({
  selected,
  name,
  setSelected,
  data,
  history,
  filter,
}) => {
  return (
    <div className="p-1">
      <div
        className={`p-3 cursor-pointer rounded
    flex flex-col bg-gray-100 ${selected === name ? "wide" : ""}`}
      >
        <div
          className={`flex items-center justify-between ${
            filter !== "cases" ? "flex-col" : "flex-row"
          }`}
          onClick={() =>
            selected === name ? setSelected(null) : setSelected(name)
          }
        >
          <div className="flex flex-row items-center justify-center">
            <img className="mr-2" alt="Country flag" src={getFlagUrl(name)} />
            <span>{name}</span>
          </div>
          <div>
            {filter !== "cases" ? (
              <small className="font-bold bg-blue-800 text-white p-1 rounded mx-2">{`( ${
                ((data[filter] / data["cases"]) * 100).toFixed(2) || ""
              } %)`}</small>
            ) : (
              ""
            )}
            {data[filter] ? data[filter].toLocaleString() : ""}
          </div>
        </div>
        {selected === name ? (
          <div className="p-3 m-1 rounded">
            <Trend data={history} />
          </div>
        ) : null}
      </div>
    </div>
  );
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

      <div
        className="flex flex-col w-full overflow-y-scroll overflow-x-visible"
        style={{ height: "calc(100vh - 500px)" }}
      >
        {countryData
          .filter(({ name }) =>
            name.toLowerCase().includes(search.toLowerCase())
          )
          .map(({ name, ...data }, index) => (
            <CountryItem
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
