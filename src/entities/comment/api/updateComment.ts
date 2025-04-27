import { Comment } from "../../../pages/PostsManagerPage"

interface UpdateComment {
  selectedComment: Comment
}

export const updateComment = async ({ selectedComment }: UpdateComment) => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  const data = await response.json()
  return data
}
