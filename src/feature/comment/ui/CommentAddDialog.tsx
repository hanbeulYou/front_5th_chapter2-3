import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useAddCommentMutation, useCommentStore } from "../model"

export const CommentAddDialog = () => {
  const { newComment, setNewComment, showAddCommentDialog, setShowAddCommentDialog } = useCommentStore()

  const addCommentMutation = useAddCommentMutation()

  const handleAddComment = async () => {
    await addCommentMutation.mutateAsync(newComment)
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
