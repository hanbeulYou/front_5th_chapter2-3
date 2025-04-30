import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { useSearchStore } from "../../post/model"

export const FilterSearch = () => {
  const { searchQuery, setSearchQuery, setIsTyping } = useSearchStore()

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsTyping(true)
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setSearchQuery(searchQuery)
              setIsTyping(false)
            }
          }}
        />
      </div>
    </div>
  )
}
