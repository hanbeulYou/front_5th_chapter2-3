import { BrowserRouter as Router } from "react-router-dom"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { Footer, Header } from "./widgets"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // 데이터가 stale 상태가 되지 않도록 설정
      gcTime: Infinity, // 캐시가 무기한 유지되도록 설정
      refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
      refetchOnReconnect: false, // 재연결시 재요청 방지
      refetchOnMount: false, // 마운트시 재요청 방지
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
