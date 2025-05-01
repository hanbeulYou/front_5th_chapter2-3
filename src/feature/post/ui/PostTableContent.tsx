import { Table, TableHeader, TableRow, TableHead, TableBody } from "../../../shared/ui"
import { Post } from "../../../entities/post/model"
import { PostTableItem } from "./PostTableItem"

interface PostTableContentProps {
  posts: Post[]
}

export const PostTableContent = ({ posts }: PostTableContentProps) => {
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
          <PostTableItem key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
