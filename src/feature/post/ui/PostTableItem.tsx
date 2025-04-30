import { TableRow, TableCell } from "../../../shared/ui"
import { PostTitleCell, PostDetailButton, PostEditButton, PostDeleteButton } from "../../../feature/post/ui"
import { UserCell } from "../../../feature/user/ui"
import { Post } from "../../../entities/post/model"
import { LikeDislikeStats } from "../../../entities/post/ui"

interface PostTableItemProps {
  post: Post
}

export const PostTableItem = ({ post }: PostTableItemProps) => {
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <PostTitleCell post={post} />
      </TableCell>
      <TableCell>{post.author && <UserCell author={post.author} />}</TableCell>
      <TableCell>
        <LikeDislikeStats likes={post.reactions?.likes || 0} dislikes={post.reactions?.dislikes || 0} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <PostDetailButton post={post} />
          <PostEditButton post={post} />
          <PostDeleteButton post={post} />
        </div>
      </TableCell>
    </TableRow>
  )
}
