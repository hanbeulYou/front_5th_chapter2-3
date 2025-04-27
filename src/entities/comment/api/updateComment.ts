import { Comment } from "../../../pages/PostsManagerPage"

interface UpdateCommentRequest {
  selectedComment: Comment
}

type UpdateCommentResponse = Comment

export const updateComment = async ({ selectedComment }: UpdateCommentRequest): Promise<UpdateCommentResponse> => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  const data = await response.json()
  return data
}
