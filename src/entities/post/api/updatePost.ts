import { Post } from "../../../pages/PostsManagerPage"

interface UpdatePostRequest {
  selectedPost: Post
}

type UpdatePostResponse = Post

export const updatePost = async ({ selectedPost }: UpdatePostRequest): Promise<UpdatePostResponse> => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}
