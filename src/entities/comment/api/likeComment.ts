import { Comment } from "../../../pages/PostsManagerPage"

interface LikeComment {
  commentId: number
  comment: Comment
}

export const likeComment = async ({ commentId, comment }: LikeComment) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comment.likes + 1 }),
  })
  const data = await response.json()
  return data
}
