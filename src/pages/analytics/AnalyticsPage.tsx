import React from "react";
import Layout from "../../components/Layout";
import { useIncludedInBallots } from "../../hooks/useIncludedInBallots";
import { Spin } from "antd";
import BallotProgress from "../../components/analytics/BallotProgress";
import recategorization from "../../dataset/recategorization.json";
import BallotSquares from "../../components/analytics/BallotSquares";
import TotalOPProgress from "../../components/analytics/TotalOPProgress";
import { useOPDistribution } from "../../hooks/useOPDistribution";

export function Analytics() {
  const [categories, ballots, loading] = useOPDistribution();

  console.log(categories)

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

      <div className="mb-6">
        <div>
          {recategorization.map((collection) => (
            <div className="mb-4">
              <div className="font-bold mb-2">{collection.name} - {(categories[collection.name].total / 1000000).toFixed(2)}M</div>
              <div className="overflow-auto">
                <div className="flex gap-4">
                  {collection.ranking.sort((a, b) => (
                    categories[b.name].total - categories[a.name].total
                  )).map((category) => (
                    <div className="lg:w-1/5 border border-gray-200 bg-white rounded-xl p-3 px-4" style={{ minWidth: 140 }}>
                      <div className="flex flex-col justify-between h-full">
                        <div className="text-xs text-[#4C4E64]">{category.name}</div>
                        <div>
                          <div className="my-1 mb-2 text-xl text-[#272930] font-bold">{(categories[category.name].total / 1000000).toFixed(2)}M</div>
                          <div>
                            <TotalOPProgress ballots={categories[category.name].projects} showLegend={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
