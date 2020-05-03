import React from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../img/logo.svg";
export default function TopBar({ showSideBar, setShowSideBar }) {
  return (
    <nav className="w-full shadow-b p-3 flex flex-row justify-between z-10 bg-gray-100">
      <div
        className={`cursor-pointer md:invisible p-1 rounded hover:bg-gray-400 ${
          showSideBar ? "" : "bg-gray-400"
        }`}
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <FaBars />
      </div>
      <div className="flex flex-row">
        <img
          className="mr-2"
          src={Logo}
          style={{ width: 25, height: 25 }}
          alt="Logo"
        />
        <h1 className="font-bold text-gray-700">COVID-19</h1>
      </div>
      <div>
        by{" "}
        <a
          href="https://vasconez.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>jvas28</b>
        </a>
      </div>
    </nav>
  );
}
