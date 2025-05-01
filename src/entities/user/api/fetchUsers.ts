import { axiosInstance } from "../../../shared/api"
import { User } from "../model"

interface FetchUsersResponse {
  limit: number
  skip: number
  total: number
  users: User[]
}

export const fetchUsers = async (): Promise<FetchUsersResponse> => {
  const response = await axiosInstance.get("/users?limit=0&select=username,image")
  const data = response.data
  return data
}
