import { User } from "../../user/model"

export type Post = {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views?: number
  author?: User
}

export type NewPost = Omit<Post, "id">

export type Tag = {
  slug: string
  url: string
}
