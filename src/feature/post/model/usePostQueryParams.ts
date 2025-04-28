import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePostFilterStore } from "./postFilterStore"

export const usePostQueryParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { skip, limit, sortBy, sortOrder, selectedTag, searchQuery, setFilter } = usePostFilterStore()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setFilter("skip", parseInt(params.get("skip") || "0"))
    setFilter("limit", parseInt(params.get("limit") || "10"))
    setFilter("sortBy", params.get("sortBy") || "")
    setFilter("sortOrder", params.get("sortOrder") || "asc")
    setFilter("selectedTag", params.get("tag") || "")
    setFilter("searchQuery", params.get("search") || "")
  }, [location.search, setFilter])

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
    limit,
    sortBy,
    sortOrder,
    selectedTag,
    searchQuery,
    setFilter,
    updateURL,
  }
}
