import { Button } from "../../../shared/ui"
import { Edit2 } from "lucide-react"
import { Post } from "../../../entities/post/model"

interface PostEditButtonProps {
  post: Post
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
}
export const PostEditButton = ({ post, setSelectedPost, setShowEditDialog }: PostEditButtonProps) => {
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
