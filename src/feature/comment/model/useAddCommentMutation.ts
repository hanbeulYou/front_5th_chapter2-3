import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NewComment } from "../../../entities/comment/model"
import { createComment } from "../../../entities/comment/api"
import { Comment } from "../../../entities/comment/model"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newComment: NewComment) => createComment({ newComment }),
    onSuccess: (data) => {
      queryClient.setQueryData(["comments", data.postId], (old: Comment[] = []) => [...old, data])
    },
  })
}
