import { NewComment, Comment } from "../model"
import { axiosInstance } from "../../../shared/api"
interface CreateCommentRequest {
  newComment: NewComment
}

type CreateCommentResponse = Comment

export const createComment = async ({ newComment }: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await axiosInstance.post("/comments/add", newComment)
  const data = response.data
  return data
}
