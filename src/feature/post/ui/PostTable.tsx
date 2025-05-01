import { PostTableContent } from "./PostTableContent"
import { usePostFilterStore, usePostsQuery, useSearchStore } from "../model"
import { Pagination } from "./Pagination"

export const PostTable = () => {
  const { skip, limit, selectedTag } = usePostFilterStore()
  const { searchQuery } = useSearchStore()

  const { data, isLoading } = usePostsQuery({ limit, skip, tag: selectedTag, searchQuery })

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
        <PostTableContent posts={data?.posts || []} />
      )}
      <Pagination total={data?.total || 0} />
    </>
  )
}
