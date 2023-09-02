import React from "react"

export default function LayoutSideInfo({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "300px auto",
        columnGap: 30,
      }}
    >
      <div>
        <img src="/img/sideinfo.png" alt="Side Info" width={300} />
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}