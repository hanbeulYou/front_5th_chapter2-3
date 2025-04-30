import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostFilterStore } from "../../post/model"
import { useTags } from "../../tag/model"

export const FilterTag = () => {
  const { selectedTag, setFilter } = usePostFilterStore()
  const { data: tags } = useTags()

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setFilter("selectedTag", value)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
