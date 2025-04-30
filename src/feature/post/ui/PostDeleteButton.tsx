import { Button } from "../../../shared/ui"
import { Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model"
import { useDeletePostMutation } from "../model"

interface PostDeleteButtonProps {
  post: Post
}
export const PostDeleteButton = ({ post }: PostDeleteButtonProps) => {
  const deletePostById = useDeletePostMutation()

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePostById.mutate(post.id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
