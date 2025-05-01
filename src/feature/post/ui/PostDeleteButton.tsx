import { Button } from "../../../shared/ui"
import { Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model"
import { useDeletePostMutation } from "../model"

interface PostDeleteButtonProps {
  post: Post
}
export const PostDeleteButton = ({ post }: PostDeleteButtonProps) => {
  const deletePostMutation = useDeletePostMutation()

  const handleDeletePost = async (id: number) => {
    try {
      await deletePostMutation.mutateAsync(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
