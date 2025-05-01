import { axiosInstance } from "../../../shared/api"
import { Post } from "../model"

interface FetchPostsByTagRequest {
  tag: string
}

interface FetchPostsByTagResponse {
  limit: number
  skip: number
  total: number
  posts: Post[]
}

export const fetchPostsByTag = async ({ tag }: FetchPostsByTagRequest): Promise<FetchPostsByTagResponse> => {
  const postsResponse = await axiosInstance.get(`/posts/tag/${tag}`)
  const postsData = postsResponse.data
  return postsData
}
