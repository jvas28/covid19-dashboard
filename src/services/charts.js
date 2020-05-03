import { getFlagUrl } from "./countries";
export const mapOptions = (
  coordinates = null,
  rawData,
  geoCoordMap,
  selected
) => {
  var mapData = [];
  rawData.forEach((item) => {
    const geoCoord = geoCoordMap[item[0]];
    if (geoCoord) {
      mapData.push({
        name: item[0],
        value: [...geoCoord, ...item.slice(1)],
      });
    }
  });
  return {
    backgroundColor: "white",
    tooltip: {
      trigger: "item",
    },
    geo: {
      show: true,
      map: "world",
      top: 100,
      silent: true,
      zoom: coordinates ? 8 : 1,
      center: coordinates ?? [],
      scaleLimit: {
        min: 1,
        max: 30,
      },
      zlevel: 0,
      emphasis: {
        label: {
          areaColor: "#eee",
        },
        itemStyle: {
          areaColor: "lightgray",
        },
      },
      itemStyle: {
        borderWidth: 0.4,
        borderColor: "#404a59",
        backgroundColor: "blue",
      },
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowBlur: 10,
      roam: true,
    },
    grid: [
      {
        show: false,
        borderColor: "transparent",
        backgroundColor: "#404a59",
      },
    ],
    series: [
      {
        name: "Cases",
        type: "scatter",
        coordinateSystem: "geo",
        data: mapData,
        borderWidth: 1,
        selectedMode: "simple",
        activeOpacity: 1,
        label: {
          formatter: "{b}",
          position: "right",
          show: true,
        },
        tooltip: {
          formatter: function (item) {
            const [, , cases, deaths, recovered] = item.data.value;
            return `
                        <img src="${getFlagUrl(item.name)}" />
                        <h1 class="font-bold">${item.name}</h1>
                        <p><b>Infected:</b> ${cases.toLocaleString()}</p>
                        <p><b>Death:</b> ${deaths.toLocaleString()}</p>
                        <p><b>Recovered:</b> ${recovered.toLocaleString()}</p>
                        `;
          },
        },
        symbolSize: function (data) {
          return Math.sqrt(parseInt(data[2])) / 4;
        },
        itemStyle: {
          color: (item) => {
            if (item.data.name !== selected) {
              return "rgba(244, 67, 54, 0.54)";
            } else {
              return "rgba(50, 20, 210, 0.54)";
            }
          },
        },
      },
    ],
  };
};

export const trendOptions = (echarts, rawData) => {
  let cases = [],
    deaths = [],
    recovered = [],
    dates = [];
  let firstCasePassed = false;
  rawData = rawData.filter(({ confirmed }) => {
    if (confirmed > 0) {
      firstCasePassed = true;
    }
    if (!firstCasePassed) {
      return false;
    }
    return true;
  });
  rawData.forEach((item) => {
    let { confirmed: c, deaths: d, recovered: r, date: dt } = item;
    dates.push(dt);
    recovered.push(r);
    cases.push(c);
    deaths.push(d);
  });
  return {
    title: {
      text: "Daily updates",
      show: true,
      textStyle: {
        fontSize: 10,
        color: "#CCC",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          show: false,
        },
      },
    },
    grid: {
      backgroundColor: "transparent",
      top: 25,
      bottom: 10,
      left: 40,
      right: 20,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: dates,
        show: false,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          fontStyle: "lighter",
          formatter(value, b) {
            if (value < 999) {
              return value;
            }
            if (value < 99999) {
              return `${parseInt(value / 1000)} k`;
            }
            return `${(value / 1000000).toFixed(1)} M`;
          },
        },
      },
    ],
    series: [
      {
        name: "New Cases",
        type: "line",
        smooth: true,
        label: {
          normal: {
            show: false,
            position: "top",
          },
        },
        color: "#ecc94b",
        areaStyle: {
          color: "#ecc94bc7",
        },
        data: cases,
      },
      {
        name: "New Deaths",
        type: "line",
        smooth: true,
        color: "#f56565",
        label: {
          normal: {
            show: false,
            position: "top",
          },
        },
        areaStyle: {
          color: "#f56565c7",
        },
        data: deaths,
      },
      {
        name: "New Recovered",
        type: "line",
        smooth: true,
        color: "#48bb78",
        label: {
          normal: {
            show: false,
            position: "top",
          },
        },
        areaStyle: {
          color: "#48bb78c7",
        },
        data: recovered,
      },
    ],
  };
};
