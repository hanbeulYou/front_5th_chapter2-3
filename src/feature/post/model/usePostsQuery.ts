import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../entities/post/api/fetchPosts"
import { fetchUsers } from "../../../entities/user/api/fetchUsers"
import { combinePostsWithAuthors } from "../lib"

export const usePostsQuery = ({ limit = 10, skip = 0 }: { limit?: number; skip?: number }) => {
  return useQuery({
    queryKey: ["posts", skip, limit],
    queryFn: async () => {
      const postsData = await fetchPosts({ limit, skip })
      const usersData = await fetchUsers()
      return {
        posts: combinePostsWithAuthors(postsData.posts, usersData.users),
        total: postsData.total,
      }
    },
  })
}
