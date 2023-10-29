import React from "react";
import { StatCard } from "./StatCard";
export default function LayoutSideInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container 2xl:max-w-[1440px] mt-11">
      <div className="relative hero-section-gradient-bg rounded-2xl flex items-center px-20 h-60">
        <div>
          <div className="text-4xl font-bold">
            Voting for RetroPGF 3 is <span className="text-red-600">Live!</span>
          </div>
          <p className="pt-3 w-11/12">
            RetroPGF voting is live! View nominated projects that are eligible
            to receive retroactive public goods funding.
          </p>
        </div>
        <img
          className="absolute bottom-0 right-24"
          src="/img/logo.png"
          alt="logo"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 justify-center relative -top-10 px-8">
        <StatCard
          title="Eligible for RetroPGF 3"
          description="1,058"
          icon="lucide:users-2"
        />
        <StatCard
          title="Voting period"
          description="Nov 6 - Dec 7, 2023"
          icon="lucide:calendar"
        />
        <StatCard
          title="Total rewards"
          description="30M OP"
          icon="lucide:award"
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
