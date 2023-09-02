import React from "react";

export default function PrimaryButton({ children, ...props }: any) {
  return (
    <button
      {...props}
      className={"flex items-center px-5 py-2 rounded-lg bg-optimism text-white shadow transition hover:cursor-pointer hover:bg-red-700 " + props.className}
    >
      {children}
    </button>
  );
}
