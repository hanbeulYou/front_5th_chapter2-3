import { usePostFilterStore } from "../../post/model"
import { usePostQueryParams } from "../../post/model"

interface TagItemProps {
  tag: string
}

export const TagItem = ({ tag }: TagItemProps) => {
  const { updateURL } = usePostQueryParams()
  const { selectedTag, setFilter } = usePostFilterStore()

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={() => {
        setFilter("selectedTag", tag)
        updateURL()
      }}
    >
      {tag}
    </span>
  )
}
