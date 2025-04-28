import { useState } from "react"
import {
  fetchPosts,
  fetchPostsByTag,
  fetchPostsByQuery,
  createPost,
  updatePost,
  deletePost,
} from "../../../entities/post/api"
import { fetchUsers } from "../../../entities/user/api"
import { Post, NewPost } from "../../../entities/post/model"
import { useLoadingStore } from "../../../shared/model"
import { combinePostsWithAuthors } from "../lib"

export const usePostManagement = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 })

  const { setLoading } = useLoadingStore()

  // 게시물 조회
  const loadPosts = async ({ limit, skip }: { limit: number; skip: number }) => {
    setLoading(true)
    try {
      const postsData = await fetchPosts({ limit, skip })
      const usersData = await fetchUsers()
      setPosts(combinePostsWithAuthors(postsData.posts, usersData.users))
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그별 조회
  const loadPostsByTag = async (tag: string) => {
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([fetchPostsByTag({ tag }), fetchUsers()])
      setPosts(combinePostsWithAuthors(postsData.posts, usersData.users))
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 검색
  const searchPosts = async (searchQuery: string) => {
    setLoading(true)
    try {
      const data = await fetchPostsByQuery({ searchQuery })
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 추가
  const addPost = async () => {
    try {
      const created = await createPost({ newPost })
      setPosts([created, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 업데이트
  const updateSelectedPost = async () => {
    try {
      if (!selectedPost) return
      const updated = await updatePost({ selectedPost })
      setPosts(posts.map((post) => (post.id === updated.id ? updated : post)))
      setShowEditDialog(false)
    } catch (e) {
      console.error("게시물 업데이트 오류:", e)
    }
  }

  // 삭제
  const deletePostById = async (id: number) => {
    try {
      await deletePost({ postId: id })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (e) {
      console.error("게시물 삭제 오류:", e)
    }
  }

  return {
    posts,
    total,
    selectedPost,
    showAddDialog,
    showEditDialog,
    newPost,
    setSelectedPost,
    setShowAddDialog,
    setShowEditDialog,
    setNewPost,
    loadPosts,
    loadPostsByTag,
    searchPosts,
    addPost,
    updateSelectedPost,
    deletePostById,
  }
}
