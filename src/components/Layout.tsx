import { ConnectButton } from "@rainbow-me/rainbowkit"
import * as React from "react"
import PrimaryButton from "./buttons/PrimaryButton"
import OptimismLogo from "./OptimismLogo"
import { Link } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center p-4">
        <div className="flex">
          <Link to="/">
            <div className="text-xl">
              <OptimismLogo />
            </div>
          </Link>
        </div>

        <div className="flex">
          <Link to="/lists/create">
            <PrimaryButton className="mr-2">+ Create List</PrimaryButton>
          </Link>
          
          <ConnectButton />
        </div>
      </div>

      <div className="container mx-auto">
        {children}
      </div>
    </div>
  )
}