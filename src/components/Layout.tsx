import { Icon } from "@iconify/react/dist/iconify.js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { Link } from "react-router-dom";
import OptimismLogo from "./OptimismLogo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {/* Navbar */}
      <div className="border-b border-[#EAECF0]">
        <div className="flex justify-between items-center p-4 container 2xl:max-w-[1440px] mx-auto">
          <div className="flex w-full justify-center sm:w-auto sm:justify-start">
            <Link to="/">
              <div className="text-xl">
                <OptimismLogo />
              </div>
            </Link>
            <div className="ml-11 hidden sm:flex gap-5 text-base font-semibold">
              <Link to="/" className="py-2 px-3">
                <div>Projects</div>
              </Link>
              {/* <Link to="/list" className="py-2 px-3">
                <div>Lists</div>
              </Link> */}
              {/* <Link to="/" className="py-2 px-3">
                <div>My Lists</div>
              </Link> */}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="hidden sm:block">
              <Link
                to="/lists/create/list-detail"
                className="flex items-center gap-2 bg-red-600 rounded-lg py-2.5 px-4 text-white"
              >
                <Icon icon="lucide:plus" color="white" />
                Create List
              </Link>
            </div>
            <div className="hidden lg:flex">
              <ConnectButton showBalance={false} />
            </div>
          </div>
        </div>

        <div className="sm:hidden -mt-1 flex justify-between px-4 pb-3">
          <div className="flex gap-5 text-base font-semibold text-gray-800">
            <Link to="/" className="py-2 px-3">
              <div>Projects</div>
            </Link>
            {/* <Link to="/list" className="py-2 px-3">
              <div>Lists</div>
            </Link> */}
            {/* <Link to="/" className="py-2 px-3">
              <div>My Lists</div>
            </Link> */}
          </div>

          <div>
            <Link
              to="/lists/create/list-detail"
              className="flex items-center gap-2 bg-red-600 rounded-lg py-2 px-4 text-white"
            >
              <Icon icon="lucide:plus" color="white" />
              Create List
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-3">{children}</div>
    </div>
  );
}
