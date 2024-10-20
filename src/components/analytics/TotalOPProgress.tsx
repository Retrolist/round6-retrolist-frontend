import React from "react"
import { ballotsColor, totalOpColor } from "../../utils/project";
import { Tooltip } from "antd";

const PROGRESS_HEIGHT = 10

function TotalOPLegend({ color, label, count }: { color: string, label: string, count: number }) {
  return (
    <div className="flex items-center">
      <div className="w-4 h-4 mr-2 rounded" style={{ background: color }}></div>
      <div className="text-sm" style={{ color }}>{label}: {count}</div>
    </div>
  )
}

export default function TotalOPProgress({ ballots, showLegend = true }: { ballots: {[projectId: string]: number}, showLegend: boolean }) {
  let count2 = 0;
  let count6 = 0;
  let count10 = 0;
  let count14 = 0;
  let count17 = 0;
  let countActive = 0;
  let totalCount = 0;

  for (const projectId in ballots) {
    if (ballots[projectId] < 1000) {
      count2++;
    } else if (ballots[projectId] < 5000) {
      count6++;
    } else if (ballots[projectId] < 20000) {
      count10++;
    } else if (ballots[projectId] < 50000) {
      count14++;
    } else if (ballots[projectId] < 100000) {
      count17++;
    } else {
      countActive++;
    }
    totalCount++;
  }

  const [ color2 ] = totalOpColor(0)
  const [ color6 ] = totalOpColor(1500)
  const [ color10 ] = totalOpColor(10000)
  const [ color14 ] = totalOpColor(24000)
  const [ color17 ] = totalOpColor(49000)
  const [ colorActive ] = totalOpColor(99000)

  return (
    <div>
      <div className="flex rounded-xl">
        <Tooltip title={`>100k OP: ${countActive}`}>
          <div style={{ width: (countActive / totalCount * 100) + '%', background: colorActive, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`50k - 100k OP: ${count17}`}>
          <div style={{ width: (count17 / totalCount * 100) + '%', background: color17, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`20k - 50k OP: ${count14}`}>
          <div style={{ width: (count14 / totalCount * 100) + '%', background: color14, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`5k - 20k OP: ${count10}`}>
          <div style={{ width: (count10 / totalCount * 100) + '%', background: color10, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`<5k OP: ${count6}`}>
          <div style={{ width: (count6 / totalCount * 100) + '%', background: color6, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>

        <Tooltip title={`Ineligible: ${count2}`}>
          <div style={{ width: (count2 / totalCount * 100) + '%', background: color2, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>

      </div>

      {showLegend && (
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-1 sm:gap-x-12 flex-wrap mt-2">
          <TotalOPLegend label=">100k OP" color={colorActive} count={countActive}></TotalOPLegend>
          <TotalOPLegend label="50k - 100k OP" color={color17} count={count17}></TotalOPLegend>
          <TotalOPLegend label="20k - 50k OP" color={color14} count={count14}></TotalOPLegend>
          <TotalOPLegend label="5k - 20k OP" color={color10} count={count10}></TotalOPLegend>
          <TotalOPLegend label="<5k OP" color={color6} count={count6}></TotalOPLegend>
          <TotalOPLegend label="Ineligible" color={color2} count={count2}></TotalOPLegend>
        </div>
      )}
    </div>
  )
}