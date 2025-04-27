import { Post } from "../../../pages/PostsManagerPage"

interface FetchPostsByQueryRequest {
  searchQuery: string
}

interface FetchPostsByQueryResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export const fetchPostsByQuery = async ({
  searchQuery,
}: FetchPostsByQueryRequest): Promise<FetchPostsByQueryResponse> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}
