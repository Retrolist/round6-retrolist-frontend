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

      <div>
        <Alert type="warning" description="Under Testing!"></Alert>
      </div>

      {comments.map(comment => (
        <div key={comment.hash}>
          <FarcasterEmbed username={comment.username} hash={comment.hash} />
        </div>
      ))}
    </div>
  )
}