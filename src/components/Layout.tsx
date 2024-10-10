import { Icon } from "@iconify/react/dist/iconify.js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { Link } from "react-router-dom";
import OptimismLogo from "./OptimismLogo";

const link = [
  "https://round3.retrolist.app/",
  "https://round4.retrolist.app/",
  "https://round5.retrolist.app/",
  "https://round6.retrolist.app/",
  // "https://round7.retrolist.app/",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="">
      {/* Navbar */}
      <div className="border-b border-[#EAECF0]">
        <div className="flex justify-between items-center p-4 container 2xl:max-w-[1440px] mx-auto relative z-50">
          <div className="hidden sm:flex gap-5 text-base font-semibold absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="py-2 px-3">
              <div>Home</div>
            </Link>
            <div
              className="py-2 px-3 flex gap-2 items-center relative cursor-pointer z-50"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div>Rounds</div>
              <img src="/chevron-down.svg" alt="" />
              {isOpen && (
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="absolute left-0 w-48 mt-2 top-8 bg-white border border-gray-300 rounded-md shadow-lg cursor-pointer z-50"
                >
                  <div className="py-1">
                    {link.map((ele, index) => {
                      return (
                        <a
                          href={ele}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        >
                          Rounds {index + 3}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full justify-center sm:w-auto sm:justify-start">
            <Link to="/">
              <div>
                <OptimismLogo />
              </div>
            </Link>
          </div>
          <div className="flex gap-4 hidden">
            <div className="hidden sm:block">
              <Link
                to="/lists/create/choose-projects"
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
          <div className="flex w-full justify-around gap-5 text-base font-semibold text-gray-800">
            <Link to="/" className="py-2 px-3">
              <div>Home</div>
            </Link>
            <div
              className="py-2 px-3 flex gap-2 items-center relative cursor-pointer z-50"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div>Rounds</div>
              <img src="/chevron-down.svg" alt="" />
              {isOpen && (
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="absolute left-0 w-48 mt-2 top-8 bg-white border border-gray-300 rounded-md shadow-lg cursor-pointer z-50"
                >
                  <div className="py-1">
                    {link.map((ele, index) => {
                      return (
                        <a
                          href={ele}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        >
                          Rounds {index + 3}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {/* <Link to="/list" className="py-2 px-3">
              <div>Lists</div>
            </Link> */}
            {/* <Link to="/analytics" className="py-2 px-3">
              <div>Analytics</div>
            </Link> */}
            {/* <Link to="/" className="py-2 px-3">
              <div>My Lists</div>
            </Link> */}
          </div>

          <div className="hidden">
            <Link
              to="/lists/create/choose-projects"
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
