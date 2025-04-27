interface FetchCommentByPostId {
  postId: number
}

export const fetchCommentByPostId = async ({ postId }: FetchCommentByPostId) => {
  const response = await fetch(`/api/posts/${postId}/comments`)
  const data = await response.json()
  return data
}
