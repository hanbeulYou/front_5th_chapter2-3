export type User = {
  id: number
  username: string
  image?: string
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: {
    address?: string
    city?: string
    state?: string
    postalCode?: string
  }
  company?: {
    name?: string
    title?: string
  }
}
