import React from "react"
import Layout from "../../components/Layout"
import { useIncludedInBallots } from "../../hooks/useIncludedInBallots"
import { Spin } from "antd"
import BallotProgress from "../../components/analytics/BallotProgress"

export default function AnalyticsPage() {
  const [ ballots, loading ] = useIncludedInBallots()

  console.log(ballots)

  if (loading) {
    return (
      <Layout>
        <div>
          <Spin />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="text-2xl font-bold">Ballots Overview</div>

        <div className="mt-3">
          <BallotProgress ballots={ballots} />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-2xl font-bold">Ballots by Category</div>

        <div>

        </div>
      </div>
    </Layout>
  )
}

export const AnalyticsPageRoute = {
  path: "/analytics",
  element: <AnalyticsPage />,
};
