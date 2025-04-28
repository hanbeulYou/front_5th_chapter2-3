import { NewComment, Comment } from "../model"

interface CreateCommentRequest {
  newComment: NewComment
}

type CreateCommentResponse = Comment

export const createComment = async ({ newComment }: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  const data = await response.json()
  return data
}
