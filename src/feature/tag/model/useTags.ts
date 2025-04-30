import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../../../entities/post/api"
import { Tag } from "../../../entities/post/model"

export const useTags = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const tagsData = await fetchTags()
      return tagsData
    },
  })
}
