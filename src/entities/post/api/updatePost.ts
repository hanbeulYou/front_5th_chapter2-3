import { Post } from "../../../pages/PostsManagerPage"

interface UpdatePost {
  selectedPost: Post
}

export const updatePost = async ({ selectedPost }: UpdatePost) => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}
