import { Button } from "../../../shared/ui"
import { MessageSquare } from "lucide-react"
import { Post } from "../../../entities/post/model"
import { usePostDetail } from "../model"

interface PostDetailButtonProps {
  post: Post
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
}

export const PostDetailButton = ({ post, setSelectedPost }: PostDetailButtonProps) => {
  // TODO: props로 직접 받던가, context로 전달하던가, react-query로 전역 접근하게 만들던가 해줘야함
  const { openPostDetail } = usePostDetail({ setSelectedPost })

  return (
    <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
