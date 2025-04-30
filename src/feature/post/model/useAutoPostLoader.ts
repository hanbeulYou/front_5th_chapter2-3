import { useEffect } from "react"
import { usePostFilterStore } from "./usePostFilterStore"
import { usePostQueryParams } from "./usePostQueryParams"

interface UseAutoPostLoaderProps {
  loadPosts: (params: { limit: number; skip: number }) => Promise<void>
  loadPostsByTag: (tag: string) => Promise<void>
}

export const useAutoPostLoader = ({ loadPosts, loadPostsByTag }: UseAutoPostLoaderProps) => {
  const { skip, limit, sortBy, sortOrder, selectedTag } = usePostFilterStore()
  const { updateURL } = usePostQueryParams()

  useEffect(() => {
    if (selectedTag) {
      loadPostsByTag(selectedTag)
    } else {
      loadPosts({ limit, skip })
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])
}
