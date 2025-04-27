import { Post } from "../../../pages/PostsManagerPage"

interface FetchPostsByTag {
  tag: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const fetchPostsByTag = async ({ tag, setLoading }: FetchPostsByTag) => {
  setLoading(true)
  try {
    const postsResponse = await fetch(`/api/posts/tag/${tag}`)
    const postsData = (await postsResponse.json()) as { limit: number; skip: number; total: number; posts: Post[] }
    return postsData
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error)
  }
  setLoading(false)
}
