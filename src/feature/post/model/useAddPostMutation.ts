import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "../../../entities/post/api/createPost"
import { NewPost } from "../../../entities/post/model"

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost: NewPost) => createPost({ newPost }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
