import React from "react";
import Layout from "../../components/Layout";
import { useIncludedInBallots } from "../../hooks/useIncludedInBallots";
import { Spin } from "antd";
import BallotProgress from "../../components/analytics/BallotProgress";
import recategorization from "../../dataset/recategorization.json";
import BallotSquares from "../../components/analytics/BallotSquares";
import TotalOPProgress from "../../components/analytics/TotalOPProgress";
import { useOPDistribution } from "../../hooks/useOPDistribution";
import { useOPDistributionR4 } from "../../hooks/useOPDistributionR4";
import { sum } from "lodash";

export function Analytics() {
  const [categories, categoriesOSS, ballots, loading] = useOPDistributionR4();

  const metricsSummary = [
    {
      title: "Gas Fees",
      percent: 31.45,
    },
    {
      title: "Trusted Users Onboarded",
      percent: 12.49,
    },
    {
      title: "Transactions",
      percent: 9.51,
    },
    {
      title: "Trusted Recurring Users",
      percent: 8.67,
    },
    {
      title: "Average Trusted Monthly Active Users",
      percent: 6.52,
    },
    {
      title: "Transactions from Trusted Users",
      percent: 6.05,
    },
    {
      title: "Recurring Addresses",
      percent: 5.16,
    },
    {
      title: "Average Monthly Active Addresses",
      percent: 5.11,
    },
    {
      title: "Trusted Users",
      percent: 4.05,
    },
    {
      title: "Trusted Users Share of Transactions",
      percent: 3.18,
    },
    {
      title: "Power User Addresses",
      percent: 3,
    },
    {
      title: "Average Trusted Daily Active Users",
      percent: 2.74,
    },
    {
      title: "Average Daily Active Addresses",
      percent: 2.06,
    },
  ];

  // console.log(categories);

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="text-2xl font-bold">Overview</div>
        <div className="mt-3">
          <TotalOPProgress ballots={ballots} showLegend={true} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="mb-6 flex-grow">
          <div>
            <div className="mb-4">
              <div className="font-bold mb-2">By Categories</div>
              <div className="">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "DeFi",
                    "Cross Chain",
                    "Utility",
                    "Social",
                    "NFT",
                    "Governance",
                  ].map((category) => (
                    <div className="border border-gray-200 bg-white rounded-xl p-3 px-4 w-100">
                      <div className="flex flex-col justify-between h-full">
                        <div className="text-xs text-[#4C4E64]">{category}</div>
                        <div>
                          <div className="my-1 mb-2 text-xl text-[#272930] font-bold flex items-center">
                            {(
                              sum(Object.values(categories[category])) / 1000000
                            ).toFixed(2)}
                            M
                            <img
                              src="/img/platform/op.png"
                              className="w-5 h-5 ml-1"
                              alt="OP"
                            ></img>
                          </div>
                          <div>
                            <TotalOPProgress
                              ballots={categories[category]}
                              showLegend={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <div className="font-bold mb-2">Open Source</div>
              <div className="">
                <div className="grid grid-cols-2 gap-4">
                  {["Open Source", "Closed Source"].map((category) => (
                    <div className="border border-gray-200 bg-white rounded-xl p-3 px-4 w-100">
                      <div className="flex flex-col justify-between h-full">
                        <div className="text-xs text-[#4C4E64]">{category}</div>
                        <div>
                          <div className="my-1 mb-2 text-xl text-[#272930] font-bold flex items-center">
                            {(
                              sum(Object.values(categoriesOSS[category])) /
                              1000000
                            ).toFixed(2)}
                            M
                            <img
                              src="/img/platform/op.png"
                              className="w-5 h-5 ml-1"
                              alt="OP"
                            ></img>
                          </div>
                          <div>
                            <TotalOPProgress
                              ballots={categoriesOSS[category]}
                              showLegend={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6" style={{ minWidth: 310 }}>
          <div className="font-bold mb-2">Metrics Distribution</div>

          {metricsSummary.map(metric => (
            <div>
              <div className="flex justify-between text-sm text-[#4C4E64]">
                <div>
                  {metric.title}
                </div>

                <div className="flex items-center font-bold">
                  {(metric.percent / 10).toFixed(2)}M
                  <img
                    src="/img/platform/op.png"
                    className="w-4 h-4 ml-1 shrink-0"
                    alt="OP"
                  ></img>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 hidden">
        {/* <div className="text-2xl font-bold mb-3">Ballots by Category</div> */}
        {/* <div>
          {recategorization.map((collection) => (
            <div className="mb-4">
              <div className="text-xl font-bold mb-2">{collection.name}</div>

              <div>
                {collection.ranking.map((category) => (
                  <div className="mb-2">
                    <div className="mb-1">{category.name}</div>

                    <div>
                      <BallotSquares
                        projects={category.ranking.map((x) => ({
                          id: x.RPGF3Id,
                          name: x.name,
                        }))}
                        ballots={ballots}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Layout>
      <Analytics />
    </Layout>
  );
}

export const AnalyticsPageRoute = {
  path: "/analytics",
  element: <AnalyticsPage />,
};
