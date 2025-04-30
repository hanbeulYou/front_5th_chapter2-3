import { FilterSearch, FilterSortBy, FilterSortOrder, FilterTag } from "../feature/filter/ui"

export const Filter = () => {
  return (
    <div className="flex gap-4">
      <FilterSearch />
      <FilterTag />
      <FilterSortBy />
      <FilterSortOrder />
    </div>
  )
}
