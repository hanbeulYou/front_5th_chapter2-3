import { Comment } from "../model"

interface FetchCommentsByPostIdRequest {
  postId: number
}

interface FetchCommentsByPostIdResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export const fetchCommentsByPostId = async ({
  postId,
}: FetchCommentsByPostIdRequest): Promise<FetchCommentsByPostIdResponse> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}
