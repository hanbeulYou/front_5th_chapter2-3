interface FetchCommentsByPostId {
  postId: number
}

export const fetchCommentsByPostId = async ({ postId }: FetchCommentsByPostId) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}
