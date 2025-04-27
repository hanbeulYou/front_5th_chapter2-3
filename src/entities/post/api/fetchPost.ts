import { Post, User } from "../../../pages/PostsManagerPage"

// 게시물 가져오기
interface FetchPosts {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setTotal: React.Dispatch<React.SetStateAction<number>>
  limit: number
  skip: number
}

export const fetchPosts = ({ setLoading, setPosts, setTotal, limit, skip }: FetchPosts) => {
  setLoading(true)
  let postsData: { posts: Post[]; total: number }
  let usersData: User[]

  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      postsData = data
      return fetch("/api/users?limit=0&select=username,image")
    })
    .then((response) => response.json())
    .then((users) => {
      usersData = users.users
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    })
    .catch((error) => {
      console.error("게시물 가져오기 오류:", error)
    })
    .finally(() => {
      setLoading(false)
    })
}
