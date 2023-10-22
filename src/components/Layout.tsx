import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { Link } from "react-router-dom";
import OptimismLogo from "./OptimismLogo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container 2xl:max-w-[1440px] mx-auto">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4">
        <div className="flex">
          <Link to="/">
            <div className="text-xl">
              <OptimismLogo />
            </div>
          </Link>
          <div className="ml-11 flex gap-5 text-base font-semibold">
            <Link to="/" className="py-2 px-3">
              <div>Lists</div>
            </Link>
            <Link to="/" className="py-2 px-3">
              <div>Projects</div>
            </Link>
            <Link to="/" className="py-2 px-3">
              <div>My Lists</div>
            </Link>
          </div>
        </div>

        <div className="flex">
          <ConnectButton />
        </div>
      </div>

      <div className="container mx-auto">{children}</div>
    </div>
  );
}
