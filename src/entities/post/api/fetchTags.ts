import { Tag } from "../../../pages/PostsManagerPage"

// 태그 가져오기
interface FetchTags {
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

export const fetchTags = async ({ setTags }: FetchTags) => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    setTags(data)
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
