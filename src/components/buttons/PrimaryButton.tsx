import React from "react";

export default function PrimaryButton({ children, ...props }: any) {
  return (
    <button
      {...props}
      className={"flex items-center px-5 py-2 rounded-lg shadow transition " + props.className + " " + (props.disabled ? 'bg-gray-200 text-gray-400' : 'bg-optimism text-white hover:cursor-pointer hover:bg-red-700')}
    >
      {children}
    </button>
  );
}
