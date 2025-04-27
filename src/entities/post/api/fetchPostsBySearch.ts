interface FetchPostsByQuery {
  searchQuery: string
}

export const fetchPostsByQuery = async ({ searchQuery }: FetchPostsByQuery) => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 검색 오류:", error)
  }
}
