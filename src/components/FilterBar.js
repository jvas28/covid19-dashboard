import React from "react";
import { FaSearch } from "react-icons/fa";

export default function FilterBar({
  settings,
  selected,
  onSelect,
  onTextChange,
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col bg-white justify-between bg-white rounded-lg text-gray-800 p-2 shadow w-full">
          <div className="flex flex-row  rounded-lg h-8">
            <FaSearch className="mx-2 self-center text-gray-600" />
            <input
              className="p-2 w-full m-1 bg-white rounded font-bold text-gray-700"
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Find your country"
            />
          </div>
        </div>
      </div>
    </>
  );
}
