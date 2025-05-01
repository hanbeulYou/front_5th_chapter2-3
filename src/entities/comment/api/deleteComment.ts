import { axiosInstance } from "../../../shared/api"
import { Comment } from "../model"

export interface DeleteCommentRequest {
  commentId: number
}

export type DeleteCommentResponse = Comment & {
  isDeleted: boolean
  deletedOn: string
}

export const deleteComment = async ({ commentId }: DeleteCommentRequest): Promise<DeleteCommentResponse> => {
  const response = await axiosInstance.delete(`/comments/${commentId}`)
  const data = response.data
  return data
}
