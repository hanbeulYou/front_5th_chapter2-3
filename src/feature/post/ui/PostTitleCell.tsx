import { Post } from "../../../entities/post/model"
import { HighlightText } from "../../../shared/ui"
import { TagItem } from "../../../feature/tag/ui"
import { useSearchStore } from "../model"

interface PostTitleCellProps {
  post: Post
}

export const PostTitleCell = ({ post }: PostTitleCellProps) => {
  const { searchQuery } = useSearchStore()

  return (
    <div className="space-y-1">
      <div>{HighlightText(post.title, searchQuery)}</div>

      <div className="flex flex-wrap gap-1">{post.tags?.map((tag) => <TagItem key={tag} tag={tag} />)}</div>
    </div>
  )
}
