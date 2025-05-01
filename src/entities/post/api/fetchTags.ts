import { axiosInstance } from "../../../shared/api"
import { Tag } from "../model"

// 태그 가져오기
type FetchTagsResponse = Tag[]

export const fetchTags = async (): Promise<FetchTagsResponse> => {
  const response = await axiosInstance.get("/posts/tags")
  const data = response.data
  return data
}
