import { Comment } from "../../../pages/PostsManagerPage"

interface LikeCommentRequest {
  commentId: number
  comment: Comment
}

type LikeCommentResponse = Comment

export const likeComment = async ({ commentId, comment }: LikeCommentRequest): Promise<LikeCommentResponse> => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comment.likes + 1 }),
  })
  const data = await response.json()
  return data
}
