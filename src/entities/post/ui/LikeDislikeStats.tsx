import { ThumbsUp, ThumbsDown } from "lucide-react"

interface LikeDislikeStatsProps {
  likes: number
  dislikes: number
}

export const LikeDislikeStats = ({ likes, dislikes }: LikeDislikeStatsProps) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{dislikes || 0}</span>
    </div>
  )
}
