import { Post } from "../../../entities/post/model"
import { User } from "../../../entities/user/model"

export const combinePostsWithAuthors = (posts: Post[], users: User[]) => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))
}
