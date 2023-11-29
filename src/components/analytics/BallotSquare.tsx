import { useState } from "react";
import { ballotsColor } from "../../utils/project";
import { Tooltip } from "antd";

export interface BallotProjectVote {
  projectId: string;
  projectName: string;
  votes: number;
}

export default function BallotSquare({
  projectId,
  projectName,
  votes,
}: BallotProjectVote) {
  const [ popoverOpen, setPopoverOpen ] = useState(false)
  const [ bgColor ] = ballotsColor(votes)

  return (
    <div className="hover:cursor-pointer" onClick={() => {
      if (popoverOpen) {
        window.open(`https://retrolist.app/project/${projectId}`)
      }
    }}>
      <Tooltip title={`${projectName}: ${votes}`} onOpenChange={open => setPopoverOpen(open)}>
        <div className="rounded w-4 h-4" style={{ background: bgColor }}></div>
      </Tooltip>
    </div>
    
  )
}
