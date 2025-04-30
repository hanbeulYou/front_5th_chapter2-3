import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { useUserModal } from "../entities/user/model"
import { UserModal } from "../entities/user/ui"
import {
  usePostFilterStore,
  useDialogStore,
  usePostsQuery,
  useSearchStore,
  // useDeletePostMutation,
} from "../feature/post/model"
import { PostTable } from "../widgets/post/ui"
import { Pagination, PostAddDialog, PostDetailDialog, PostEditDialog } from "../feature/post/ui"
import { CommentAddDialog, CommentEditDialog } from "../feature/comment/ui"
import { Filter } from "../widgets/filter/ui"

const PostsManager = () => {
  const { showUserModal, setShowUserModal, selectedUser } = useUserModal()

  const { setShowAddDialog } = useDialogStore()

  const { skip, limit, selectedTag } = usePostFilterStore()
  const { searchQuery } = useSearchStore()

  const { data: postsData, isLoading: isPostsLoading } = usePostsQuery({ limit, skip, tag: selectedTag, searchQuery })

  // const deletePostMutation = useDeletePostMutation()

  const posts = postsData?.posts || []
  const isLoading = isPostsLoading

  // const handleDeletePost = async (id: number) => {
  //   try {
  //     await deletePostMutation.mutateAsync(id)
  //   } catch (error) {
  //     console.error("게시물 삭제 오류:", error)
  //   }
  // }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <Filter />

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable posts={posts} />}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      {selectedUser && (
        <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
      )}
    </Card>
  )
}

export default PostsManager
