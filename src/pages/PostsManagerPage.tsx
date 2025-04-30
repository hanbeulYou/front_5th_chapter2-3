import { Plus, Search } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui"
import { useUserModal } from "../entities/user/model"
import { UserModal } from "../entities/user/ui"
import {
  usePostQueryParams,
  usePostFilterStore,
  useDialogStore,
  usePostsQuery,
  useSearchStore,
  // useDeletePostMutation,
} from "../feature/post/model"
import { useTags } from "../feature/tag/model"
import { PostTable } from "../widgets/post/ui"
import { Pagination, PostAddDialog, PostDetailDialog, PostEditDialog } from "../feature/post/ui"
import { CommentAddDialog, CommentEditDialog } from "../feature/comment/ui"

const PostsManager = () => {
  const { showUserModal, setShowUserModal, selectedUser } = useUserModal()

  const { setShowAddDialog } = useDialogStore()

  const { skip, limit, sortBy, sortOrder, selectedTag, setFilter } = usePostFilterStore()
  const { searchQuery, setSearchQuery, setIsTyping } = useSearchStore()

  const { data: postsData, isLoading: isPostsLoading } = usePostsQuery({ limit, skip, tag: selectedTag, searchQuery })

  // const deletePostMutation = useDeletePostMutation()

  const posts = postsData?.posts || []
  const isLoading = isPostsLoading

  const { updateURL } = usePostQueryParams()

  const { data: tags } = useTags()

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
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setIsTyping(true)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setSearchQuery(searchQuery)
                      setIsTyping(false)
                    }
                  }}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setFilter("selectedTag", value)
                // handleFetchPostsByTag(value)
                updateURL()
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags?.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => setFilter("sortBy", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => setFilter("sortOrder", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
