import { User } from "../../../pages/PostsManagerPage"

interface FetchUserRequest {
  userId: number
}

type FetchUserResponse = User

export const fetchUser = async ({ userId }: FetchUserRequest): Promise<FetchUserResponse> => {
  const response = await fetch(`/api/users/${userId}`)
  const data = await response.json()
  return data
}
