import { PostTable } from "../feature/post/ui"
import { CardContent } from "../shared/ui"
import { Filter } from "./Filter"

export const PostAdminBody = () => {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <Filter />
        {/* 게시물 테이블 */}
        <PostTable />
      </div>
    </CardContent>
  )
}
