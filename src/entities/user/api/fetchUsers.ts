import { User } from "../model"

interface FetchUsersResponse {
  limit: number
  skip: number
  total: number
  users: User[]
}

export const fetchUsers = async (): Promise<FetchUsersResponse> => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  const data = await response.json()
  return data
}
