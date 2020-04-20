import client from "./client";
import axios from "axios";
import namesMap from "./data/names.map";
const inMap = Object.keys(namesMap);
export const casesByCountry = () => {
  return axios
    .get("https://pomber.github.io/covid19/timeseries.json")
    .then(({ data }) => {
      return Object.entries(data).map(([name, series]) => {
        const last = series[series.length - 1];
        return [
          inMap.includes(name) ? namesMap[name] : name,
          last.confirmed,
          last.deaths,
          last.recovered,
        ];
      });
    })
    .catch((e) => {
      console.error(e);
    });
};
export const getGlobalStats = () => {
  return axios
    .get("https://pomber.github.io/covid19/timeseries.json")
    .then(({ data }) => {
      const r = { cases: 0, deaths: 0, recovered: 0 };
      Object.values(data).map((series) => {
        const last = series[series.length - 1];
        r.cases += last.confirmed;
        r.deaths += last.deaths;
        r.recovered += last.recovered;
      });
      return r;
    });
};
export const getCountryHistory = (n) => {
  let country = n;
  Object.entries(namesMap).forEach(([apiName, name]) => {
    if (name === n) {
      country = apiName;
    }
  });
  return axios
    .get("https://pomber.github.io/covid19/timeseries.json")
    .then(({ data }) => {
      let r;
      Object.entries(data).map(([name, series]) => {
        if (country === name) {
          r = series;
        }
      });
      return r;
    });
};
