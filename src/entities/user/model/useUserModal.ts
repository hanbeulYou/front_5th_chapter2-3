import { useState } from "react"
import { User } from "../model"
import { fetchUser } from "../api/fetchUser"
import { useLoadingStore } from "../../../shared/model"

export const useUserModal = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const { setLoading } = useLoadingStore()

  const openUser = async (user: User) => {
    setLoading(true)
    try {
      const userData = await fetchUser({ userId: user.id })
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (e) {
      console.error("사용자 정보 조회 실패", e)
    } finally {
      setLoading(false)
    }
  }

  return {
    selectedUser,
    showUserModal,
    setShowUserModal,
    openUser,
  }
}
