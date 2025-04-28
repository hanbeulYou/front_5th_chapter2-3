import { useState } from "react"
import {
  fetchCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
} from "../../../entities/comment/api"
import { Comment, NewComment } from "../../../entities/comment/model"

export const useCommentManagement = () => {
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })

  // 댓글 가져오기
  const loadComments = async (postId: number) => {
    if (comments[postId]) return
    try {
      const data = await fetchCommentsByPostId({ postId })
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await createComment({ newComment })
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (e) {
      console.error("댓글 추가 오류:", e)
    }
  }

  // 댓글 수정
  const updateSelectedComment = async () => {
    try {
      if (!selectedComment) return
      const data = await updateComment({ selectedComment })
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (e) {
      console.error("댓글 업데이트 오류:", e)
    }
  }

  // 댓글 삭제
  const deleteCommentById = async (id: number, postId: number) => {
    try {
      await deleteComment({ commentId: id })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (e) {
      console.error("댓글 삭제 오류:", e)
    }
  }

  // 댓글 좋아요
  const likeCommentById = async (id: number, postId: number) => {
    try {
      const data = await likeComment({ commentId: id, comment: comments[postId]!.find((c) => c.id === id)! })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (e) {
      console.error("댓글 좋아요 오류:", e)
    }
  }

  return {
    comments,
    selectedComment,
    showAddCommentDialog,
    showEditCommentDialog,
    newComment,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setNewComment,
    loadComments,
    addComment,
    updateSelectedComment,
    deleteCommentById,
    likeCommentById,
  }
}
