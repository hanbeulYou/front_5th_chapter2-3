import axios from "axios"

const isDevelopment = import.meta.env.DEV
const baseURL = isDevelopment
  ? "/api" // 개발 환경: localhost:5173/api/
  : "https://dummyjson.com" // 배포 환경

export const axiosInstance = axios.create({
  baseURL,
})
