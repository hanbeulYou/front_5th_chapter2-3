import { Card } from "../shared/ui"
import { PostAdminHeader, PostAdminBody, Dialogs } from "../widgets"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostAdminHeader />
      <PostAdminBody />
      <Dialogs />
    </Card>
  )
}

export default PostsManager
