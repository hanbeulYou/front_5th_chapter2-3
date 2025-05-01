import { axiosInstance } from "../../../shared/api"
import { Post } from "../model"

interface FetchPostsBySearchRequest {
  searchQuery: string
}

interface FetchPostsBySearchResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export const fetchPostsBySearch = async ({
  searchQuery,
}: FetchPostsBySearchRequest): Promise<FetchPostsBySearchResponse> => {
  const response = await axiosInstance.get(`/posts/search?q=${searchQuery}`)
  const data = response.data
  return data
}
