import { Button } from "../../../shared/ui"
import { Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model"

interface PostDeleteButtonProps {
  post: Post
  deletePostById: (id: number) => Promise<void>
}
export const PostDeleteButton = ({ post, deletePostById }: PostDeleteButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => deletePostById(post.id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
