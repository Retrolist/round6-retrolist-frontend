import { useEffect, useState } from "react"
import BallotSquare, { BallotProjectVote } from "./BallotSquare"

export default function BallotSquares({ projects, ballots, limit = 0 }: { projects: {id: string, name: string}[], ballots: {[projectId: string]: number}, limit?: number }) {
  const [ items, setItems ] = useState<BallotProjectVote[]>([])
  const [ moreCount, setMoreCount ] = useState(0)

  useEffect(() => {
    let items: BallotProjectVote[] = []

    for (const project of projects) {
      items.push({
        projectId: project.id,
        projectName: project.name,
        votes: ballots[project.id] || 0,
      })
    }
    items.sort((a, b) => b.votes - a.votes)

    if (limit) {
      setMoreCount(Math.max(0, items.length - limit))
      items = items.slice(0, limit)
    }

    setItems(items)
  }, [ projects ])
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map(item => (
        <div key={item.projectId}>
          <BallotSquare {...item} />
        </div>
      ))}

      {moreCount > 0 && <div className="text-gray-600 text-xs">+{moreCount}</div>}
    </div>
  )
}