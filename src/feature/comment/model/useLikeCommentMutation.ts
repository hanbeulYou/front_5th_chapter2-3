import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "../../../entities/comment/model"
import { likeComment } from "../../../entities/comment/api"

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, postId }: { commentId: number; postId: number }) => {
      const comments = queryClient.getQueryData<Comment[]>(["comments", postId]) || []
      const comment = comments.find((c) => c.id === commentId)
      if (!comment) throw new Error("Comment not found")
      return likeComment({ commentId: commentId, comment })
    },
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comment[]>(["comments", updatedComment.postId], (old = []) =>
        old.map((comment) =>
          comment.id === updatedComment.id ? { ...updatedComment, likes: comment.likes + 1 } : comment,
        ),
      )
    },
  })
}
