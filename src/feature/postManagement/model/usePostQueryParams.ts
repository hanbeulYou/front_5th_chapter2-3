import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const usePostQueryParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [skip, setSkip] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<string>("asc")
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
    setSearchQuery(params.get("search") || "")
  }, [location.search])

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    if (searchQuery) params.set("search", searchQuery)
    navigate(`?${params.toString()}`)
  }

  return {
    skip,
    setSkip,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    updateURL,
  }
}
