import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button, HighlightText } from "../../../shared/ui"
import { useCommentsQuery, useCommentStore, useDeleteCommentMutation, useLikeCommentMutation } from "../model"
import { useSearchStore } from "../../post/model"

export const Comments = ({ postId }: { postId: number }) => {
  const { searchValue } = useSearchStore()
  const { setSelectedComment, setShowAddCommentDialog, setShowEditCommentDialog, resetNewComment } = useCommentStore()

  const { data: comments } = useCommentsQuery(postId)

  const deleteCommentMutation = useDeleteCommentMutation()
  const likeCommentMutation = useLikeCommentMutation()

  const handleDeleteComment = async (commentId: number, postId: number) => {
    await deleteCommentMutation.mutateAsync({
      commentId,
      postId,
    })
  }

  const handleLikeComment = async (commentId: number, postId: number) => {
    await likeCommentMutation.mutateAsync({
      commentId,
      postId,
    })
  }
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            resetNewComment()
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="font-medium truncate">{comment.user.username}:</span>
                <span className="truncate">{HighlightText(comment.body, searchValue)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
                  <ThumbsUp className="w-3 h-3" />
                  <span className="ml-1 text-xs">{comment.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedComment(comment)
                    setShowEditCommentDialog(true)
                  }}
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id, postId)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
