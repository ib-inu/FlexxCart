import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/home/Home";
import { ReactQueryDevtools } from 'react-query/devtools'
import Cart from "./pages/cart/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./pages/Details/Details";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "cart",
    element: <Cart />
  },
  {
    path: "details/:id",
    element: <Details />
  }
])


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
