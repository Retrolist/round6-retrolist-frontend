import React from "react";
import Layout from "../../components/Layout";
import { useIncludedInBallots } from "../../hooks/useIncludedInBallots";
import { Spin } from "antd";
import BallotProgress from "../../components/analytics/BallotProgress";
import recategorization from "../../dataset/recategorization.json";
import BallotSquares from "../../components/analytics/BallotSquares";

export function Analytics() {
  const [ballots, loading] = useIncludedInBallots();

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
        <div className="text-2xl font-bold">Ballots Overview</div>
        <div className="mt-3">
          <BallotProgress ballots={ballots} />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-2xl font-bold mb-3">Ballots by Category</div>
        <div>
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
        </div>
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
