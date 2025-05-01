import { Button } from "../../../shared/ui"
import { Edit2 } from "lucide-react"
import { Post } from "../../../entities/post/model"
import { useDialogStore, useSelectedPostStore } from "../model"

interface PostEditButtonProps {
  post: Post
}

export const PostEditButton = ({ post }: PostEditButtonProps) => {
  const { setSelectedPost } = useSelectedPostStore()
  const { setShowEditDialog } = useDialogStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedPost(post)
        setShowEditDialog(true)
      }}
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}
