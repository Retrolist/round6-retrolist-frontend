import React from "react"
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined"
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined"
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined"
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled"

export default function ListStatusBadge({ status, size = 'xs' }: { status: string, size?: string }) {
  // console.log(status)

  if (status.toLowerCase() == 'approved') {
    return (
      <div className={`flex gap-1 items-center rounded-2xl px-3 py-1 border-2 border-green-600 text-green-800 bg-green-100 text-${size}`}>
        <CheckCircleFilled /> Approved
      </div>
    )
  }

  if (status.toLowerCase() == 'qualified') {
    return (
      <div className={`flex gap-1 items-center rounded-2xl px-3 py-1 border-2 border-cyan-600 text-cyan-800 bg-cyan-100 text-${size}`}>
        <CheckCircleOutlined /> Qualified
      </div>
    )
  }

  if (status.toLowerCase() == 'banned') {
    return (
      <div className={`flex gap-1 items-center rounded-2xl px-3 py-1 border-2 border-red-600 text-red-800 bg-red-100 text-${size}`}>
        <CloseCircleOutlined /> Banned
      </div>
    )
  }

  return (
    <div className={`flex gap-1 items-center rounded-2xl px-3 py-1 border-2 border-cyan-600 text-cyan-800 bg-cyan-100 text-${size}`}>
      <ClockCircleOutlined /> Reviewing
    </div>
  )
}