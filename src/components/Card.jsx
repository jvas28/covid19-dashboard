import React from "react";
export default function Card({ Icon, value, title, color = "black" }) {
  return (
    <div
      className={`flex flex-row md:flex-row items-center rounded md:rounded-lg justify-center  bg-${color} text-white px-3 p-1 m-1`}
    >
      <Icon className="md:mx-2 text-2xl mr-2" />
      <div>
        <p className="font-bold text-base">
          {value ? value.toLocaleString() : "..."}
        </p>
        <p className="flex flex-row text-xs flex-auto uppercase md:text-right">
          {title}
        </p>
      </div>
    </div>
  );
}
