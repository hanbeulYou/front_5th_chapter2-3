import { PostTableContent } from "./PostTableContent"
import { usePostFilterStore, usePostsQuery, useSearchStore } from "../model"
import { Suspense } from "react"

export const PostTable = () => {
  const { skip, limit, selectedTag } = usePostFilterStore()
  const { searchQuery } = useSearchStore()

  const { data } = usePostsQuery({ limit, skip, tag: selectedTag, searchQuery })

  return (
    <Suspense fallback={<div className="flex justify-center p-4">로딩 중...</div>}>
      <PostTableContent posts={data.posts} />
    </Suspense>
  )
}
