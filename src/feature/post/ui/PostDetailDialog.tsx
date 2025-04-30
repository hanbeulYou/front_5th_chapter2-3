import { Dialog, DialogContent, DialogHeader, DialogTitle, HighlightText } from "../../../shared/ui"
import { Comments } from "../../comment/ui"
import { useDialogStore, useSelectedPostStore, useSearchStore } from "../model"

export const PostDetailDialog = () => {
  const { showDetailDialog, setShowDetailDialog } = useDialogStore()
  const { selectedPost } = useSelectedPostStore()
  const { searchQuery } = useSearchStore()

  if (!selectedPost) return null

  return (
    <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{HighlightText(selectedPost.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{HighlightText(selectedPost.body, searchQuery)}</p>
          <Comments postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
