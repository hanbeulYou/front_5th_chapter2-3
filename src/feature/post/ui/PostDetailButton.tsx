import { Button } from "../../../shared/ui"
import { MessageSquare } from "lucide-react"
import { Post } from "../../../entities/post/model"

interface PostDetailButtonProps {
  post: Post
  openPostDetail: (post: Post) => void
}

export const PostDetailButton = ({ post, openPostDetail }: PostDetailButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        openPostDetail(post)
      }}
    >
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
