import React from "react";
import { getFlagUrl } from "../services/countries";
import Trend from "./Trend";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";

const CountryListItem = ({ selected, name, setSelected, data, history }) => {
  return (
    <div className="country-list-item">
      <div className={`card ${selected === name ? "wide" : ""}`}>
        <div className="content">
          <div
            className="headline"
            onClick={() =>
              selected === name ? setSelected(null) : setSelected(name)
            }
          >
            <div className="left">
              <img className="icon" alt="Country flag" src={getFlagUrl(name)} />
              <div className="title">{name}</div>
            </div>
            <div className="right mobile">
              {selected === name ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`right desktop ${selected === name && "selected"}`}>
              <FaCheck />
            </div>
          </div>
          {selected === name ? (
            <div className="p-3 m-1 rounded flex flex-col h-full visible md:hidden">
              <Trend data={history} />
            </div>
          ) : null}
          <div className="numbers">
            <div className="item">
              <span className="title">Cases</span>
              <p className="value text-yellow-500">
                {data["cases"].toLocaleString()}
              </p>
            </div>
            <div className="item">
              <span className="title">Deaths</span>
              <p className="value text-red-500">
                {data["deaths"].toLocaleString()}
              </p>
            </div>
            <div className="item">
              <span className="title">Recovered</span>
              <p className="value text-green-500">
                {data["recovered"].toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountryListItem;
