import { axiosInstance } from "../../../shared/api"
import { Post } from "../model"

interface DeletePostRequest {
  postId: number
}

type DeletePostResponse = Post

export const deletePost = async ({ postId }: DeletePostRequest): Promise<DeletePostResponse> => {
  const response = await axiosInstance.delete(`/posts/${postId}`)
  const data = response.data
  return data
}
