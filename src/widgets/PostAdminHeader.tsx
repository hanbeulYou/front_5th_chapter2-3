import { PostAddButton } from "../feature/post/ui"
import { CardHeader, CardTitle } from "../shared/ui"

export const PostAdminHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <PostAddButton />
      </CardTitle>
    </CardHeader>
  )
}
