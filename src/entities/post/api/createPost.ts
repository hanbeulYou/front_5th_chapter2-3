import { NewPost } from "../../../pages/PostsManagerPage"

export const createPost = async (newPost: NewPost) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 생성 오류:", error)
  }
}
