import { UserDetailDialog } from "../entities/user/ui"
import { CommentAddDialog, CommentEditDialog } from "../feature/comment/ui"
import { PostAddDialog, PostDetailDialog, PostEditDialog } from "../feature/post/ui"

export const Dialogs = () => {
  return (
    <>
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
      <UserDetailDialog />
    </>
  )
}
