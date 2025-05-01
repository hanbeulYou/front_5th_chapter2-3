import { axiosInstance } from "../../../shared/api"
import { NewPost, Post } from "../model"

interface CreatePostRequest {
  newPost: NewPost
}

type CreatePostResponse = Post

export const createPost = async ({ newPost }: CreatePostRequest): Promise<CreatePostResponse> => {
  const response = await axiosInstance.post("/posts/add", newPost)
  const data = response.data
  return data
}
