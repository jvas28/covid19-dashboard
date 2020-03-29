import countries from "./data/countries.json";
export const getCountryByName = n => {
  return countries.find(({ name }) => n === name);
};
export const getCoordMap = () => {
  const coordMap = {};
  countries.forEach(({ name, latitude, longitude }) => {
    coordMap[name] = [parseFloat(longitude), parseFloat(latitude)];
  });
  return coordMap;
};
export const missing = names => {
  const existing = countries.map(({ name }) => {
    return name;
  });
  return names.filter(name => !existing.includes(name));
};

export const getFlagUrl = (name) => {
  const country = getCountryByName(name);
  if(country) {
    return `https://www.countryflags.io/${country.code}/flat/32.png`
  } else {
    return "https://via.placeholder.com/32x32"
  }
  
}