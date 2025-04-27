import { NewComment } from "../../../pages/PostsManagerPage"

interface CreateComment {
  newComment: NewComment
}

export const createComment = async ({ newComment }: CreateComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  const data = await response.json()
  return data
}
