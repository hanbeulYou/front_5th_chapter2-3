import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "../../../entities/post/api/createPost"
import { NewPost, Post } from "../../../entities/post/model"

interface PostsData {
  posts: Post[]
  total: number
}

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: NewPost) => createPost({ newPost }),
    onSuccess: (newPostData) => {
      queryClient.setQueryData(["posts", 0, 10, "", ""], (oldData: PostsData) => ({
        posts: [newPostData, ...(oldData?.posts || [])],
        total: (oldData?.total || 0) + 1,
      }))
    },
  })
}
