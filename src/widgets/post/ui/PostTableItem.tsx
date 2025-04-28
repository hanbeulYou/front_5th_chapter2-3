import { TableRow, TableCell } from "../../../shared/ui"
import { PostTitleCell, PostDetailButton, PostEditButton, PostDeleteButton } from "../../../feature/post/ui"
import { UserCell } from "../../../feature/user/ui"
import { Post } from "../../../entities/post/model"
import { LikeDislikeStats } from "./LikeDislikeStats"

interface PostTableItemProps {
  post: Post
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  deletePostById: (id: number) => Promise<void>
}
export const PostTableItem = ({ post, setSelectedPost, setShowEditDialog, deletePostById }: PostTableItemProps) => {
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
          <PostDetailButton post={post} setSelectedPost={setSelectedPost} />
          <PostEditButton post={post} setSelectedPost={setSelectedPost} setShowEditDialog={setShowEditDialog} />
          <PostDeleteButton post={post} deletePostById={deletePostById} />
        </div>
      </TableCell>
    </TableRow>
  )
}
