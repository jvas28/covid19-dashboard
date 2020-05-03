import React from "react";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
export default function Rate({
  bg = "bg-white",
  color = "text-black",
  title = "My Rate",
  subtitle = null,
  value = 0,
  delta = false,
}) {
  return (
    <div
      className={`rounded shadow p-3 flex flex-col shadow-lg border border-gray-300 h-32 justify-between ${bg} ${color}`}
    >
      <div className="flex flex-col">
        <label className="text-base font-bold text-gray-600 w-full text-right">
          {title}
        </label>
        <label className="text-xs text-gray-500 w-full text-right">
          {subtitle}
        </label>
      </div>

      <div
        className={`flex flex-row items-center w-full ${
          delta ? "justify-between" : "justify-end"
        }`}
      >
        {delta &&
          (value > 0 ? (
            <GoTriangleUp className="text-2xl" />
          ) : (
            <GoTriangleDown className="text-2xl" />
          ))}
        <h1 className="font-bold text-2xl">
          {isNaN(value) || !isFinite(value)
            ? "N/A"
            : `${(value * 100).toFixed(2)} %`}
        </h1>
      </div>
    </div>
  );
}
