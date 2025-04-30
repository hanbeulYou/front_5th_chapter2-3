import { Post } from "../../../entities/post/model"
import { useCommentManagement } from "../../../feature/comment/model"
import { useDialogStore } from "./useDialogStore"
import { useSelectedPostStore } from "./useSelectedPostStore"

export const usePostDetail = () => {
  const { showDetailDialog, setShowDetailDialog } = useDialogStore()
  const { setSelectedPost } = useSelectedPostStore()
  const { loadComments } = useCommentManagement()

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    loadComments(post.id)
    setShowDetailDialog(true)
  }

  return {
    showDetailDialog,
    setShowDetailDialog,
    openPostDetail,
  }
}
