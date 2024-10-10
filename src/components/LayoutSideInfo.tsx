import React from "react";
import { StatCard } from "./StatCard";
import { useProjectCount } from "../hooks/useProjectCount";
import { apiRound } from "../utils/api";

function topic(round: string) {
  switch (round) {
    case '5': return 'OP Stack'
    case '6': return 'Governance'
    default: return ''
  }
}

function votingPeriod(round: string) {
  switch (round) {
    case '5': return 'Sep 30 - Oct 14'
    case '6': return 'Oct 28th - Nov 7th'
    default: return ''
  }
}

function reward(round: string) {
  switch (round) {
    case '5': return '2M - 8M OP'
    case '6': return '1.1M - 3.5M OP'
    default: return ''
  }
}

export default function LayoutSideInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  const projectCount = useProjectCount()
  const round = apiRound()

  return (
    <div className="container 2xl:max-w-[1440px] mt-11">
      <div className="relative hero-section-gradient-bg rounded-2xl flex items-center px-20 h-60 pb-8">
        <div className="hidden sm:block" style={{ maxWidth: 'calc(100% - 260px)' }}>
          <div className="text-3xl lg:text-4xl font-bold">
            Retro Funding {round}: <span className="text-red-600">{topic(round)}</span>
          </div>
          <p className="pt-3 w-full hidden md:block">
            Rewarding projects and contributors that contribute to the {topic(round)}
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
          title={projectCount.eligible ? "Eligible Projects" : "Projects"}
          description={`${projectCount.eligible || projectCount.total || '...'}`}
          icon="lucide:users-2"
        />
        <StatCard
          title="Voting Period"
          description={votingPeriod(round)}
          icon="lucide:calendar"
        />
        <StatCard
          title="Total Rewards"
          description={reward(round)}
          icon="lucide:award"
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
