interface FetchUser {
  userId: number
}

export const fetchUser = async ({ userId }: FetchUser) => {
  const response = await fetch(`/api/users/${userId}`)
  const data = await response.json()
  return data
}
