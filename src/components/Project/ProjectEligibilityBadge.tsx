import React from "react"
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined"
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined"
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined"

export default function ProjectEligibilityBadge({ status, size = 'xs' }: { status: string, size?: string }) {
  // console.log(status)

  if (status.toLowerCase() == 'keep') {
    return (
      <div className={`rounded-2xl px-3 py-1 border-2 border-green-600 text-green-800 bg-green-100 text-${size}`}>
        <CheckCircleOutlined /> Eligible
      </div>
    )
  }

  if (status.toLowerCase() == 'remove') {
    return (
      <div className="rounded-2xl px-3 py-1 border-2 border-red-600 text-red-800 bg-red-100 text-xs">
        <CloseCircleOutlined /> Removed
      </div>
    )
  }

  if (status.toLowerCase() == '#n/a') {
    return (
      <div className="rounded-2xl px-3 py-1 border-2 border-cyan-600 text-cyan-800 bg-cyan-100 text-xs">
        <ClockCircleOutlined /> Pending Approval
      </div>
    )
  }

  return (
    <div className="rounded-2xl px-3 py-1 border-2 border-cyan-600 text-cyan-800 bg-cyan-100 text-xs">
      <ClockCircleOutlined /> Reviewing
    </div>
  )
}