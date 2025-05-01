import { useQuery } from "@tanstack/react-query"
import { fetchCommentsByPostId } from "../../../entities/comment/api"
import { Comment } from "../../../entities/comment/model"

export const useCommentsQuery = (postId: number | undefined) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!postId) return []
      const commentsData = await fetchCommentsByPostId({ postId })
      return commentsData.comments
    },
    enabled: !!postId,
  })
}
