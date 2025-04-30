import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostFilterStore } from "../../post/model"

export const FilterSortOrder = () => {
  const { sortOrder, setFilter } = usePostFilterStore()

  return (
    <Select value={sortOrder} onValueChange={(value) => setFilter("sortOrder", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}
