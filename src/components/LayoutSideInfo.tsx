import React from "react";
import { StatCard } from "./StatCard";
import { useProjectCount } from "../hooks/useProjectCount";
export default function LayoutSideInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  const projectCount = useProjectCount()

  return (
    <div className="container 2xl:max-w-[1440px] mt-11">
      <div className="relative hero-section-gradient-bg rounded-2xl flex items-center px-20 h-60 pb-8">
        <div className="hidden sm:block" style={{ maxWidth: 'calc(100% - 260px)' }}>
          <div className="text-3xl lg:text-4xl font-bold">
            Retro Funding 4: <span className="text-red-600">Onchain Builders</span>
          </div>
          <p className="pt-3 w-full hidden md:block">
            Rewarding projects that have an on-chain impact on the Superchain
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
          title="Projects"
          description={`${projectCount.total || '...'}`}
          icon="lucide:users-2"
        />
        <StatCard
          title="Application period"
          description="May 23 - June 6"
          icon="lucide:calendar"
        />
        <StatCard
          title="Total rewards"
          description="10M OP"
          icon="lucide:award"
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
