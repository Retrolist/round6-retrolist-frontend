import React from "react";

export default function SecondaryButton({ children, ...props }: any) {
  return (
    <button
      {...props}
      className={"flex items-center px-5 py-2 rounded-lg bg-white text-gray-700 shadow transition hover:cursor-pointer hover:bg-gray-200 " + props.className}
    >
      {children}
    </button>
  );
}
