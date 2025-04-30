import { useQuery } from "@tanstack/react-query"
import { fetchPostsByTag } from "../../../entities/post/api/fetchPostsByTag"
import { fetchUsers } from "../../../entities/user/api/fetchUsers"
import { combinePostsWithAuthors } from "../lib"

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ["posts", "tag", tag],
    queryFn: async () => {
      const postsData = await fetchPostsByTag({ tag })
      const usersData = await fetchUsers()
      return {
        posts: combinePostsWithAuthors(postsData.posts, usersData.users),
        total: postsData.total,
      }
    },
    enabled: !!tag && tag !== "all",
  })
}
