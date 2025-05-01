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
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}
