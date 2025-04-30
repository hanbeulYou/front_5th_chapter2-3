import { Button } from "../../../shared/ui"
import { MessageSquare } from "lucide-react"
import { useDialogStore } from "../model"

export const PostDetailButton = () => {
  const { setShowDetailDialog } = useDialogStore()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setShowDetailDialog(true)
      }}
    >
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
