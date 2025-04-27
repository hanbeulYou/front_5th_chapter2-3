import { NewPost, Post } from "../../../pages/PostsManagerPage"

interface CreatePostRequest {
  newPost: NewPost
}

type CreatePostResponse = Post

export const createPost = async ({ newPost }: CreatePostRequest): Promise<CreatePostResponse> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}
