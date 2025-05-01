import { axiosInstance } from "../../../shared/api"
import { Comment } from "../model"

interface LikeCommentRequest {
  commentId: number
  comment: Comment
}

type LikeCommentResponse = Comment

export const likeComment = async ({ commentId, comment }: LikeCommentRequest): Promise<LikeCommentResponse> => {
  const response = await axiosInstance.patch(`/comments/${commentId}`, {
    likes: comment.likes + 1,
  })
  const data = response.data
  return data
}
