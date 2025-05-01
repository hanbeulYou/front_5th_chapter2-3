import { Post } from "../../../entities/post/model"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { useDialogStore, useSelectedPostStore, useUpdatePostMutation } from "../model"

export const PostEditDialog = () => {
  const { showEditDialog, setShowEditDialog } = useDialogStore()
  const { selectedPost, setSelectedPost } = useSelectedPostStore()

  const updatePostMutation = useUpdatePostMutation()

  // 게시물 업데이트
  const handleUpdatePost = async () => {
    if (!selectedPost) return
    try {
      await updatePostMutation.mutateAsync(selectedPost)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...(selectedPost as Post), title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...(selectedPost as Post), body: e.target.value })}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
