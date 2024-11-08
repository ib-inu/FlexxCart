import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/home/Home";
import { ReactQueryDevtools } from 'react-query/devtools'
import Cart from "./pages/cart/Cart";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Details from "./pages/Details/Details";
import Authentication from "./Authentication/Authentication";
import Login from "./Authentication/Login";
import { Provider, useSelector } from "react-redux";
import { Rootstate, store } from "./store";
import ErrorMsg from "./components/ui/ErrorMsg";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
})

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const user = useSelector((state: Rootstate) => state.auth.user);
  return user ? element : <Navigate to="/login" />;
};


const router = createBrowserRouter([
  {
    errorElement: <ErrorMsg />,
    path: "/",
    element: <Authentication />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: <Navigate to="/login" />,
      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "/cart",
    element: <ProtectedRoute element={<Cart />} />,
  },
  {
    path: "/details/:id",
    element: <ProtectedRoute element={<Details />} />,
  },
  {
    path: "*",
    element: <ErrorMsg />,
  },
]);



export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  )
}
