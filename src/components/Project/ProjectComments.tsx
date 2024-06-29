import axios from "axios"
import { useState, useCallback, useEffect } from "react"
import { FarcasterComment } from "../../types/Farcaster"
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";
import { Alert } from "antd";

export default function ProjectComments({ projectId }: { projectId: string }) {
  const [comments, setComments] = useState<FarcasterComment[]>([])
  const [hash, setHash] = useState('')

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_HOST}/projects/${projectId}/comments`)
      setComments(response.data.comments)
      setHash(response.data.hash)
    } catch (err) {
      console.error(err)
      window.alert('Load failed')
    }
  }, [projectId])

  useEffect(() => {
    fetchComments()
  }, [projectId])

  return (
    <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
      <div className="text-2xl">Comments</div>

      <div className="mt-3 hidden">
        <Alert type="warning" description="Under Testing!"></Alert>
      </div>

      {!hash && <div className="mt-3 text-[#4C4E64AD] text-sm">Loading...</div>}
      {hash && comments.length == 0 && <div className="mt-3 text-[#4C4E64AD] text-sm">--- No Comments ---</div>}

      {hash &&
        <a href={`https://warpcast.com/retrolist/${hash.substring(0, 10)}`} target="_blank" className="flex my-3">
          <div className="rounded-lg px-5 py-3 bg-[#472A91] text-white hover:cursor-pointer hover:scale-105 transition flex items-center text-lg">
            <div><img src="/img/social/warpcast.png" className="w-6 h-6 mr-2"></img></div>
            <div>Comment on Warpcast</div>
          </div>
        </a>
      }

      {comments.map(comment => (
        <div key={comment.hash}>
          <FarcasterEmbed username={comment.username} hash={comment.hash} />
        </div>
      ))}
    </div>
  )
}