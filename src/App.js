import React, { useEffect, useState } from "react";
import { getCoordinates } from "./services/geolocation";
import { casesByCountry, getGlobalStats } from "./services/api";
import "./App.sass";
import Map from "./components/Map";
import StatsBar from "./components/StatsBar";
import TopBar from "./components/TopBar";
function App() {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [data, setData] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    cases: null,
    deaths: null,
    recovered: null,
  });
  const [showSideBar, setShowSideBar] = useState(true);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    getCoordinates(({ latitude, longitude }) =>
      setCoordinates([longitude, latitude])
    );
    if (data.length < 1) {
      casesByCountry().then((d) => {
        setData(d);
      });
      if (globalStats.cases === null) {
        getGlobalStats().then((stats) => {
          setGlobalStats(stats);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, globalStats]);

  return (
    <div className="App">
      <TopBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className={`flex flex-row w-screen bg-gray-300 h-screen`}>
        <StatsBar
          selected={selected}
          showSideBar={showSideBar}
          setSelected={setSelected}
          globalStats={globalStats}
          statsByCountry={data}
        />
        <div className="w-screen h-screen">
          <Map data={data} coordinates={coordinates} selected={selected} />
        </div>
      </div>
    </div>
  );
}

export default App;
