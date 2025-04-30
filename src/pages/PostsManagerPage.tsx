import { Edit2, Plus, Search, ThumbsUp, Trash2 } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  HighlightText,
} from "../shared/ui"
import { Post } from "../entities/post/model"
import { Comment } from "../entities/comment/model"
import { useLoadingStore } from "../shared/model"
import { useUserModal } from "../entities/user/model"
import { UserModal } from "../entities/user/ui"
import {
  usePostManagement,
  usePostDetail,
  usePostQueryParams,
  useAutoPostLoader,
  usePostFilterStore,
} from "../feature/post/model"
import { useCommentManagement } from "../feature/comment/model"
import { useTags } from "../feature/tag/model"
import { PostTable } from "../widgets/post/ui"

const PostsManager = () => {
  const { showUserModal, setShowUserModal, selectedUser } = useUserModal()

  const {
    posts,
    total,
    selectedPost,
    showAddDialog,
    showEditDialog,
    newPost,
    setSelectedPost,
    setShowAddDialog,
    setShowEditDialog,
    setNewPost,
    loadPosts,
    loadPostsByTag,
    searchPosts,
    addPost,
    updateSelectedPost,
    deletePostById,
  } = usePostManagement()

  const { skip, limit, sortBy, sortOrder, selectedTag, searchQuery, setFilter } = usePostFilterStore()

  const { updateURL } = usePostQueryParams()

  const { showPostDetailDialog, setShowPostDetailDialog, openPostDetail } = usePostDetail({ setSelectedPost })

  const {
    comments,
    selectedComment,
    showAddCommentDialog,
    showEditCommentDialog,
    newComment,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setNewComment,
    addComment,
    updateSelectedComment,
    deleteCommentById,
    likeCommentById,
  } = useCommentManagement()

  const { tags } = useTags()

  const { loading } = useLoadingStore()

  // 게시물 검색
  const handleSearchPosts = async () => {
    searchPosts(searchQuery)
  }

  // 태그별 게시물 가져오기
  const handleFetchPostsByTag = async (tag: string) => {
    loadPostsByTag(tag)
  }

  // 게시물 추가
  const handleAddPost = async () => {
    addPost()
  }

  // 게시물 업데이트
  const handleUpdatePost = async () => {
    updateSelectedPost()
  }

  // 댓글 추가
  const handleAddComment = async () => {
    addComment()
  }

  // 댓글 업데이트
  const handleUpdateComment = async () => {
    updateSelectedComment()
  }

  // 댓글 삭제
  const handleDeleteComment = async (id: number, postId: number) => {
    deleteCommentById(id, postId)
  }

  // 댓글 좋아요
  const handleLikeComment = async (id: number, postId: number) => {
    likeCommentById(id, postId)
  }

  useAutoPostLoader({ loadPosts, loadPostsByTag })

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{HighlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

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
                  onChange={(e) => setFilter("searchQuery", e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setFilter("selectedTag", value)
                handleFetchPostsByTag(value)
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
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
              deletePostById={deletePostById}
              openPostDetail={openPostDetail}
            />
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setFilter("limit", Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setFilter("skip", Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setFilter("skip", skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={handleAddPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => setSelectedPost({ ...(selectedPost as Post), title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => setSelectedPost({ ...(selectedPost as Post), body: e.target.value })}
            />
            <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={handleAddComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...(selectedComment as Comment), body: e.target.value })}
            />
            <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      {selectedPost && (
        <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{HighlightText(selectedPost.title, searchQuery)}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>{HighlightText(selectedPost.body, searchQuery)}</p>
              {renderComments(selectedPost.id)}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* 사용자 모달 */}
      {selectedUser && (
        <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
      )}
    </Card>
  )
}

export default PostsManager
