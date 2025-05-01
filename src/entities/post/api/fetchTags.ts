import { Tag } from "../model"

// 태그 가져오기
type FetchTagsResponse = Tag[]

export const fetchTags = async (): Promise<FetchTagsResponse> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}
