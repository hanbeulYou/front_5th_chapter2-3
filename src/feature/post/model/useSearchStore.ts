import { create } from "zustand"

interface SearchState {
  isTyping: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  setIsTyping: (isTyping: boolean) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  isTyping: false,
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsTyping: (isTyping) => set({ isTyping }),
}))
