import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { Pagination, PostAddButton, PostTable } from "../feature/post/ui"
import { Filter } from "../widgets"
import { Dialogs } from "../widgets/Dialogs"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <Filter />
          {/* 게시물 테이블 */}
          <PostTable />
          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>
      <Dialogs />
    </Card>
  )
}

export default PostsManager
