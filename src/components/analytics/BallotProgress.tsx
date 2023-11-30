import React from "react"
import { ballotsColor } from "../../utils/project";
import { Tooltip } from "antd";

const PROGRESS_HEIGHT = 10

function BallotLegend({ color, label, count }: { color: string, label: string, count: number }) {
  return (
    <div className="flex items-center">
      <div className="w-4 h-4 mr-2 rounded" style={{ background: color }}></div>
      <div className="text-sm" style={{ color }}>{label}: {count}</div>
    </div>
  )
}

export default function BallotProgress({ ballots }: { ballots: {[projectId: string]: number} }) {
  let count2 = 0;
  let count6 = 0;
  let count10 = 0;
  let count14 = 0;
  let count17 = 0;
  let countActive = 0;
  let totalCount = 0;

  for (const projectId in ballots) {
    if (ballots[projectId] < 2) {
      count2++;
    } else if (ballots[projectId] < 6) {
      count6++;
    } else if (ballots[projectId] < 10) {
      count10++;
    } else if (ballots[projectId] < 14) {
      count14++;
    } else if (ballots[projectId] < 17) {
      count17++;
    } else {
      countActive++;
    }
    totalCount++;
  }

  const [ color2 ] = ballotsColor(0)
  const [ color6 ] = ballotsColor(4)
  const [ color10 ] = ballotsColor(9)
  const [ color14 ] = ballotsColor(13)
  const [ color17 ] = ballotsColor(16)
  const [ colorActive ] = ballotsColor(17)

  return (
    <div>
      <div className="flex rounded-xl overflow-hidden">
        <Tooltip title={`Passed: ${countActive}`}>
          <div style={{ width: (countActive / totalCount * 100) + '%', background: colorActive, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`14 - 16 Votes: ${countActive}`}>
          <div style={{ width: (count17 / totalCount * 100) + '%', background: color17, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`10 - 13 Votes: ${countActive}`}>
          <div style={{ width: (count14 / totalCount * 100) + '%', background: color14, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`6 - 9 Votes: ${countActive}`}>
          <div style={{ width: (count10 / totalCount * 100) + '%', background: color10, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>
        
        <Tooltip title={`2 - 5 Votes: ${countActive}`}>
          <div style={{ width: (count6 / totalCount * 100) + '%', background: color6, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>

        <Tooltip title={`0 - 1 Votes: ${countActive}`}>
          <div style={{ width: (count2 / totalCount * 100) + '%', background: color2, height: PROGRESS_HEIGHT }}></div>
        </Tooltip>

      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-x-12 flex-wrap mt-2">
        <BallotLegend label="Passed" color={colorActive} count={countActive}></BallotLegend>
        <BallotLegend label="14 - 16 Votes" color={color17} count={count17}></BallotLegend>
        <BallotLegend label="10 - 13 Votes" color={color14} count={count14}></BallotLegend>
        <BallotLegend label="6 - 9 Votes" color={color10} count={count10}></BallotLegend>
        <BallotLegend label="2 - 5 Votes" color={color6} count={count6}></BallotLegend>
        <BallotLegend label="0 - 1 Votes" color={color2} count={count2}></BallotLegend>
      </div>
    </div>
  )
}