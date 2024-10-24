import React from "react"
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined"
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined"
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined"
import CheckOutlined from "@ant-design/icons/CheckOutlined"
import { ballotsColor } from "../../utils/project"

export default function ProjectEligibilityBadge({ status, ballots = 0, size = 'xs' }: { status: string, ballots?: number, size?: string }) {
  // console.log(status)

  if (status.toLowerCase() == 'keep') {
    return (
      <div className={`rounded-2xl px-3 py-1 border-2 border-green-600 text-green-800 bg-green-100 text-${size}`}>
        <CheckOutlined />
      </div>
    )
  }

  if (status.toLowerCase() == 'keep') {
    const [ fgColor, bgColor ] = ballotsColor(ballots)

    return (
      <div className={`rounded-2xl font-bold px-3 py-1 border-2 text-${size}`} style={{
        backgroundColor: bgColor,
        color: fgColor,
        borderColor: fgColor,
      }}>
        {ballots >= 17 && <CheckOutlined />} {ballots} Vote
      </div>
    )
  }

  if (status.toLowerCase() == 'remove') {
    return (
      <div className={`rounded-2xl px-3 py-1 border-2 border-red-600 text-red-800 bg-red-100 text-${size}`}>
        <CloseCircleOutlined /> Rejected
      </div>
    )
  }

  if (status.toLowerCase() == 'missing') {
    return (
      <div className={`rounded-2xl px-3 py-1 border-2 border-red-600 text-red-800 bg-red-100 text-${size}`}>
        <ExclamationCircleOutlined /> Missing
      </div>
    )
    
  }

  if (status.toLowerCase() == '#n/a') {
    return (
      <div className={`rounded-2xl px-3 py-1 border-2 border-cyan-600 text-cyan-800 bg-cyan-100 text-${size}`}>
        <ClockCircleOutlined /> Reviewing
      </div>
    )
  }

  return (
    <div className={`rounded-2xl px-3 py-1 border-2 border-cyan-600 text-cyan-800 bg-cyan-100 text-${size}`}>
      <ClockCircleOutlined /> Reviewing
    </div>
  )
}