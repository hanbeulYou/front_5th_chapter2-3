import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useDialogStore } from "../model"

export const PostAddButton = () => {
  const { setShowAddDialog } = useDialogStore()

  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
