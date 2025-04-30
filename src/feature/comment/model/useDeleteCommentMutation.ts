import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../../../entities/comment/api"
import { Comment } from "../../../entities/comment/model"

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, postId }: { commentId: number; postId: number }) => deleteComment({ commentId }),
    onSuccess: (_, { postId, commentId }) => {
      queryClient.setQueryData<Comment[]>(["comments", postId], (old = []) =>
        old.filter((comment) => comment.id !== commentId),
      )
    },
  })
}
