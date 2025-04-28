// src/feature/tagManagement/model/useTags.ts
import { useEffect, useState } from "react"
import { fetchTags } from "../../../entities/post/api"
import { Tag } from "../../../entities/post/model"

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tagsData = await fetchTags()
        setTags(tagsData.tags)
      } catch (error) {
        console.error("태그 가져오기 오류:", error)
      }
    }
    loadTags()
  }, [])

  return { tags }
}
