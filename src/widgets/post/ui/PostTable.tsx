import { Table, TableHeader, TableRow, TableHead, TableBody } from "../../../shared/ui"
import { Post } from "../../../entities/post/model"
import { PostTableItem } from "./PostTableItem"

interface PostTableProps {
  posts: Post[]
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  deletePostById: (id: number) => Promise<void>
  openPostDetail: (post: Post) => void
}

export const PostTable = ({
  posts,
  setSelectedPost,
  setShowEditDialog,
  deletePostById,
  openPostDetail,
}: PostTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostTableItem
            key={post.id}
            post={post}
            setSelectedPost={setSelectedPost}
            setShowEditDialog={setShowEditDialog}
            deletePostById={deletePostById}
            openPostDetail={openPostDetail}
          />
        ))}
      </TableBody>
    </Table>
  )
}
