import React from "react"
import { ballotsColor } from "../../utils/project";
import { Tooltip } from "antd";

const LEVELS = [75000, 100000, 125000, 150000]

const PROGRESS_HEIGHT = 10

function TotalOPLegend({ color, label, count }: { color: string, label: string, count: number }) {
  return (
    <div className="flex items-center">
      <div className="w-4 h-4 mr-2 rounded" style={{ background: color }}></div>
      <div className="text-sm" style={{ color }}>{label}: {count}</div>
    </div>
  )
}

function totalOpColor(totalOp: number): [ string, string ] {
  let bgColor = ''
  let fgColor = ''

  if (!totalOp) {
    bgColor = '#CCCCCC' // Light Gray
    fgColor = '#000000'
  } else if (totalOp <= LEVELS[0]) {
    bgColor = '#FFCCCB' // Light Red
    fgColor = '#990000' 
  } else if (totalOp <= LEVELS[1]) {
    bgColor = '#FFD099'
    fgColor = '#CC4C10'
  } else if (totalOp <= LEVELS[2]) {
    bgColor = '#ffffe0'
    fgColor = '#ee9902'
  } else if (totalOp <= LEVELS[3]) {
    bgColor = '#E9FFC2'
    fgColor = '#82954B'
  } else {
    // bgColor = '#E9FFC2'
    // fgColor = '#379237'

    bgColor = '#BFDBFE'
    fgColor = '#1D4ED8'
  }

  return [ fgColor, bgColor ]
}

export default function TotalOPProgressR5({ ballots, showLegend = true }: { ballots: {[projectId: string]: number}, showLegend: boolean }) {
  let count2 = 0;
  let count6 = 0;
  let count10 = 0;
  let count14 = 0;
  let count17 = 0;
  let countActive = 0;
  let totalCount = 0;

  for (const projectId in ballots) {
    if (!ballots[projectId]) {
      count2++;
    } else if (ballots[projectId] < LEVELS[0]) {
      count6++;
    } else if (ballots[projectId] < LEVELS[1]) {
      count10++;
    } else if (ballots[projectId] < LEVELS[2]) {
      count14++;
    } else if (ballots[projectId] < LEVELS[3]) {
      count17++;
    } else {
      countActive++;
    }
    totalCount++;
  }

  const [ color2 ] = totalOpColor(0)
  const [ color6 ] = totalOpColor(LEVELS[0])
  const [ color10 ] = totalOpColor(LEVELS[1])
  const [ color14 ] = totalOpColor(LEVELS[2])
  const [ color17 ] = totalOpColor(LEVELS[3])
  const [ colorActive ] = totalOpColor(99999999)

  return (
    <div>
      <div className="flex rounded-xl">
        <Tooltip title={`>${LEVELS[3] / 1000}k OP: ${countActive}`}>
          <div style={{ width: (countActive / totalCount * 100) + '%', background: colorActive, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`${LEVELS[2] / 1000}k - ${LEVELS[3] / 1000}k OP: ${count17}`}>
          <div style={{ width: (count17 / totalCount * 100) + '%', background: color17, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`${LEVELS[1] / 1000}k - ${LEVELS[2] / 1000}k OP: ${count14}`}>
          <div style={{ width: (count14 / totalCount * 100) + '%', background: color14, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`${LEVELS[0] / 1000}k - ${LEVELS[1] / 1000}k OP: ${count10}`}>
          <div style={{ width: (count10 / totalCount * 100) + '%', background: color10, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`<${LEVELS[0] / 1000}k OP: ${count6}`}>
          <div style={{ width: (count6 / totalCount * 100) + '%', background: color6, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>

        {/* <Tooltip title={`Ineligible: ${count2}`}>
          <div style={{ width: (count2 / totalCount * 100) + '%', background: color2, height: PROGRESS_HEIGHT }}></div>
        </Tooltip> */}

      </div>

      {showLegend && (
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-1 sm:gap-x-12 flex-wrap mt-2">
          <TotalOPLegend label={`>${LEVELS[3] / 1000} OP`} color={colorActive} count={countActive}></TotalOPLegend>
          <TotalOPLegend label={`${LEVELS[2] / 1000}k - ${LEVELS[3] / 1000}k OP`} color={color17} count={count17}></TotalOPLegend>
          <TotalOPLegend label={`${LEVELS[1] / 1000}k - ${LEVELS[2] / 1000}k OP`} color={color14} count={count14}></TotalOPLegend>
          <TotalOPLegend label={`${LEVELS[0] / 1000}k - ${LEVELS[1] / 1000}k OP`} color={color10} count={count10}></TotalOPLegend>
          <TotalOPLegend label={`<${LEVELS[0] / 1000}k OP`} color={color6} count={count6}></TotalOPLegend>
          {/* <TotalOPLegend label="Ineligible" color={color2} count={count2}></TotalOPLegend> */}
        </div>
      )}
    </div>
  )
}