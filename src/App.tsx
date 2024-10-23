import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/home/Home";
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
})


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Home />
    </QueryClientProvider>
  )
}
