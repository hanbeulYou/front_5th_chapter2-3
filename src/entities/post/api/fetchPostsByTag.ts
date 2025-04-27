import { Post } from "../../../pages/PostsManagerPage"

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
  const postsResponse = await fetch(`/api/posts/tag/${tag}`)
  const postsData = await postsResponse.json()
  return postsData
}
