import { useState } from "react"
import { Post } from "../../../entities/post/model"
import { useCommentManagement } from "../../../feature/commentManagement/model"

export const usePostDetail = ({
  setSelectedPost,
}: {
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
}) => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  const { loadComments } = useCommentManagement()

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    loadComments(post.id)
    setShowPostDetailDialog(true)
  }

  return {
    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetail,
  }
}
