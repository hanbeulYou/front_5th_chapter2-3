import { User } from "../../user/model"

export type Comment = {
  body: string
  id: number
  postId: number
  likes: number
  user: User
}

export type NewComment = Omit<Comment, "id" | "user" | "likes" | "postId"> & {
  userId: number | null
  postId: number | null
}
