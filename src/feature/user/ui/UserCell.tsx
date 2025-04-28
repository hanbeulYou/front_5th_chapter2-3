import { User } from "../../../entities/user/model"
import { useUserModal } from "../../../entities/user/model"

interface UserCellProps {
  author: User
}
export const UserCell = ({ author }: UserCellProps) => {
  const { openUserModal } = useUserModal()
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(author)}>
      <img src={author.image} alt={author.username} className="w-8 h-8 rounded-full" />
      <span>{author.username}</span>
    </div>
  )
}
