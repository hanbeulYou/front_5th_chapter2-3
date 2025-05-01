import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateComment } from "../../../entities/comment/api"
import { Comment } from "../../../entities/comment/model"
export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (selectedComment: Comment) => updateComment({ selectedComment }),
    onSuccess: (updatedComment) => {
      queryClient.setQueryData(["comments", updatedComment.postId], (old: Comment[] = []) =>
        old.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)),
      )
    },
  })
}
