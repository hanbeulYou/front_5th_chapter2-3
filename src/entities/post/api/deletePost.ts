interface DeletePost {
  postId: number
}

export const deletePost = async ({ postId }: DeletePost) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}
