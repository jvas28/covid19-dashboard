import React from "react";
import { FaBars } from "react-icons/fa";
export default function TopBar({ showSideBar, setShowSideBar }) {
  return (
    <header className="w-full shadow-b p-3 flex flex-row justify-between z-10 bg-gray-100">
      <div
        className={`cursor-pointer md:invisible p-1 rounded hover:bg-gray-400 ${
          showSideBar ? "" : "bg-gray-400"
        }`}
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <FaBars />
      </div>
      <h1 className="font-bold text-gray-700">COVID-19 Dashboard</h1>
      <div>
        by{" "}
        <a href="https://github.com/jvas28">
          <b>jvas28</b>
        </a>
      </div>
    </header>
  );
}
