import { useState } from "react"
import { User } from "../model"
import { fetchUser } from "../api/fetchUser"

export const useUserModal = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const openUser = async (user: User) => {
    try {
      const userData = await fetchUser({ userId: user.id })
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return {
    selectedUser,
    showUserModal,
    setShowUserModal,
    openUser,
  }
}
