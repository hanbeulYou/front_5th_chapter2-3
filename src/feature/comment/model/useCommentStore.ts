import { create } from "zustand"
import { Comment, NewComment } from "../../../entities/comment/model"

interface CommentState {
  selectedComment: Comment | null
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  newComment: NewComment
  setSelectedComment: (comment: Comment | null) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
  setNewComment: (comment: NewComment) => void
  resetNewComment: () => void
}

export const useCommentStore = create<CommentState>((set) => ({
  selectedComment: null,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  newComment: { body: "", postId: null, userId: 1 },
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
  setNewComment: (comment) => set({ newComment: comment }),
  resetNewComment: () => set({ newComment: { body: "", postId: null, userId: 1 } }),
}))
