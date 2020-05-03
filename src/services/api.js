import axios from "axios";
import namesMap from "./data/names.map";
const inMap = Object.keys(namesMap);
let data = null;

export const getData = () => {
  if (!data) {
    return axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then((r) => {
        data = r;
        return r;
      });
  }
  return Promise.resolve(data);
};
export const casesByCountry = () => {
  return getData()
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
  return getData().then(({ data }) => {
    const r = { cases: 0, deaths: 0, recovered: 0 };
    Object.values(data).map((series) => {
      const last = series[series.length - 1];
      r.cases += last.confirmed;
      r.deaths += last.deaths;
      r.recovered += last.recovered;
      return null;
    });
    return r;
  });
};
export const getCountryHistory = (n = null) => {
  if (n === null) {
    const result = {};
    return getData().then(({ data }) => {
      Object.entries(data).map(([country, series]) => {
        series.map(({ confirmed, deaths, recovered, date }) => {
          if (!result[date]) {
            result[date] = { confirmed, deaths, recovered };
          }
          result[date].confirmed += confirmed;
          result[date].deaths += deaths;
          result[date].recovered += recovered;
          return null;
        });
        return null;
      });
      return Object.entries(result).map(([date, data]) => {
        return { date, ...data };
      });
    });
  }
  let country = n;
  Object.entries(namesMap).forEach(([apiName, name]) => {
    if (name === n) {
      country = apiName;
    }
  });
  return getData().then(({ data }) => {
    let r;
    Object.entries(data).map(([name, series]) => {
      if (country === name || country === null) {
        r = series
          .map((v, index, arr) => {
            if (index < 1) {
              return v;
            }
            return {
              confirmed: v.confirmed - arr[index - 1].confirmed,
              deaths: v.deaths - arr[index - 1].deaths,
              recovered: v.recovered - arr[index - 1].recovered,
              date: v.date,
            };
          })
          .filter(
            ({ confirmed, deaths, recovered }) =>
              !(confirmed < 0 || deaths < 0 || recovered < 0)
          );
      }
      return null;
    });
    return r;
  });
};
