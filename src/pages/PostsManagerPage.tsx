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
import { useUserModal } from "../entities/user/model"
import { UserModal } from "../entities/user/ui"
import {
  usePostQueryParams,
  usePostFilterStore,
  useSelectedPostStore,
  useDialogStore,
  useNewPostStore,
  usePostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  // useDeletePostMutation,
  useSearchStore,
} from "../feature/post/model"
import { useTags } from "../feature/tag/model"
import { PostTable } from "../widgets/post/ui"
import {
  useAddCommentMutation,
  useCommentsQuery,
  useCommentStore,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUpdateCommentMutation,
} from "../feature/comment/model"

const PostsManager = () => {
  const { showUserModal, setShowUserModal, selectedUser } = useUserModal()

  const { selectedPost, setSelectedPost } = useSelectedPostStore()
  const { showAddDialog, showEditDialog, showDetailDialog, setShowAddDialog, setShowEditDialog, setShowDetailDialog } =
    useDialogStore()
  const { newPost, setNewPost } = useNewPostStore()

  const { skip, limit, sortBy, sortOrder, selectedTag, setFilter } = usePostFilterStore()
  const { searchQuery, setSearchQuery, setIsTyping } = useSearchStore()

  const { data: postsData, isLoading: isPostsLoading } = usePostsQuery({ limit, skip, tag: selectedTag, searchQuery })

  const addPostMutation = useAddPostMutation()
  const updatePostMutation = useUpdatePostMutation()
  // const deletePostMutation = useDeletePostMutation()

  const { data: comments } = useCommentsQuery(selectedPost?.id)

  const addCommentMutation = useAddCommentMutation()
  const updateCommentMutation = useUpdateCommentMutation()
  const deleteCommentMutation = useDeleteCommentMutation()
  const likeCommentMutation = useLikeCommentMutation()

  const {
    selectedComment,
    setSelectedComment,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
    resetNewComment,
  } = useCommentStore()

  const posts = postsData?.posts || []
  const total = postsData?.total || 0
  const isLoading = isPostsLoading

  const { updateURL } = usePostQueryParams()

  const { data: tags } = useTags()

  // 게시물 추가
  const handleAddPost = async () => {
    try {
      await addPostMutation.mutateAsync(newPost)
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const handleUpdatePost = async () => {
    if (!selectedPost) return
    try {
      await updatePostMutation.mutateAsync(selectedPost)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // const handleDeletePost = async (id: number) => {
  //   try {
  //     await deletePostMutation.mutateAsync(id)
  //   } catch (error) {
  //     console.error("게시물 삭제 오류:", error)
  //   }
  // }

  // 댓글 추가
  const handleAddComment = async () => {
    await addCommentMutation.mutateAsync({
      ...newComment,
      postId: selectedPost!.id,
    })
    resetNewComment()
    setShowAddCommentDialog(false)
  }

  // 댓글 업데이트
  const handleUpdateComment = async () => {
    if (!selectedPost || !selectedComment) return

    await updateCommentMutation.mutateAsync({
      ...selectedComment,
      postId: selectedPost.id,
    })
    setShowEditCommentDialog(false)
  }

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number, postId: number) => {
    await deleteCommentMutation.mutateAsync({
      commentId,
      postId,
    })
  }

  // 댓글 좋아요
  const handleLikeComment = async (commentId: number, postId: number) => {
    await likeCommentMutation.mutateAsync({
      commentId,
      postId,
    })
  }

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            resetNewComment()
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments &&
          comments.map((comment) => (
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
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
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
