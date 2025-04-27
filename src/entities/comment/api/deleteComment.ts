interface DeleteComment {
  commentId: number
}

export const deleteComment = async ({ commentId }: DeleteComment) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}
