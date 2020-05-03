import React, { useEffect, useState } from "react";
import Map from "./Map";
import Rate from "./Rate";
import Trend from "./Trend";
import { getCountryHistory } from "../services/api";

export default function Content({ data, coordinates, selected = null }) {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    getCountryHistory(selected).then((data) => setHistory(data));
  }, [selected]);
  const confirmed =
    history.length > 1
      ? history.map(({ confirmed }) => confirmed).reduce((acc, c) => acc + c)
      : 0;
  const recovered =
    history.length > 1
      ? history.map(({ recovered }) => recovered).reduce((acc, c) => acc + c)
      : 0;
  const deaths =
    history.length > 1
      ? history.map(({ deaths }) => deaths).reduce((acc, c) => acc + c)
      : 0;

  const deltaCases =
    history.length > 0
      ? (history[history.length - 1].confirmed -
          history[history.length - 2].confirmed) /
        history[history.length - 2].confirmed
      : 0;
  const deltaRecovered =
    history.length > 0
      ? (history[history.length - 1].recovered -
          history[history.length - 2].recovered) /
        history[history.length - 2].recovered
      : 0;
  const deltaDeaths =
    history.length > 0
      ? (history[history.length - 1].deaths -
          history[history.length - 2].deaths) /
        history[history.length - 2].deaths
      : 0;
  return (
    <div id="details-wrapper">
      <Map data={data} coordinates={coordinates} selected={selected} />
      <div className="flex flex-col md:flex-row my-2 flex-wrap">
        <div className="w-full flex flex-wrap">
          <div className="w-1/5  p-1">
            <Rate
              color="text-green-500"
              title="Heal Rate"
              subtitle="Total"
              value={recovered / confirmed}
            />
          </div>
          <div className="w-1/5  p-1">
            <Rate
              color="text-red-500"
              title="Death Rate"
              subtitle="Total"
              value={deaths / confirmed}
            />
          </div>
          <div className="w-1/5  p-1">
            <Rate
              delta
              color="text-yellow-500"
              title="Cases"
              subtitle="Today vs Yesterday"
              value={deltaCases}
            />
          </div>
          <div className="w-1/5 p-1">
            <Rate
              delta
              color="text-green-500"
              title="Recovered"
              subtitle="Today vs Yesterday"
              value={deltaRecovered}
            />
          </div>
          <div className="w-1/5 p-1">
            <Rate
              delta
              color="text-red-500"
              title="Deaths"
              subtitle="Today vs Yesterday"
              value={deltaDeaths}
            />
          </div>
        </div>

        <div className="w-full flex flex-row p-1">
          <div
            className={`w-full rounded shadow p-3 bg-white flex flex-col items-end shadow-lg border border-gray-300 h-64 `}
          >
            <Trend data={history} />
          </div>
        </div>
      </div>
    </div>
  );
}
