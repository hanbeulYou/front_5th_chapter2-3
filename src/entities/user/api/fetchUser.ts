import { axiosInstance } from "../../../shared/api"
import { User } from "../model"

interface FetchUserRequest {
  userId: number
}

type FetchUserResponse = User

export const fetchUser = async ({ userId }: FetchUserRequest): Promise<FetchUserResponse> => {
  const response = await axiosInstance.get(`/users/${userId}`)
  const data = response.data
  return data
}
