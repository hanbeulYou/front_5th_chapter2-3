import { Card } from "../shared/ui"
import { PostAdminHeader, PostAdminBody, Dialogs } from "../widgets"
import { usePostQueryParams } from "../feature/post/model"

const PostsManager = () => {
  // 이거 진짜 아닌거 같은데, 이거 빼면 url로 쿼리 접근시 받아올 수가 없습니다.
  // 이거 때문에 해당 page 구성을 feature로 내리거나(widget으로도 어차피 못내린다고 생각), 각 feature에 이 훅을 부르는건 더 아닌거같아서 눈물을 머금고 여기에 적었습니다.
  usePostQueryParams()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostAdminHeader />
      <PostAdminBody />
      <Dialogs />
    </Card>
  )
}

export default PostsManager
