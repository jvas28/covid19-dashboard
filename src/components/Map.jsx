import React, { useEffect, useRef, useState } from "react";
import { getCoordMap, getCountryByName } from "../services/countries";
import { mapOptions } from "../services/charts";
import echarts from "echarts/dist/echarts";
import world from "echarts/map/json/world";
import { FaMap, FaTable } from "react-icons/fa";
import Table from "./Table";
echarts.registerMap("world", world);
const Map = ({ data, coordinates, selected }) => {
  const el = useRef();
  const geoCoordMap = getCoordMap();
  const [view, setView] = useState("map");
  const getOption = mapOptions;
  useEffect(() => {
    if (el && el.current) {
      const options = getOption(coordinates, data, geoCoordMap, selected);
      let instance = echarts.getInstanceByDom(el.current);
      // initialize chart
      if (instance === undefined) {
        instance = echarts.init(el.current);
        instance.setOption(options);
        window.onresize = () => instance.resize();
      }
      instance.setOption(options);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, coordinates]);
  useEffect(() => {
    const country = getCountryByName(selected);
    if (country) {
      let { latitude, longitude } = country;
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
      const options = getOption(
        [longitude, latitude],
        data,
        geoCoordMap,
        selected
      );
      let instance = echarts.getInstanceByDom(el.current);
      instance.setOption(options);
    }
  }, [data, geoCoordMap, getOption, selected]);

  return (
    <div className="map-wrapper">
      <div className="hidden md:flex flex-row w-full justify-between mb-1 ">
        <div className="p-2 font-bold text-gray-600">
          {view === "map"
            ? "Interactive visualization"
            : "Accumulative data table"}
        </div>
        <div className="flex flex-row justify-end">
          <div
            className={`p-2 rounded flex flex-row items-center text-sm mr-1 cursor-pointer ${
              view === "map"
                ? "bg-gray-500 text-white"
                : "bg-gray-400 text-gray-700"
            }`}
            onClick={() => setView("map")}
          >
            <FaMap className="mr-2" /> Map view
          </div>
          <div
            className={`p-2 rounded flex flex-row items-center text-sm mr-1 cursor-pointer ${
              view === "data"
                ? "bg-gray-500 text-white"
                : "bg-gray-400 text-gray-700"
            }`}
            onClick={() => setView("data")}
          >
            <FaTable className="mr-2" /> Data View
          </div>
        </div>
      </div>
      <div
        className={`map-card ${view !== "map" && "hidden"}`}
        ref={el}
        style={{ width: "100%", height: "100%" }}
      ></div>
      {view === "data" && (
        <div className={`map-card ${view !== "data" && "hidden"}`}>
          <Table selected={selected} />
        </div>
      )}
    </div>
  );
};
export default Map;
