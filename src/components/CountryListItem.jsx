import React from "react";
import { getFlagUrl } from "../services/countries";
import Trend from "./Trend";

const CountryListItem = ({
  selected,
  name,
  setSelected,
  data,
  history,
  filter,
}) => {
  return (
    <div className="country-list-item">
      <div className={`card ${selected === name ? "wide" : ""}`}>
        <div
          className={`flex`}
          onClick={() =>
            selected === name ? setSelected(null) : setSelected(name)
          }
        >
          <div className="flex content-center items-center">
            <img
              className="mr-2 w-10 h-10 p-2 bg-gray-400 rounded-full"
              alt="Country flag"
              src={getFlagUrl(name)}
            />
            <div className="text-sm font-bold text-gray-600 w-64">{name}</div>
          </div>

          <div className="flex flex-col w-full justify-center">
            <div className="text-xl font-bold w-full text-right text-gray-700">
              {data[filter] ? data[filter].toLocaleString() : ""}
            </div>
            {filter !== "cases" && (
              <div
                className="text-xs font-bold self-end bg-gray-200 rounded text-blue-800 text-center"
                style={{ width: "64px" }}
              >{`${
                ((data[filter] / data["cases"]) * 100).toFixed(2) || ""
              } %`}</div>
            )}
          </div>
        </div>
        {selected === name ? (
          <div className="p-3 m-1 rounded flex flex-col h-full ">
            <Trend data={history} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default CountryListItem;
