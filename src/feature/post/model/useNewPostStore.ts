import { create } from "zustand"
import { NewPost } from "../../../entities/post/model"

interface NewPostState {
  newPost: NewPost
  setNewPost: (post: NewPost) => void
  resetNewPost: () => void
}

export const useNewPostStore = create<NewPostState>((set) => ({
  newPost: { title: "", body: "", userId: 1 },
  setNewPost: (post) => set({ newPost: post }),
  resetNewPost: () => set({ newPost: { title: "", body: "", userId: 1 } }),
}))
