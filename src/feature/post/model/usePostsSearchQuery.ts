import { useQuery } from "@tanstack/react-query"
import { fetchPostsBySearch } from "../../../entities/post/api/fetchPostsBySearch"

export const usePostsSearchQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: ["posts", "search", searchQuery],
    queryFn: () => fetchPostsBySearch({ searchQuery }),
    enabled: !!searchQuery,
  })
}
