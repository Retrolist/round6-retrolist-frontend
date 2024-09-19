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
            Retro Funding 5: <span className="text-red-600">OP Stack</span>
          </div>
          <p className="pt-3 w-full hidden md:block">
            Rewarding projects and contributors that contribute to the OP Stack
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
          title="Eligible Projects"
          description={`${projectCount.eligible || '...'}`}
          icon="lucide:users-2"
        />
        <StatCard
          title="Voting Period"
          description="Sep 21 - Oct 4"
          icon="lucide:calendar"
        />
        <StatCard
          title="Total Rewards"
          description="8M OP"
          icon="lucide:award"
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
