import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../entities/post/api/fetchPosts"
import { fetchUsers } from "../../../entities/user/api/fetchUsers"
import { combinePostsWithAuthors } from "../lib"
import { fetchPostsBySearch, fetchPostsByTag } from "../../../entities/post/api"

interface UsePostsQueryProps {
  limit: number
  skip: number
  tag?: string
  searchQuery?: string
}

export const usePostsQuery = ({ limit = 10, skip = 0, tag, searchQuery }: UsePostsQueryProps) => {
  return useQuery({
    queryKey: ["posts", skip, limit, tag, searchQuery],
    queryFn: async () => {
      let postsData

      if (searchQuery) {
        postsData = await fetchPostsBySearch({ searchQuery })
      } else if (tag && tag !== "all") {
        postsData = await fetchPostsByTag({ tag })
      } else {
        postsData = await fetchPosts({ limit, skip })
      }

      const usersData = await fetchUsers()
      return {
        posts: combinePostsWithAuthors(postsData.posts, usersData.users),
        total: postsData.total,
      }
    },
  })
}
