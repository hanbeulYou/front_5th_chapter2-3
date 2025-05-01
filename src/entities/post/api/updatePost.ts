import { axiosInstance } from "../../../shared/api"
import { Post } from "../model"

interface UpdatePostRequest {
  selectedPost: Post
}

type UpdatePostResponse = Post

export const updatePost = async ({ selectedPost }: UpdatePostRequest): Promise<UpdatePostResponse> => {
  const response = await axiosInstance.put(`/posts/${selectedPost.id}`, selectedPost)
  const data = response.data
  return data
}
