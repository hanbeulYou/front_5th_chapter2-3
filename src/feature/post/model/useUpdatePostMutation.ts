import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePost } from "../../../entities/post/api/updatePost"
import { Post } from "../../../entities/post/model"

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (selectedPost: Post) => updatePost({ selectedPost }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
