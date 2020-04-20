import { getFlagUrl } from "./countries";
export const mapOptions = (coordinates = null, rawData, geoCoordMap) => {
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
    backgroundColor: "#e2e8f0",
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
        max: 10,
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
          color: "rgba(244, 67, 54, 0.54)",
          borderColor: "red",
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
  rawData.forEach((item) => {
    let { confirmed: c, deaths: d, recovered: r, date: dt } = item;
    dates.push(new Date(dt));
    recovered.push(r);
    cases.push(c);
    deaths.push(d);
  });
  return {
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
      top: 0,
      bottom: 10,
      left: 20,
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
        show: false,
      },
    ],
    series: [
      {
        name: "Cases",
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
        name: "Deaths",
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
        name: "Recovered",
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
