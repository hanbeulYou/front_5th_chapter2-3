import { axiosInstance } from "../../../shared/api"
import { Comment } from "../model"

interface FetchCommentsByPostIdRequest {
  postId: number
}

export interface FetchCommentsByPostIdResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export const fetchCommentsByPostId = async ({
  postId,
}: FetchCommentsByPostIdRequest): Promise<FetchCommentsByPostIdResponse> => {
  const response = await axiosInstance.get(`/comments/post/${postId}`)
  const data = response.data
  return data
}
