import { Post } from "../../../pages/PostsManagerPage"

interface DeletePostRequest {
  postId: number
}

type DeletePostResponse = Post

export const deletePost = async ({ postId }: DeletePostRequest): Promise<DeletePostResponse> => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}
