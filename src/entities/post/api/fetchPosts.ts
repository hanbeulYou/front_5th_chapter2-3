import { axiosInstance } from "../../../shared/api"
import { Post } from "../model"

// 게시물 가져오기
interface FetchPostsRequest {
  limit: number
  skip: number
}

interface FetchPostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export const fetchPosts = async ({ limit, skip }: FetchPostsRequest): Promise<FetchPostsResponse> => {
  const response = await axiosInstance.get(`/posts?limit=${limit}&skip=${skip}`)
  const data = response.data
  return data
}
