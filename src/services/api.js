import client from "./client";
import namesMap from "./data/names.map";
const inMap = Object.keys(namesMap);

export const casesByCountry = () => {
  return client
    .get("cases_by_country.php")
    .then((response) => {
      if (response && response.data && response.data.countries_stat) {
        const {
          data: { countries_stat },
        } = response;
        return countries_stat.map(
          ({ country_name, cases, deaths, total_recovered, active_cases }) => {
            return [
              inMap.includes(country_name)
                ? namesMap[country_name]
                : country_name,
              parseInt(cases.replace(",", "")),
              parseInt(deaths.replace(",", "")),
              parseInt(total_recovered.replace(",", "")),
              parseInt(active_cases.replace(",", "")),
            ];
          }
        );
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
export const getGlobalStats = () => {
  return client.get("worldstat.php").then((response) => {
    let { total_cases, total_deaths, total_recovered } = response.data;
    const cases = parseInt(total_cases.split(",").join("")) || 0;
    const deaths = parseInt(total_deaths.split(",").join("")) || 0;
    const recovered = parseInt(total_recovered.split(",").join("")) || 0;
    return {
      cases,
      deaths,
      recovered,
    };
  });
};
export const getCountryHistory = (n) => {
  let country = n;
  Object.entries(namesMap).forEach(([apiName, name]) => {
    if (name === n) {
      country = apiName;
    }
  });
  return client
    .get("cases_by_particular_country.php", { params: { country } })
    .then((response) => {
      return response.data.stat_by_country;
    });
};
