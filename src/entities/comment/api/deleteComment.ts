import { Comment } from "../model"

export interface DeleteCommentRequest {
  commentId: number
}

export type DeleteCommentResponse = Comment & {
  isDeleted: boolean
  deletedOn: string
}

export const deleteComment = async ({ commentId }: DeleteCommentRequest): Promise<DeleteCommentResponse> => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}
