import React, { useEffect, useState } from "react";
import { getData } from "../services/api";
import { AgGridReact } from "ag-grid-react";
import namesMap from "../services/data/names.map";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

export default function Table({ selected }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then(({ data: d }) => {
      setData(d);
    });
  }, [data]);
  const numberRenderer = ({ value: v }) => v.toLocaleString();
  const percentageRenderer = ({ value: v }) =>
    !isNaN(v) ? `${(v * 100).toFixed(2)} %` : "-";
  const columnDefs = [
    { field: "country", hide: selected !== null, filter: "agTextColumnFilter" },
    {
      field: "latestUpdate",
      hide: selected !== null,
      filter: "agDateColumnFilter",
    },
    {
      field: "date",
      hide: selected === null,
      filter: "agDateColumnFilter",
      cellRenderer: (data) => {
        return data.value ? new Date(data.value).toLocaleDateString() : "";
      },
    },
    {
      field: "confirmed",
      filter: "agNumberColumnFilter",
      cellRenderer: numberRenderer,
    },
    {
      field: "deaths",
      filter: "agNumberColumnFilter",
      cellRenderer: numberRenderer,
    },
    {
      field: "recovered",
      filter: "agNumberColumnFilter",
      cellRenderer: numberRenderer,
    },
    {
      field: "deathRate",
      filter: "agNumberColumnFilter",
      cellRenderer: percentageRenderer,
    },
    {
      field: "healRate",
      filter: "agNumberColumnFilter",
      cellRenderer: percentageRenderer,
    },
  ];
  let rowData = [];
  if (selected === null) {
    Object.entries(data).forEach(([country, data]) => {
      let totalConfirmed = 0;
      let totalDeaths = 0;
      let totalRecovered = 0;
      let latestUpdate = null;
      data.forEach(({ confirmed, deaths, recovered, date }) => {
        totalConfirmed += confirmed;
        totalDeaths += deaths;
        totalRecovered += recovered;
        latestUpdate = date;
      });
      rowData.push({
        country,
        confirmed: totalConfirmed,
        deaths: totalDeaths,
        recovered: totalRecovered,
        latestUpdate: latestUpdate,
      });
    });
  } else {
    Object.entries(data).forEach(([country, data]) => {
      if (namesMap[country]) {
        country = namesMap[country];
      }
      if (country === selected) {
        rowData = data.map(({ date, ...rest }) => {
          return {
            date: new Date(date),
            ...rest,
          };
        });
      }
    });
  }

  rowData.sort(({ confirmed: a }, { confirmed: b }) => b - a);
  rowData = rowData.map((data) => {
    const deathRate = data.deaths / data.confirmed;
    const healRate = data.recovered / data.confirmed;

    return { ...data, deathRate, healRate };
  });
  return (
    <div className="ag-theme-material w-full h-full">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        autoGroupColumnDef={{ minWidth: 200 }}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
          sortable: true,
          resizable: true,
        }}
        animateRows
        enableRangeSelection
      ></AgGridReact>
    </div>
  );
}
