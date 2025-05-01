import { Post } from "../../../entities/post/model"
import { useDialogStore } from "./useDialogStore"
import { useSelectedPostStore } from "./useSelectedPostStore"

export const usePostDetail = () => {
  const { showDetailDialog, setShowDetailDialog } = useDialogStore()
  const { setSelectedPost } = useSelectedPostStore()

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  return {
    showDetailDialog,
    setShowDetailDialog,
    openPostDetail,
  }
}
