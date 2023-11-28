import React from "react"
import { ballotsColor } from "../../utils/project";

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
  let count5 = 0;
  let count10 = 0;
  let count14 = 0;
  let count17 = 0;
  let countActive = 0;
  let totalCount = 0;

  for (const projectId in ballots) {
    if (ballots[projectId] < 5) {
      count5++;
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

  const [ color5 ] = ballotsColor(4)
  const [ color10 ] = ballotsColor(9)
  const [ color14 ] = ballotsColor(13)
  const [ color17 ] = ballotsColor(16)
  const [ colorActive ] = ballotsColor(17)

  return (
    <div>
      <div className="flex rounded-xl overflow-hidden">
        <div style={{ width: (countActive / totalCount * 100) + '%', background: colorActive, height: PROGRESS_HEIGHT }}></div>
        <div style={{ width: (count17 / totalCount * 100) + '%', background: color17, height: PROGRESS_HEIGHT }}></div>
        <div style={{ width: (count14 / totalCount * 100) + '%', background: color14, height: PROGRESS_HEIGHT }}></div>
        <div style={{ width: (count10 / totalCount * 100) + '%', background: color10, height: PROGRESS_HEIGHT }}></div>
        <div style={{ width: (count5 / totalCount * 100) + '%', background: color5, height: PROGRESS_HEIGHT }}></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-12 flex-wrap mt-2">
        <BallotLegend label="Passed" color={colorActive} count={countActive}></BallotLegend>
        <BallotLegend label="14 - 16 Votes" color={color17} count={count17}></BallotLegend>
        <BallotLegend label="10 - 13 Votes" color={color14} count={count14}></BallotLegend>
        <BallotLegend label="5 - 9 Votes" color={color10} count={count10}></BallotLegend>
        <BallotLegend label="0 - 4 Votes" color={color5} count={count5}></BallotLegend>
      </div>
    </div>
  )
}