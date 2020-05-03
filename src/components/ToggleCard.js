import React from "react";
export default function ToggleCard({ children, Icon, title, ...rest }) {
  return (
    <div
      {...rest}
      style={{ minWidth: 300 }}
      className={`card flex flex-row flex-wrap rounded shadow mx-3 bg-white p-2 flex flex-row justify-between`}
    >
      <div className="w-full flex flex-row items-center text-gray-500 justify-between h-10">
        <h2 className="flex flex-row font-bold text-sm items-center">
          <Icon className="mx-2" />
          {title}
        </h2>
      </div>
      <>{children}</>
    </div>
  );
}
