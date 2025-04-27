import { Tag } from "../../../pages/PostsManagerPage"

// 태그 가져오기
interface FetchTagsResponse {
  tags: Tag[]
}

export const fetchTags = async (): Promise<FetchTagsResponse> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}
