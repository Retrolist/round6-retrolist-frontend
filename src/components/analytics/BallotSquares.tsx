import { useEffect, useState } from "react"
import BallotSquare, { BallotProjectVote } from "./BallotSquare"

export default function BallotSquares({ projects, ballots }: { projects: {id: string, name: string}[], ballots: {[projectId: string]: number}}) {
  const [ items, setItems ] = useState<BallotProjectVote[]>([])

  useEffect(() => {
    const items: BallotProjectVote[] = []
    for (const project of projects) {
      items.push({
        projectId: project.id,
        projectName: project.name,
        votes: ballots[project.id] || 0,
      })
    }
    items.sort((a, b) => b.votes - a.votes)
    setItems(items)
  }, [ projects ])
  
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <div key={item.projectId}>
          <BallotSquare {...item} />
        </div>
      ))}
    </div>
  )
}