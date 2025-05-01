import { Button } from "../../../shared/ui"
import { MessageSquare } from "lucide-react"
import { useDialogStore, useSelectedPostStore } from "../model"
import { Post } from "../../../entities/post/model"

interface PostDetailButtonProps {
  post: Post
}

export const PostDetailButton = ({ post }: PostDetailButtonProps) => {
  const { setShowDetailDialog } = useDialogStore()
  const { setSelectedPost } = useSelectedPostStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedPost(post)
        setShowDetailDialog(true)
      }}
    >
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
