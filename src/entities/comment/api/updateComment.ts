import { axiosInstance } from "../../../shared/api"
import { Comment } from "../model"

interface UpdateCommentRequest {
  selectedComment: Comment
}

type UpdateCommentResponse = Comment

export const updateComment = async ({ selectedComment }: UpdateCommentRequest): Promise<UpdateCommentResponse> => {
  const response = await axiosInstance.put(`/comments/${selectedComment.id}`, {
    body: selectedComment.body,
  })
  const data = response.data
  return data
}
