import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useSelectedPostStore } from "../../post/model"
import { useCommentStore, useUpdateCommentMutation } from "../model"
import { Comment } from "../../../entities/comment/model"

export const CommentEditDialog = () => {
  const { selectedComment, setSelectedComment, showEditCommentDialog, setShowEditCommentDialog } = useCommentStore()
  const { selectedPost } = useSelectedPostStore()

  const updateCommentMutation = useUpdateCommentMutation()

  const handleUpdateComment = async () => {
    if (!selectedPost || !selectedComment) return

    await updateCommentMutation.mutateAsync({
      ...selectedComment,
      postId: selectedPost.id,
    })
    setShowEditCommentDialog(false)
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...(selectedComment as Comment), body: e.target.value })}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
